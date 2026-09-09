// A JavaScript v5 app reaches the mapping through `require`. Restricting the rewrite to
// `ImportDeclaration` would skip every `.js` file in the codebase.
const eva = require('@eva-design/eva');
const { mapping } = require('@eva-design/material');

module.exports = {
  light: eva.light,
  materialMapping: mapping,
  lazy: () => import('@eva-design/eva'),
};
