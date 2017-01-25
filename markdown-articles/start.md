# Get Started

To get a quick idea how Flimflam works, we will build a simple counter component---not the most exciting example, so maybe we will think of something more creative in the future! This tutorial will cover the basics of the build process, creating views, and handling streams.

## Development setup

Before starting, make sure you have **node**, **npm**, and **git** installed; then, create a new git repo and npm package with **npm init** and **git init** in the directory of your choice.

### Basic dependencies

Let's start by installing the basic meta-package in Flimflam:

```bash
npm install --save --save-exact flimflam
```

### Serving and testing

For running our development server, we can use [budo](https://github.com/mattdesl/budo).

```bash
npm install --save-dev --save-exact budo
```

To run tests, we can use [tape](https://github.com/substack/tape), [tape-run](https://github.com/juliangruber/tape-run), and [faucet](https://github.com/substack/faucet) (this is a setup that I find quick and easy, but there are many other options for running tests out there)

```bash
npm install --save-dev --save-exact tape tape-run faucet browserify
```

## Creating the initial view

"Views" in Flimflam refer to functions that return [snabbdom]() VNode trees, which are "virtual" representations of HTML. View functions take a 'state' object and any other parameters you want. Add this code to an `index.js` file:

```js
var h = require('flimflam/h')
var render = require('flimflam/render')
var flyd = require('flimflam/flyd')

function view(state) {
  return h('body', [
    h('p', 'counter sum goes here')
  , h('button', 'increment!')
  , h('button', 'decrement!')
  , h('button', 'reset!')
  ])
}

// Create a container for our component 
var container = document.createElement('div')
document.body.appendChild('div')
// Render the view, using an empty state, into the container
render(view, {}, container)
```

You might be able to see how this resembles a DOM tree: a body element that has 4 child nodes: a paragraph and three buttons. Nothing much happens yet, but let's see if we can view it in our browser:


```bash
node_modules/.bin/budo --live index.js
```

After opening the address of the server in your browser, you should see some basic markdown that looks like...

```html
<body>
  <p>counter sum goes here</p>
  <button>increment!</button>
  <button>decrement!</button>
  <button>reset!</button>
</body>
```

## Handling events

To make the counter actually do something, we need to create a function called `init()` that will initialize a **state object**, which is a plain JS object that contains some [flyd]() streams.

Think of streams as containers that hold values which change over time. While you can think of arrays as containers that hold one or more values separated by space (in memory), similarly **streams** are containers holding one or more values separated **by time**. If you've worked with Promises, streams are very similar (although streams are more generalized---Promises can be thought of as a subset of streams).

```js
function init() {
  return {
    // Think of these as containers whose contents will change
    clickButton$: flyd.stream() // initially empty
  , count$: flyd.stream(0) // initially 0
  }
}
```

We're returning an object that has a couple streams. It can be common practice to append "$" to the end of variables that are streams to distinguish them from regular, static values. The `clickButton$` stream will contain event objects each time the user clicks a button.

Now, the `init` function returns a state object that we can use in the view, so we need to modify the code in the `render` call as follows:

```js
var container = document.createElement('div')
document.body.appendChild('div')
render(view, init(), container)
```

To plug the `clickButton$` and `count$` streams into our view, we simply pull it out of the state, which will be given as the first parameter to the view function that you passed into `render`. Likewise, to output the value from a stream into your view, simply call the stream like a function:

```js
function view(state) {
  var currentCount = state.count$()
  return h('body', [
    h('p', 'counter sum is ' + currentCount)
    // Pass the click stream into these event handlers
  , h('button', {on: {click: state.clickButton$}}, 'increment!')
  , h('button', {on: {click: state.clickButton$}}, 'decrement!')
  , h('button', {on: {click: state.clickButton$}}, 'reset!')
  ])
}
```

If that looks a bit repetitive, we can generalize the buttons into a single function:

```js
function view(state) {
  var currentCount = state.count$()
  return h('body', [
    h('p', 'counter sum is ' + currentCount)
  , button('increment!', state.clickButton$)
  , button('decrement!', state.clickButton$)
  , button('reset!', state.clickButton$)
  ])
}

function button(label, click$) {
  return h('button', {on: {click: click$}}, label)
}
```

This is a common way to generalize your markdown by simply creating separate functions.

### Mapping over streams

To log each event object in our click stream, we can use `flyd.map`. Returning to our init function, let's modify it to print each event object when we click a button:

```js
function init() {
  var clickButton$ = flyd.stream()
  flyd.map(function(event) { console.log(event) }, clickButton$)
  var count$ = flyd.stream(0)
  return { clickButton$: clickButton$, count$: count$ }
}
```

Streams are the most difficult learning challenge in Flimflam and can take some practice, but once you have a knack for them, they become a lot of fun. Their usefulness may not be apparent in the beginning, but once you start working on large and complex UIs, having a robust abstraction for handling all the asynchronous data becomes very handy.

If you load your component in the browser and click a button, you should see the Event object logged in the development console for each click you make.

Now, we probably won't find the `Event` object useful (this is the same as any event object you get with the typical `addEventListener` DOM Node method).

Instead, let's push integers to the stream for counting, like `+1` for increment, `-1` for decrement, for every click.

```js
function view(state) {
  var currentCount = state.count$()
  return h('body', [
    h('p', 'counter sum is ' + currentCount)
  , button('increment!', 1)
  , button('decrement!', -1)
  , button('reset!', -currentCount)
  ])
}

function button(label, click$, add) {
  // For every click on this button,
  // pass the 'add' value to the 'clickButton$' stream
  return h('button', {on: {click: [click$, add]}}, label)
}
```

Load that in your browser and see what gets printed in the console; instead of Event objects, you should see integers. Now we are pushing the `add` variable into the stream, which is set to be 1, -1, or the negative of the current count (to reset it to 0)

This syntax of pushing values into event handlers using an array comes from snabbdom, which you can read up about [here](https://github.com/snabbdom/snabbdom#eventlisteners-module). There are many other ways to push custom values into event handler streams!

## Scanning streams

`flyd.scan` is a function, similar to `reduce`, that accumulates a single value from many values. To get the `count$` stream to work right, we can use `flyd.scan` to sum up all the integers from the `clickButton$` stream. 

```js
function init() {
  var clickButton$ = flyd.stream()

  function addToSum(sum, int) {return sum + int} 
  // For every value in the clickButton$ stream
  // add that new value to an accumulated sum
  // (0, the second arg, is the starting value)
  var count$ = flyd.scan(addToSum, 0, clickButton$)

  return { clickButton$: clickButton$, count$: count$ }
}
```

Now, load the page a final time to see it work!

To give it a final touch, let's export the `init` and `view` functions from `index.js` so we can test them:

```js
module.exports = {
  init: init
, view: view
}
```

## Tests

Before we celebrate too much, let's write some tests. Create a file in your project directory called `test/index.js` with this inital code:

```js
var test = require('tape')
var render = require('flimflam/render')
var counter = require('../index') // The counter component we just created

// Utility function to render the counter to the page for each test
function createComponent() {
  var container = document.createElement('div')
  return render(counter.view, counter.init(), container)
}

// Get the text showing the current count
function getCount(dom) {
  return dom.querySelector('p').textContent
}

// Click a button
function clickButton(index, dom) {
  dom.querySelectorAll('button')[index].click()
}
```

This sets up some utility functions for interacting with and checking our component for testing purposes. These utilities use the plain ol' Javascript DOM API.

The `render` function returns an object that contains some handy results for testing. The `dom$` stream contains standard DOM Nodes that you can use to test what's happening in your markup.

The following are a set of tests that validate the behavior of the buttons and the count stream by interacting with the DOM:

```js
test('it initially shows zero', function(t) {
  var instance = createComponent()
  var countText = getCount(instance.dom$())
  t.strictEqual(countText, 'counter sum is 0')
  t.end()
})

test('it adds 1 to the count when clicking the increment button', function(t) {
  var instance = createComponent()
  // Click the first button to increment
  clickButton(0, instance.dom$())
  var countText = getCount(instance.dom$())
  t.strictEqual(countText, 'counter sum is 1')
  t.end()
})

test('it subtracts 1 when clicking the decrement button', function(t) {
  var instance = createComponent()
  // Click the second button to decrement
  clickButton(1, instance.dom$())
  var countText = getCount(instance.dom$())
  t.strictEqual(countText, 'counter sum is -1')
  t.end()
})

test('the count resets to 0 when clicking the reset button', function(t) {
  var instance = createComponent()
  // Click the first button to increment
  clickButton(0, instance.dom$())
  var countText = getCount(instance.dom$())
  t.strictEqual(countText, 'counter sum is 1')
  // Click the third button to reset
  clickButton(2, instance.dom$())
  countText = getCount(instance.dom$())
  t.strictEqual(countText, 'counter sum is 0')
  t.end()
})
```

To run the tests, modify this line to your `package.json`:

```bash
...
"scripts: {
  "test": "browserify test/index.js | tape-run test/index.js --render=='faucet'"
},
...
```

This bundles your test file using browserify (handling CommonJS requires), then pipes it into `tape-run`.

Run the tests with this command:

```bash
npm run test
```

See if you can break the component yourself, and what additional tests you could add to ensure your component's robustness!

## Where to go from here

Mastery of Flimflam requires mastery of its constituent libraries, so please refer to their documentation:
* [flyd](http://github.com/paldepind/flyd)
* [snabbdom](https://github.com/snabbdom/snabbdom)

Other very common, but more optional, libraries used in Flimflam modules are:
* [Ramda](http://ramdajs.com/) for general functional programming
* [PostCSS](https://github.com/postcss/postcss) for styling
* [es2040](https://github.com/ahdinosaur/es2040) for a selection of some newer javascript syntax features

To see more examples of Flimflam components, check out the [7GUIs benchmarks](https://github.com/flimflamjs/7guis).

See the [Modules](/#directory) section to see all the different npm packages you can use in your own UI.

See the [Articles](/#tutorials) section for tutorals on streams, styling, and other things!

