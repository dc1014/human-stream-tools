'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (file, options, xform) {
    if (!options.fileOptions) options.fileOptions = null;
    if (!options.csvOptions) return new Error('requires options argument');
    if (typeof xform !== 'function') return new Error('transform must be a function');

    var inputStream = (0, _fs.createReadStream)(file, options.fileOptions);

    return transform ? _fastCsv2.default.fromStream(inputStream, options) : _fastCsv2.default.fromStream(inputStream, options).transform(xform);
};

var _fs = require('fs');

var _fastCsv = require('fast-csv');

var _fastCsv2 = _interopRequireDefault(_fastCsv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }