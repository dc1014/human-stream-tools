'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = dbOpStream;

var _highland = require('highland');

var _highland2 = _interopRequireDefault(_highland);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BATCH_SIZE = 1000,
    CONCURRENCY = 100;

function dbOpStream(xform, op) {
    if (typeof xform !== 'function') return new Error('transform must be a function');
    if (typeof op !== 'function') return new Error('op must be a function');

    return _highland2.default.pipeline(_highland2.default.map(xform), _highland2.default.errors(console.warn), _highland2.default.batch(BATCH_SIZE), _highland2.default.map(op), _highland2.default.mergeWithLimit(CONCURRENCY), _highland2.default.tap(console.log));
}