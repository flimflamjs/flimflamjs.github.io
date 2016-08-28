import h from 'snabbdom/h'
import R from 'ramda'
import flyd from 'flyd'
import request from 'flyd-ajax'
import marked from 'marked'
import hashStream from './flyd-hash'
flyd.flatMap = require('flyd/module/flatmap')
flyd.filter = require('flyd/module/filter')
import hljs from 'highlight.js'

// Markdown highlighting from: https://www.npmjs.com/package/marked
marked.setOptions({
  highlight: (code, lang, cb) => hljs.highlight(lang, code).value
})

function init() {
  let state = { page: location.hash, directory: {} }
 
  let streams = { page: hashStream }

  streams.content = flyd.flatMap(
    hash => request({ method: 'GET' , url: (hash || '#intro').replace('#', '/') + '.md' }).load
  , hashStream
  )

  streams.directory = flyd.map(
    resp => JSON.parse(resp)
  , request({method: 'GET', url: 'https://raw.githubusercontent.com/flimflamjs/directory-json/master/registry.json'}).load
  )

  return {state, streams}
}

function view(ctx) {
  return h('div.main', [
    sidebar(ctx)
  , content(ctx)
  ])
}

function sidebar(ctx) {
  return h('div.sidebar', [
    imgLogo()
  , menuItems(ctx)
  ])
}

function content(ctx) {
  return h('div.content', [
    h('div', {props: {
      innerHTML: marked(ctx.state.content || '')
    }})
  , ctx.state.page === '#directory' ? directory(ctx) : ''
  ])
}

function directory(ctx) {
  if(!ctx.state.directory.packages) return ''

  return h('div', [ 
    // h('input', {props: {type: 'text', placeholder: 'Search Packages'}})
    h('table.directory', R.map(moduleEntry(ctx), ctx.state.directory.packages))
  ])
}


const moduleEntry = ctx => module => {
  return h('tbody', [
    h('tr', [
      h('td.package-name', [h('a', {attrs: {target: '_blank'}, props: {href: `https://github.com/${module.github}`}}, module.npm)])
    , h('td.package-labels', R.map( l => h('span.package-label', l) , module.labels))
    ])
  , h('tr.package-desc', [ h('td', {attrs: {colspan: 5}}, module.desc) ]) 
  ])
}


function menuItems(ctx) {
  // list out tutorials/guides
  // about
  // counter tutorial
  // todo tutorial
  // about
  return h('ul.nav', [
    h('li.nav-item', [h('a', {props: {href: '#start'}}, 'get started')])
  , h('li.nav-item', [h('a', {props: {href: '#directory'}}, 'module directory')])
  , h('li.nav-item', [h('a', {props: {href: '#tutorials'}}, 'tutorials/examples')])
  , h('li.nav-item', [h('a', {props: {href: '#articles'}}, 'articles')])
  , h('li.nav-item', [h('a', {props: {href: '#submit'}}, 'submit a module')])
  ])
}

const imgLogo = () =>
  h('a', {props: {href: '#intro'}}, [
    h('img.headerImg', {props: {src: 'images/flimflam.png'}})
  ])

module.exports = {view, init}
