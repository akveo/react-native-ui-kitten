// A JavaScript v5 app reaches the mapping through `require`. Restricting the rewrite to
// `ImportDeclaration` would skip every `.js` file in the codebase.
const eva = require('@ui-kitten/eva');
const { mapping } = require('@ui-kitten/material');

module.exports = {
  light: eva.light,
  materialMapping: mapping,
  lazy: () => import('@ui-kitten/eva'),
};
