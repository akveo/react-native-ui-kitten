const path = require('path');

const evaPath = path.resolve(__dirname, '../../eva');

module.exports = {
  ENV: 'dev',
  MAPPING_PATH: path.resolve(evaPath, 'packages/eva'),
  PROCESSOR_PATH: path.resolve(evaPath, 'packages/processor')
};
