#!/usr/bin/env node

const watch = require('watch')
const monitorDir = process.cwd();
const allPackagesDir = monitorDir + '/packages'
const exec = require("child_process")
  .exec
const glob = require("glob");

const filesToWatch = glob.sync('packages/*/{*.js,*.txt,package.json}')
  .filter(file => !file.endsWith('material.css.js'));

console.log('Changes to these files will cause bootstrap for specific package.\n -', filesToWatch.join('\n - '));
console.log('Note that if you add a file, you need to restart the watcher.');

const filterFunction = (file) => {
  const fileStripped = file.replace(monitorDir + '/', '');
  if (filesToWatch.findIndex(item => item == fileStripped) > -1) {
    return true;
  }
  return false;
}

const callback = (file) => {
  if (!filterFunction(file)) return;

  const relativeFilePath = file.replace(monitorDir + '/', '');
  const relativePackagePathSplitted = relativeFilePath.split('/');
  const relativePackageDir = [relativePackagePathSplitted[0], relativePackagePathSplitted[1]].join('/');
  const execCommand = 'scripts/bootstrap-package.sh ' + relativePackageDir;
  console.log('Running:', execCommand);
  exec(execCommand, (error, stdout, stderr) => {
    if (error) {
      console.error('Command failed: execCommand', error);
    } else {
      console.log('... command ok');
    }
    console.log('STDOUT:\n', stdout.split('\n')
      .join('\n'));
    console.log('STDERR:\n', stderr.split('\n')
      .join('\n'));
  });
}

watch.createMonitor(monitorDir, {
  interval: 1,
}, function (monitor) {
  monitor.on("created", callback);
  monitor.on("changed", callback);
  monitor.on("removed", callback);
})






// watch.watchTree(process.cwd(), callback)
