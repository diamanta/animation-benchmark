'use strict';
exports.__esModule = true;
var _replace = require('replace-in-file');
var replace = _replace;
var paths = ['dist'];
paths.forEach((path) => {
  try {
    var options = {
      files: [path + '/index.html'],
      from: /\stype="module"/g,
      to: '',
    };
    replace(options)
      .then(console.log)
      ['catch'](function (error) {
      console.log(error.message);
    });
  } catch (error) {
    console.log(error);
  }
});
