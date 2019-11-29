const path = require('path');

const gulpPath = path.join(__dirname, 'scripts/gulp');

require('ts-node').register({ project: path.resolve('tsconfig.json') });
require(path.join(gulpPath, 'gulpfile'));
