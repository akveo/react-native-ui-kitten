import {
  src,
  task,
} from 'gulp';
import './example';

const typedoc = require('gulp-typedoc');
const exec = require('child_process').execSync;

task('generate-doc-json', generateDocJson);

task('process-type-doc', ['generate-doc-json'], processTypeDoc);

task('docs', ['generate-doc-json', 'process-type-doc']);

function generateDocJson() {
  return src(['src/framework/**/*.tsx', '!src/framework/**/*.spec.tsx'])
    .pipe(typedoc({
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
      resolveJsonModule: true,
      ignoreCompilerErrors: true,
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
}

function processTypeDoc() {
  return exec('prsr -g typedoc -f react -i docs/docs.json -o docs/src/input.json');
}
