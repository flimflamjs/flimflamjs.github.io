# Get Started

Let's go on an adventure---a text adventure! I will guide you through the process of creating UI with Flimflam by creating a text adventure game.

This tutorial assumes you already have some knowledge of frontend development.

## Setup and build

Before you start, make sure you have **node** and **npm** installed, then create a **git** repo, and run `npm init`.

Now let's install some basic modules:

```sh
npm install --save --save-exact flimflam ramda
npm install --save-dev --save-exact budo
```

**flimflam** is the core library, **ramda** provides a standard library for general functional programming, and **budo** is a handy build tool for serving your code.

## Basic View 

Rendering HTML is handled with [snabbdom](). You can refer to the documentation there to get into the details of its API. The only function we are concerned with is the `h()` function.

All UI has a top-level `view()` function that returns a snabbdom VNode tree. This top-level view function will contain other nested view functions.

Start by creating a file called `index.js` and coding up some virtual dom:

```js
const h = require('flimflam/h')

const view = state =>
  h('body', [
    areaDescDiv(state)
  , entityDescDiv(state)
  , inventoryDiv(state)
  ])

const areaDescDiv = state =>
  h('div.text', [
    'Our text adventure output will go here.'
  ])

const entityDescDiv = state =>
  h('div.input', [
    "Descriptions of various entities in the area will go here."
  ])

const inventoryDiv = state =>
  h('div.inventory', [
    "The player's inventory will go here"
  ])
```

Our text adventure game will have several sections: a description of the current area, a set of directions the player can move into, a set of conditional descriptors depending on the state of the area, and a list of items the player can interact with.

And, in addition, the player will have her own inventory of pick-up-able items.

## Dynamic Behavior

## Functional Programming

## Styling and Themes

