const h = require('snabbdom/h')
const R = require('ramda')
const request = require('flyd-ajax')
const marked = require('marked')
const hashStream = require('./flyd-hash')
const hljs = require('highlight.js')

const flyd = require('flyd')
flyd.flatMap = require('flyd/module/flatmap')
flyd.filter = require('flyd/module/filter')

// Markdown highlighting from: https://www.npmjs.com/package/marked
marked.setOptions({
  highlight: (code, lang, cb) => hljs.highlight(lang, code).value
})

const init = () => {
  const content$ = flyd.flatMap(getArticle, hashStream)
  return {page$: hashStream, content$}
}

// Fetch a markdown article using ajax
const getArticle = hash => 
  request({ 
    method: 'GET' 
  , url: 'markdown-articles/' + (hash || '#intro').replace('#', '') + '.md'
  }).load

const view = state =>
  h('div.main', [sidebarDiv(state), contentDiv(state)])

const sidebarDiv = (state) =>
  h('div.sidebar', [imgLogo(), menuItems(state)])

const contentDiv = (state) =>
  h('div.content', [
    h('div', {props: {
      innerHTML: marked(state.content$() || '')
    }})
  , state.page$() === '#directory' ? directory(state) : ''
  ])

const directory = (state) => {
  if(!state.directory) return ''
  return h('div', [ 
    // h('input', {props: {type: 'text', placeholder: 'Search Packages'}})
    // h('table.directory',
    //   R.map(moduleEntry(state), state.directory.packages)
    // )
  ])
}

const moduleEntry = state => module => {
  return h('tbody', [
    h('tr', [
      h('td.package-name', [h('a', {attrs: {target: '_blank'}, props: {href: `https://github.com/${module.github}`}}, module.npm)])
    , h('td.package-labels', R.map( l => h('span.package-label', l) , module.labels))
    ])
  , h('tr.package-desc', [ h('td', {attrs: {colspan: 5}}, module.desc) ]) 
  ])
}

const menuItems = (state) =>
  h('ul.nav', [
    h('li.nav-item', [h('a', {props: {href: '#start'}}, 'Get Started')])
  , h('li.nav-item', [h('a', {props: {href: '#directory'}}, 'Modules')])
  , h('li.nav-item', [h('a', {props: {href: '#tutorials'}}, 'Articles')])
  , h('li.nav-item', [h('a', {props: {href: '#submit'}}, 'Contribute')])
  ])

const navItem = (href, label, state) =>
console.log({href, page: state.page$()}) ||
  h('a', {
    props: {href}
  , attrs: {'data-navItem': state.page$() === href ? 'active' : 'inactive'}
  }, label)

const imgLogo = () =>
  h('a', {props: {href: '#intro'}}, [
    h('img.headerImg', {props: {src: 'images/flimflam.png'}})
  ])

module.exports = {view, init}
