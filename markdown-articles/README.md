# flimflamjs.github.io

This is the main website for FLIMFLAM. It uses flimflam itself for the CMS and pulls material from markdown files off github, from this repo and also from the [flimflam-docs](https://github.com/flimflamjs/flimflam-docs) repo.

## Dev

To run the dev server: `npm run dev`

To build: `npm run build`

Source code changes go in the `src` branch, not master.

#### Deploying

The build script (`./build.sh`) will put everything in a `dist/` directory. To deploy, do the following:

- `npm run build`
- `cd dist`
- `git init`
- `git remote add gh-deploy https://github.com/flimflamjs/flimflamjs.github.io.git`
- `git add --all; git commit -m 'Build'`
- `git push -f gh-deploy master`

