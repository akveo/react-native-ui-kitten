const path = require('path');
const fs = require('fs');

const scriptArguments = process.argv.splice(2);
const { [0]: envArgument } = scriptArguments;

const envConfigFile = path.resolve(__dirname, `./${envArgument}.env.js`);
const envConfigMainFile = path.resolve(__dirname, `./index.js`);

fs.copyFileSync(envConfigFile, envConfigMainFile);
