const path = require('path');

const evaPath = path.resolve(__dirname, '../../../node_modules/@eva-design');

module.exports = {
  ENV: 'prod',
  MAPPING_PATH: path.resolve(evaPath, 'eva'),
  PROCESSOR_PATH: path.resolve(evaPath, 'processor')
};
