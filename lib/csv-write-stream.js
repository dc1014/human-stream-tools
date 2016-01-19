'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var options = arguments.length <= 0 || arguments[0] === undefined ? { headers: true, delimiter: '|' } : arguments[0];
    var file = arguments.length <= 1 || arguments[1] === undefined ? 'output.csv' : arguments[1];
    var xform = arguments.length <= 2 || arguments[2] === undefined ? function (x) {
        return x;
    } : arguments[2];

    if (typeof xform !== 'function') return new Error('transform must be a function');

    var csvStream = _fastCsv2.default.format(options.csv);
    var writeableStream = (0, _fs.createWriteStream)(file, options.file);

    csvStream.pipe(writeableStream);

    var write = csvStream.write.bind(csvStream);

    return _highland2.default.pipeline(_highland2.default.map(xform), _highland2.default.map(write), _highland2.default.errors(console.warn), _highland2.default.done(function () {
        csvStream.end();
        return writeableStream.on('finish', function () {
            return 'finished';
        });
    }));
};

var _highland = require('highland');

var _highland2 = _interopRequireDefault(_highland);

var _fastCsv = require('fast-csv');

var _fastCsv2 = _interopRequireDefault(_fastCsv);

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }