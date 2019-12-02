const path = require('path');

const gulpPath = path.join(__dirname, 'scripts/gulp');
const tsconfigPath = path.join(__dirname, 'tsconfig.json');

require('ts-node').register({ project: tsconfigPath });
require(path.join(gulpPath, 'gulpfile'));
