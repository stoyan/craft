if (process.argv.length < 4) {
  console.log('Please provide an app name and a ZIP with the template');
  console.log('e.g.');
  console.log('$ craft MyApp https://github.com/stoyan/fail/archive/master.zip');  
  process.exit(1);
}

const fs = require('fs-extra');
const path = require('path');
const request = require('request');
const url = require('url');
const unzip = require('extract-zip');

const stat = fs.statSync;
 
const zip = process.argv[3];
const app = process.argv[2];

const replacebles = [
  '.html',
  '.css',
  '.js',
  '.json',
].reduce((res, el) => {res[el] = 1; return res;}, {});

console.log('Validating...');
const uri = url.parse(zip);
if (!uri.host || !uri.path || !uri.protocol) {
  console.error(zip, 'is not a valid URL');
  process.exit(1);  
}
const appDir = path.resolve(__dirname, app);

try {
  stat(appDir);
  console.error(appDir, 'already exists, giving up');
  process.exit(1);  
} catch (_) {}

console.log('Making app dir...');
fs.mkdirSync(appDir);
const tempDir = fs.mkdtempSync(appDir);
const tempUnzipDir = fs.mkdtempSync(tempDir);

console.log('Downloading template...');
const localZip = path.resolve(tempDir, 'template.zip');
const file = fs.createWriteStream(localZip);

request
  .get(zip)
  .on('error', err => {
    console.error(err);
    process.exit(1);
  })
  .pipe(file);


file.on('finish', () => {
  file.close(() => {
    let packageDir;
    console.log('Unzipping...');
    unzip(localZip, {
        dir: tempUnzipDir,
        onEntry: entry => {
          if (entry.fileName.endsWith('package.json')) {
            packageDir = path.resolve(tempUnzipDir, path.dirname(entry.fileName));
          }
        },
      }, err => {
        if (err) {
          console.error('Error unzipping', localZip);
          process.exit(1);
        }
        if (!packageDir) {
          console.error('package.json missing from the template');
          process.exit(1);
        }
        console.log('Configuring app...')
        createApp(packageDir, appDir);
    })
  });
});


function createApp(source, dest) {
  fs.copy(source, dest, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    const packageJson = path.resolve(dest, 'package.json');
    const oldPackage = require(packageJson);
    
    // replace all app names in all files
    replaceFiles(dest, oldPackage.name, app);

    // write package json
    oldPackage.name = app;
    oldPackage.version = '1.0.0';
    fs.writeFile(packageJson, JSON.stringify(oldPackage, null, 2), (err) => {
      if (err) {
        console.error(err);
      }
    });
    
    // write readme
    fs.writeFile(
      path.resolve(dest, 'README.md'),
      `# ${app}\n\nHello`,
      () => {}
    );
    
    rmTemp();
  });
}

function rmTemp() {
  fs.remove(tempDir, () => {});
  fs.remove(tempUnzipDir, () => {});
}

function replaceFiles(dir, seek, replaceWith) {
  fs.readdirSync(dir).forEach(f => {
    if (f.startsWith('.')) {
      return; // no .DS_Store etc, thank you
    }
    if (f === 'package.json' || f.startsWith('README')) {
      return; // special plan for these
    }
    
    const file = path.resolve(dir, f);
    const stats = stat(file);
  
    if (stats.isDirectory()) {
      return replaceFiles(file, seek, replaceWith);
    }
    if (!replacebles[path.extname(f)]) {
      return; // images and such
    } 
    
    fs.readFile(file, 'utf-8', (err, contents) => {
      if (err) {
        console.error(err);
      }
      contents = contents.replace(new RegExp(seek, 'g'), replaceWith);
      fs.writeFile(file, contents, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });

  });
}
