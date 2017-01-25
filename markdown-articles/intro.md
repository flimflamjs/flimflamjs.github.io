# Hello!

Flimflam is a pattern for creating UI components on the web. It embraces functional programming, virtual DOM, and streams.

- Combines [snabbdom](https://github.com/snabbdom/snabbdom) and [flyd](https://github.com/paldepind/flyd) into a fun UI programming pattern.
- Is plain JS and is part of the normal `npm` ecosystem
- Allows for easy unit testing of components
- Has a pre-existing collection of reusable, themable, composable UI components
- Never requires you to define any globals or do any mutations

# Quick Example

A small UI component that will convert values between fahrenheit and celsius using two inputs:

```js
const flyd = require('flimflam/flyd')
const h = require('flimflam/h')

// Most components have an "init" function, which creates a state object
// State objects primarily contain flyd streams
const init = () => {

  // These two streams will contain user input events
  const keyupCelsius$ = flyd.stream()
  const keyupFahren$ = flyd.stream()

  // Cretate streams that contain the actual input values
  const celsiusValue$ = flyd.map(getValue, keyupCelsius$)
  const fahrenValue$ = flyd.map(getValue, keyupFahren$)

  // Streams of converted temperature values
  const fahren$ = flyd.map(computeFahren, fahrenValue$)
  const celsius$ = flyd.map(computeCelsius, celsiusValue$)

  // Return the streams we want to use in the view
  // This returned object is the UI "state"
  return {keyupCelsius$, keyupFahren$, fahren$, celsius$} 
}


// The view takes the state object
// It returns a snabbdom tree
const view = state =>
  h('body', [fahrenheitInput(state), celsiusInput(state)])

// A view function for the fahrenheit label and input
const fahrenheitInput = state =>
  h('div', [
    h('label', 'fahrenheit')
  , h('input', {
      props: {value: state.fahren$()} 
    , on: {keyup: state.keyupFahren$}
    })
  ])

// A view function for the celsius label and input
const celsiusInput = state =>
  h('div', [
    h('label', 'celsius')
  , h('input', {
      props: {value: state.celsius$()}
    , on: {keyup: state.keyupCelsius$}
    })
  ])


// Utilities for computing the temperatures
const computeFahren  = c => c * 9/5 + 32
const computeCelsius = f => f * 1.8 + 32

// A utility for getting the input value from an event as a number
const getValue = ev => Number(ev.currentTarget.value)

// UI components usually export two functions: init and view
module.exports = {init, view}
```
