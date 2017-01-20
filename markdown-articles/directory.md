# Modules

## flimflam

This is the core module that enables the creation of UI components. It is split up into a number of sub-modules.

* NPM package: `flimflam`
* Github/docs: https://github.com/flimflamjs/flimflam

### flimflam/h

This is a virtual DOM element creation function, which comes directly from [snabbdom](). Refer to the snabbdom documentation to see its API.

```js
const h = require('flimflam/h')
```

### flimflam/flyd

This is a functional reactive programming library at the core of the flimflam pattern. You can refer to the [flyd]() documentation to see its API. Unlike the regular flyd package, requiring this will also include all of its submodules, like `flyd.flatMap`, `flyd.mergeAll`, etc.

```js
const flyd = require('flimflam/flyd')
```

### flimflam/ui

This is a set of basic UI components that will likely be needed in any application. See below:

* flimflam/ui/modal
* flimflam/ui/wizard
* flimflam/ui/confirmation
* flimflam/ui/notification
* flimflam/ui/tabswap
* flimflam/ui/validated-form
* flimflam/ui/autocomplete
* flimflam/ui/combobox
* flimflam/ui/togglebox

## ramda

This is an optional but very useful standard library for general functional programming.

* NPM package: `ramda`
* Github: https://github.com/snabbdom/snabbdom
* Docs: http://ramdajs.com/docs

## flyd-ajax

Make ajax requests and return the responses as flyd streams.

## UI Components

* dashboard
* file-uploader

## Flyd utilities

* flyd-undo
* flyd-windowresize
* flyd-zip
* flyd-stream-querystring

# Development aids

## browserify

Browserify is an essential tool for bundling your modular javascript code for the frontend.

## es2040

This confusingly-named browserify transform gives you a set of useful es6 features, like `const` and arrow functions, without giving you all of the changes.

## budo

This is a very handy development prototyping server for browserify with live reload.

## postcss

This is the best way to handle CSS by using composable modules.

# Other NPM packages!

Find and use any other high-quality NPM packages in your UI components.

