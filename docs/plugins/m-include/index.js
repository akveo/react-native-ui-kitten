'use strict';

var path = require('path'),
  fs = require('fs');

var INCLUDE_RE = /\!{3}\s*include\s*\(\s*(.+?)\s*\)\s*\!{3}/i;
var componentsPath = './docs/contents/articles/002-components';

module.exports = function include_plugin(md, basedir) {
  var filesProcessed;
  function _replaceIncludeByContent(src, rootdir, parentFilePath) {
    var cap, filePath, mdSrc, indexOfCircularRef;

    // store parent file path to check circular references
    if (parentFilePath) {
      filesProcessed.push(parentFilePath);
    }
    while ((cap = INCLUDE_RE.exec(src))) {
      filePath = path.resolve(componentsPath, cap[1]);
      indexOfCircularRef = filesProcessed.indexOf(filePath);
      if (indexOfCircularRef !== -1) {
        throw new Error('Circular reference between ' + filePath + ' and ' + filesProcessed[indexOfCircularRef]);
      }

      // replace include by file content
      mdSrc = _replaceIncludeByContent(fs.readFileSync(filePath, 'utf8'), path.dirname(filePath), filePath);
      src = src.slice(0, cap.index) + mdSrc + src.slice(cap.index + cap[0].length, src.length);
    }
    return src;
  }

  function _includeFileParts(state) {
    var rootdir = basedir || '.';
    filesProcessed = [];
    state.src = _replaceIncludeByContent(state.src, rootdir);
  }

  md.core.ruler.before('normalize', 'include', _includeFileParts);
};
