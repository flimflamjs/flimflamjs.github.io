import h from 'snabbdom/h'
import R from 'ramda'
import flyd from 'flyd'
import request from 'flyd-ajax'

import hashStream from './flyd-hash'

const markdownIt = require('markdown-it')()
flyd.flatMap = require('flyd/module/flatmap')
flyd.filter = require('flyd/module/filter')

function init() {
  let state = { page: location.hash, directory: {} }
 
  let streams = { hash: hashStream }

  streams.content = flyd.flatMap(
    hash => request({ method: 'GET' , url: (hash || 'intro').replace('#', '/') + '.md' }).load
  , hashStream
  )

  streams.packages = flyd.map(
    resp => JSON.parse(resp)
  , request({method: 'GET', url: 'https://raw.githubusercontent.com/flimflamjs/directory-json/master/registry.json'}).load
  )

  let updates = { 
    content: R.assoc('content')
  , hash: (h, s) => R.assoc('page', h, s)
  , packages: (t, s) => R.assoc('directory', t, s)
  }

  return {state, updates, streams}
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
  console.log("page", ctx.state.page)
  return h('div.content', [
    h('div', {props: {innerHTML: markdownIt.render(ctx.state.content || '')}})
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
      h('td.package-name', [h('a', {props: {href: `https://github.com/${module.github}`}}, module.npm)])
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
  , h('li.nav-item', [h('strong', [h('a', {props: {href: '#directory'}}, 'module directory')])])
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
