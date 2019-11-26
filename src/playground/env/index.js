const path = require('path');

const evaPath = path.resolve(__dirname, '../../../../eva');

module.exports = {
  ENV: 'dev',
  MAPPING_PATH: path.resolve(evaPath, 'packages/eva'),
  MAPPING_PATH_MATERIAL: path.resolve(evaPath, 'packages/material'),
  PROCESSOR_PATH: path.resolve(evaPath, 'packages/processor')
};
