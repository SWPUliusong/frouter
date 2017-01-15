'use strict'

const path = require("path")
const fs = require("fs")

let stat = null;

function ls(dir, _pending, _result) {
  _pending = _pending ? _pending++ : 1;
  _result = _result || [];

  try {
    stat = fs.lstatSync(dir);
  } catch (err) {
    throw err;
  };

  if (stat.isDirectory()) {
    let files = fs.readdirSync(dir);
    files.forEach(function (part) {
      ls(path.join(dir, part), _pending, _result);
    });
    if (--_pending === 0) {
      return _result;
    }
  } else {
    _result.push(dir);
    if (--_pending === 0) {
      return _result;
    }
  }
};

module.exports = ls