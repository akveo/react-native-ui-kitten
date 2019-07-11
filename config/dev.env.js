const path = require('path');

const evaPath = path.resolve(__dirname, '../../eva');

module.exports = {
  ENV: 'dev',
  MODULES_PATH: path.resolve(__dirname, '../src'),
  MAPPING_PATH: path.resolve(evaPath, 'packages/eva'),
  PROCESSOR_PATH: path.resolve(evaPath, 'packages/processor')
};
