/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/**
 * Additional scripts needed to correctly setup a project.
 * Based on https://github.com/react-native-community/react-native-template-typescript.
 *
 * Runs as install script on `npm install` and replaces self after everything is done.
 *
 * - Replaces useless .js files
 * - Adds tsconfig.json
 */

const fs = require('fs');
const path = require('path');

if (fs.existsSync(path.join(__dirname, '.travis.yml'))) {
  process.exit()
}

const projectFilesToDelete = [
  '.flowconfig',
  'App.js',
  '__tests__/App-test.js',
];

const templateFilesToAdd = [
  '_tsconfig.json',
];

const templateFilesToDelete = [
  'install.js',
  '_tsconfig.json',
];

const deleteFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return
  }

  fs.unlinkSync(filePath)
};

const projectPath = path.join(__dirname, '..', '..');

const projectFilePath = (fileName) => {
  return path.join(projectPath, fileName);
};

const templateFilePath = (fileName) => {
  return path.join(__dirname, fileName);
};

const replaceTemplateFile = (fileName) => {
  const newName = fileName.replace('_', '');
  fs.copyFileSync(templateFilePath(fileName), templateFilePath(newName));
};

const deleteProjectFile = (fileName) => {
  deleteFile(projectFilePath(fileName));
};

const deleteTemplateFile = (fileName) => {
  deleteFile(templateFilePath(fileName));
};

templateFilesToAdd.forEach(replaceTemplateFile);
projectFilesToDelete.forEach(deleteProjectFile);
templateFilesToDelete.forEach(deleteTemplateFile);
