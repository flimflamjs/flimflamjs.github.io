const main = require('./lib')
const snabbdom = require('snabbdom')
const h = require('snabbdom/h')
const R = require('ramda')
const render = require('ff-core/render')

const view = state => h('div.container', [main.view(state)])
const patch = snabbdom.init([
  require("snabbdom/modules/class")
, require("snabbdom/modules/style")
, require("snabbdom/modules/props")
, require("snabbdom/modules/eventlisteners")
, require("snabbdom/modules/attributes")
])


const container = document.querySelector('#container')
render({state: main.init(), view, container, patch})
