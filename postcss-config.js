module.exports = {
  use: [
    'postcss-import'
  , 'precss'
  , 'autoprefixer'
  ]
, 'local-plugins': true
, 'autoprefixer': {browsers: 'last 2 versions'}
, input: 'styles/index.css'
, output: 'styles/build.css'
}
