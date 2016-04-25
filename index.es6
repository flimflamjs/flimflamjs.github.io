import main from './lib/main'
import h from 'snabbdom/h'
import R from 'ramda'
import render from 'flimflam-render'

const view = ctx => h('div.container', [main.view(ctx)])

let container = document.querySelector('#container')
render(main.init(), view, container)
