'use strict';

var _ = require('highland');

var BATCH_SIZE = 1000,
    CONCURRENCY = 100;

function dbOpStream(xform, op) {
    return _.pipeline(_.map(xform), _.errors(console.warn), _.batch(BATCH_SIZE), _.map(op), _.mergeWithLimit(CONCURRENCY), _.tap(console.log));
}

module.exports = dbOpStream;