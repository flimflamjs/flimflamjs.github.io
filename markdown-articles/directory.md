# Modules

## flimflam

This is the core meta-package that includes all of flimflam's dependencies, plus the basic UI components from ff-core-ui. It is split up into a number of sub-modules, listed below.

* NPM package: `flimflam`
* Github/docs: https://github.com/flimflamjs/flimflam

### flimflam/h

`h()` is the function from [snabbdom](https://github.com/snabbdom/snabbdom) that creates virtual DOM elements and is essential for creating the presentation layer of your components.

```js
const h = require('flimflam/h')
```

### flimflam/flyd

Flyd is a functional reactive programming library at the core of the flimflam pattern, useful for controlling and abstracting over asynchronous, changing data. You can refer to the [flyd]() documentation to see its API. Unlike the regular flyd package, requiring this will also include all of its submodules, like `flyd.flatMap`, `flyd.mergeAll`, etc.

```js
const flyd = require('flimflam/flyd')
```

### flimflam/ui

The `flimflam/ui` directory contains all the basic UI components found in [ff-core-ui](https://github.com/flimflamjs/ff-core):

* [`flimflam/ui/modal`](https://github.com/flimflamjs/ff-core/tree/master/modal)
* [`flimflam/ui/wizard`](https://github.com/flimflamjs/ff-core/tree/master/wizard)
* [`flimflam/ui/confirmation`](https://github.com/flimflamjs/ff-core/tree/master/confirmation)
* [`flimflam/ui/notification`](https://github.com/flimflamjs/ff-core/tree/master/notification)
* [`flimflam/ui/tabswap`](https://github.com/flimflamjs/ff-core/tree/master/tabswap)
* [`flimflam/ui/validated-form`](https://github.com/flimflamjs/ff-core/tree/master/validated-form)
* [`flimflam/ui/autocomplete`](https://github.com/flimflamjs/ff-core/tree/master/autocomplete)
* [`flimflam/ui/combobox`](https://github.com/flimflamjs/ff-core/tree/master/combobox)
* [`flimflam/ui/togglebox`](https://github.com/flimflamjs/ff-core/tree/master/togglebox)

## ramda

This is an optional but very useful standard library for functional programming. It is generally ubiquitous in Flimflam components but is not a requirement.

* NPM package: `ramda`
* Github: https://github.com/snabbdom/snabbdom
* Docs: http://ramdajs.com/docs

## More UI Components

* dashboard
* file-uploader

## More Flyd utilities

* See the `Modules` section in the Flyd documentation: [https://github.com/paldepind/flyd#modules](https://github.com/paldepind/flyd#modules)
* [`flyd-ajax`](https://github.com/jayrbolton/flyd-ajax): Make ajax requests that return streams that contain responses
* [`flyd-undo`](https://github.com/jayrbolton/flyd-undo): Add undo functionality into your UI with this module ([see example here](https://github.com/flimflamjs/7GUIs/tree/master/circle-drawer))

# Development aids

## [browserify](https://github.com/substack/node-browserify)

Browserify is an essential tool for bundling your modular javascript code into a single file for the frontend.

## [es2040](https://github.com/ahdinosaur/es2040)

This confusingly-named browserify transform gives you a set of useful es6 features, like `const` and arrow functions, without giving you all of the changes.

## [budo](https://github.com/mattdesl/budo)

This is a very handy development prototyping server for browserify with live reload.

## [postcss](https://github.com/postcss/postcss)

This is the best way to handle CSS by using composable modules to build and transform your css. Flimflam UI components typically include base styles and themes, which can be imported from your `node_modules` using [postcss-import](https://github.com/postcss/postcss-import).

## [tape](https://github.com/substack/tape), [tape-run](https://github.com/juliangruber/tape-run), [zuul](https://github.com/defunctzombie/zuul), ...

These are great for creating unit tests and browser tests for your components.

# Other NPM packages!

Find and use any other high-quality NPM packages in your UI components.

