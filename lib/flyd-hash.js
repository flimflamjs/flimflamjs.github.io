const flyd = require('flyd')

// produce a stream of URL hash strings
const s = flyd.stream(window.location.hash)
window.onhashchange = () => s(window.location.hash)
module.exports = s
