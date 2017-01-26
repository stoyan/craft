# CRAFT

Create React App From Template

Use your own starting point when setting up a new app, e.g. CSS, JS, manifests an such.

## Install

    $ npm install -g create-react-app
    $ npm install -g craftool
  
## Create a new app

    $ craft MyApp https://github.com/stoyan/fail/archive/master.zip
  
This creates an app called `MyApp` using a zip template from github

## Get serious

    $ cd MyApp
    $ npm install . # sets up create-react-app
    $ npm start .   # start developing
    $ npm run build # deploy
