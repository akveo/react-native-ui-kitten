import * as fs from 'fs';
import * as gulp from 'gulp';
import {
  GulpCompletionCallback,
  PACKAGES_DIR,
  ROOT_DIR,
} from './common';

type PackageJson = any;

const PACKAGES: string[] = [
  'components',
  'date-fns',
  'eva-icons',
  'metro-config',
  'moment',
  'template-js',
  'template-ts',
];

const TEMPLATES: string[] = [
  'template-js/template',
  'template-ts/template',
];

const VERSION: string = require(`${ROOT_DIR}/package.json`).version;

gulp.task('bump-version', gulp.parallel(
  bumpPackages,
  bumpTemplates,
  bumpMasterPackage,
));

function bumpPackages(done: GulpCompletionCallback): void {
  PACKAGES.map(createPathToPackageJson)
          .map(bumpVersionAndFrameworkDependencies);

  done();
}

function bumpTemplates(done: GulpCompletionCallback): void {
  TEMPLATES.map(createPathToPackageJson)
           .map(bumpFrameworkDependencies);

  done();
}

function bumpMasterPackage(done: GulpCompletionCallback): void {
  bumpVersionAndFrameworkDependencies(`${ROOT_DIR}/package.json`);

  done();
}

function createPathToPackageJson(packageName: string): string {
  return `${PACKAGES_DIR}/${packageName}/package.json`;
}

function isFrameworkPackage(packageName: string): boolean {
  return packageName.startsWith('@ui-kitten');
}

function bumpVersionAndFrameworkDependencies(packagePath: string): void {
  return modifyPackageJson(packagePath, (json: PackageJson): PackageJson => {
    json.version = VERSION;
    logBump(null, json.name);

    return bumpFrameworkDependenciesAndPeerDependencies(json);
  });
}

function bumpFrameworkDependencies(packagePath: string): void {
  return modifyPackageJson(packagePath, bumpFrameworkDependenciesAndPeerDependencies);
}

function modifyPackageJson(packagePath: string, updater: (json: PackageJson) => PackageJson) {
  const updatedPackageJson: PackageJson = updater(require(packagePath));

  fs.writeFileSync(packagePath, JSON.stringify(updatedPackageJson, null, 2));
}

function bumpFrameworkDependenciesAndPeerDependencies(json: PackageJson): PackageJson {
  if (json.dependencies) {
    Object.keys(json.dependencies)
          .filter(isFrameworkPackage)
          .forEach((packageName: string): void => {
            json.dependencies[packageName] = VERSION;
            logBump(json.name, packageName);
          });
  }

  if (json.peerDependencies) {
    Object.keys(json.peerDependencies)
          .filter(isFrameworkPackage)
          .forEach((packageName: string): void => {
            json.peerDependencies[packageName] = VERSION;
            logBump(json.name, packageName);
          });
  }

  return json;
}

function logBump(rootPackage: string, packageName: string): void {
  // tslint:disable-next-line
  console.log(`Bump ${packageName} of ${rootPackage} to ${VERSION}`);
}
