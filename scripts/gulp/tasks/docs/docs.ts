import {
  src,
  task,
} from 'gulp';
import './example';
// import { structure as DOCS } from '../../../../docs/structure';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'fs';
import {
  isAbsolute,
  join,
  resolve,
  sep,
} from 'path';
import { DOCS_DIST } from '../config';

const typedoc = require('gulp-typedoc');
const exec = require('child_process').execSync;

task('docs', ['generate-doc-json']);
task('generate-doc-json', generateDocJson);
task('process-type-doc', ['generate-doc-json'], processTypeDoc);

// task('create-docs-dirs', () => {
//   const docsStructure = flatten('docs', routesTree(DOCS));
//   createDirsStructure(docsStructure);
// });

function generateDocJson() {
  src(['src/framework/ui/**/*.tsx', '!src/framework/ui/**/*.spec.tsx'])
    .pipe(typedoc({
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
      resolveJsonModule: true,
      moduleResolution: 'node',
      jsx: 'react',
      target: 'ES6',
      module: 'commonjs',
      baseUrl: './',
      paths: {
        '@kitten/*': ['./src/framework/*'],
      },
      excludeExternals: true,
      exclude: './node_modules/**/*',
      json: './docs/docs.json',
    }));
  exec('prsr -g typedoc -f angular -i docs/docs.json -o docs/output.json');
}

function processTypeDoc() {
  return exec('prsr -g typedoc -f angular -i docs/docs.json -o docs/output.json');
}

// function routesTree(structure) {
//   return structure
//     .filter((page: any) => ['section', 'page', 'tabs'].includes(page.type))
//     .map((page: any) => {
//       if (page.type === 'tabs') {
//         page.children = ['overview', 'api', 'theme', 'examples']
//           .map(name => ({
//             name,
//             type: 'page',
//           }));
//       }
//       return page;
//     })
//     .map((page: any) => {
//       return {
//         path: prepareSlag(page.name),
//         children: page.children ? routesTree(page.children) : [],
//       };
//     });
// }

// function prepareSlag(name) {
//   return name.replace(/[^a-zA-Z0-9\s]+/g, '')
//              .replace(/\s/g, '-')
//              .toLowerCase();
// }
//
// function flatten(root, arr) {
//   let res: any[] = [];
//   arr.forEach((item: any) => {
//     const path = `${root}/${item.path}`;
//     res.push(path);
//     if (item.children) {
//       res = res.concat(flatten(path, item.children));
//     }
//   });
//
//   return res;
// }
//
// function createDirsStructure(dirs) {
//   const index = readFileSync(join(DOCS_DIST, 'index.html'), 'utf8');
//   dirs.forEach((dir: any) => {
//     const fullPath = join(DOCS_DIST, dir);
//     if (!existsSync(fullPath)) {
//       mkDirByPathSync(fullPath);
//     }
//
//     writeFileSync(join(fullPath, 'index.html'), index);
//   });
// }
//
// function mkDirByPathSync(targetDir, { isRelativeToScript = false } = {}) {
//   const initDir = isAbsolute(targetDir) ? sep : '';
//   const baseDir = isRelativeToScript ? __dirname : '.';
//
//   targetDir.split(sep)
//            .reduce((parentDir, childDir) => {
//              const curDir = resolve(baseDir, parentDir, childDir);
//              try {
//                mkdirSync(curDir);
//              } catch (err) {
//                if (err.code !== 'EEXIST') {
//                  throw err;
//                }
//              }
//
//              return curDir;
//            }, initDir);
// }
