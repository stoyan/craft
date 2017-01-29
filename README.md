# CRAFT

Create React App From Template

Use your own starting point when setting up a new app, e.g. CSS, JS, manifests an such.

## Install

    $ npm install -g create-react-app
    $ npm install -g craftool
  
## Create a new app

    $ craft MyApp https://github.com/stoyan/fail/archive/master.zip
    $ cd MyApp
    $ npm install . # sets up create-react-app
  
This creates an app called `MyApp` using a zip template from github

## Get serious

    $ npm start .   # start developing
    $ npm run build # deploy

## Creating templates

To create your own template you use create-react-app first. Then you tweak the app until you're happy with it and you want to use it as a template for other apps.

Now you zip everything in the root of your app except for any `build/` or `node_modules/`.

Normally your zip contains:

 * `package.json`
 * `README.md` (doesn't matter, it will be rewritten when a new app is generated from the template)
 * other root-y things like `manifest.json` (for PWA), `.gitignore`, `LICENSE`, `.travis.yml` and so on
 * `public/` folder with `index.html`, `favicon.ico`...
 * `src/` folder with `App.js`, `App.css`, `images\` ...

If you put these things on Github, let Github do the zipping.

An example template: https://github.com/stoyan/fail/

![Example template](/README-example-template.png?raw=true)

## Fiddling with/contributing to CRAFT

 * Clone the repo
 * `npm install .`
 * `node index.js MyApp http://example.org`