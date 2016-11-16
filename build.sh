#!/bin/bash
mkdir -p dist
cp -r index.html dist/
cp -r styles/ dist/
cp -r images/ dist/
cp *.md dist/
browserify -t babelify index.es6 | uglifyjs -cm > dist/index.js
