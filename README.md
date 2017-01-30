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

### Special files in templates

CRAFT has a spacial treatment for some files:

  * `package.json` - CRAFT overwrites the app name with the name provided by the user and sets the version to `1.0.0`
  * `README.md` - it's completely rewritten with a simple app name and "Hello". So feel free to add any useful text that shows up in github or npm, it will be gone in the newly-generated user app
  * `postcraft.txt` - after the app is generated successfully the use is instructed to go to the new app and run `npm install .`. If you have any other words of wisdom, put them there so they can be shown to the user. The file itself is deleted from the newly generated app
  
CRAFT has a special treatment for all .CSS, .JS, .HTML and .JSON files. In all of these files all strings matching the name of template's name (read from `package.json`) are replaced with the name of the newly generated app (set by the user). So if the user does...

    $ craft MyApp https://github.com/stoyan/fail/archive/master.zip
    
... then the template's `index.html` (just one example) turns from...

```html
<title>fail</title>
```

... to...

```html
<title>MyApp</title>
```

... provided the template's `package.json` has...

```json
{
  "name": "fail",
  /* ... */
}
```

## Fiddling with/contributing to CRAFT

 * Clone the repo
 * `npm install .`
 * `node index.js MyApp http://example.org/zip.zip`