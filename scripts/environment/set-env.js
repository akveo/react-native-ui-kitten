const path = require('path');
const fs = require('fs');

const scriptArguments = process.argv.splice(2);
const { [0]: envArgument } = scriptArguments;

const rootDir = path.resolve(__dirname, '../../');

const envConfigFile = path.resolve(rootDir, `config/${envArgument}.env.js`);
const envConfigMainFile = path.resolve(rootDir, `config/index.js`);

fs.copyFileSync(envConfigFile, envConfigMainFile);

