// produce a stream of URL hash strings
import flyd from 'flyd'
let s = flyd.stream(window.location.hash)
window.onhashchange = _ => s(window.location.hash)
module.exports = s
