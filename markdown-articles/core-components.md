
# Flimflam Core GUI Components

Flimflam has a collection of core GUI components that are generally useful in any given application. This can be installed with:

```sh
npm install --save --save-exact ff-core
```

#### Modal

Modals are dialogs that are usually triggered asynchronously and show a bounded dialog on the page that lies over the content of the page. Modals in flimflam require so little logic that they are simply a snabbdom view function without any state to initialize: you simply need to pass in your stream of modal IDs and a unique id for this modal:

Launch example

View the source

_Example usage_

```js
import h from 'snabbdom/h'
import modal from 'ff-core/modal'

function view(state) {
  return h('div.modalExample', [
    h('button', {on: {click: [state.modalID$, 'modal1'}}, 'Launch modal 1')
  , h('button', {on: {click: [state.modalID$, 'modal2]}}, 'Launch modal 2')
  , modal({
      title: 'Modal 1'
    , body: 'modal 1 body content; can be snabbdom nodes'
    , thisID: 'modal1'
    , id$: state.modalID$
    })
  , modal({
      title: 'Modal 2'
    , body: 'modal 2 body content; can be snabbdom nodes'
    , thisID: 'modal2'
    , id$: state.modalID$
    })
  ])
}
```

#### Wizard

Wizards, aka sequential forms, have [very strong data](http://kylerush.net/blog/meet-the-obama-campaigns-250-million-fundraising-platform/) supporting their better usability. Luckily, they are easily implemented in flimflam. This is a component that allows you to create an interface with multiple steps, tracking a `currentStep$` stream. The user can advance forwards and jump backwards. A common use case is to place a separate form on each step and advance the step when each form is successfully submitted.

_Show example_

_View source_

_Example usage_

```js
import h from 'snabbdom/h
import flyd from 'flyd'

function init(params) {
}

function view(state) {
  return h('div.wizardExample', [
  ])
}
```

#### Notification

Paragraph description goes here

Show Example

```js
```

#### Submit Button

Paragraph description goes here

Show Example

```js
```

#### Validated Form

Paragraph description goes here

Show Example

```js
```
