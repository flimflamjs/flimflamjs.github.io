#!/bin/bash
mkdir -p dist
mkdir -p dist/markdown-articles
cp -r index.html dist/
cp -r styles/ dist/
cp -r images/ dist/
cp markdown-articles/*.md dist/markdown-articles/
browserify -t es2040 index.js | uglifyjs -cm > dist/index.js
