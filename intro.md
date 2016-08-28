# FlimFlam

Flimflam is a pattern for creating UI components on the web. It is functional, with similarities to React/Redux or Elm, but has its own very distinct differences. Its advantages include:


- Not a framework: flimflam is simply a standard for combining some core, base libraries.
- Part of the JS ecosystem; use modules from npm.
- Components are easily testable.
- Provides a curated directory of npm modules that are tested, documented, and work well with flimflam (and the browser in general).
- Truly modular and composable components, with never any need for globals or mutation. 
- A very simple and flexible architecture with strong aesthetics but few constraints.
- Fast virtual dom creation with Snabbdom.
- A robust, standard functional library with Ramda.
- Very strong handling of asynchronous behavior using Flyd.
- Bullet points.

# Example

The following is a quick example of a single component, which provides an interface for converting between Fahrenheit and Celsius. It uses ES6 syntax, which is optional:

```js
import flyd from 'flyd'
import h from 'snabbdom/h'
import snabbdom from 'snabbdom'
import render from 'ff-core/render'

// Initialize the state object
const init = ()=> {
  // Initialize input change event streams
  // Think of streams as values that change over time.
  // These two streams are input values that change over time, but start empty.
  const changeCelsius$ = flyd.stream()
  const changeFahren$ = flyd.stream()
  // Compute temperature values based on input changes
  const fahren$ = flyd.map(c => c * 9/5 + 32, state.changeCelsius$)
  const celsius$ = flyd.map(f => f * 1.8 + 32, state.changeFahren$)
  // The init function returns the state object for use in the view.
  return {changeCelsius$, changeFahren$, fahren$, celsius$} 
}

// The view takes the state object, initialized with init()
// It returns a Snabbdom tree
const view = state => { 
  return h('body', [
    h('div', [
      h('label', 'Fahrenheit')
    , h('input', {
        // Call the stream to obtain its current value.
        props: {value: state.fahren$()} 
        // Use the stream as an event handler.
      , on: {keyup: ev => state.changeFahren$(ev.currentTarget.value)}
      })
    ])
  , h('div', [
      h('label', 'Celsius')
    , h('input', {
        props: {value: state.celsius$()}
      , on: {keyup: ev => state.changeCelsius$(ev.currentTarget.value)}
      })
    ])
  ])
}

// Render the above component to the page
// Init the Snabbdom patch function.
// You can pick snabbdom modules here.
const patch = snabbdom.init([
  require('snabbdom/modules/eventlisteners')
, require('snabbdom/modules/props')
])
// Call the ff-core/render function to render the component to the dom. 
// We only need to call this render function once
// for the top level component.
// The dom will automatically patch when streams change.
render({container: document.body, state: init(), patch, view})
```

# Now what?

- [Getting started tutorial](#start)
- [View the directory of modules](#directory)
- [More tutorials and examples](#tutorials)
