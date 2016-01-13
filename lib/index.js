const _ = require('highland')

function parallelBatchMap(batchSize, concurrency, operation) {
    return _.pipeline(
        _.batch(batchSize),
        _.tap(console.log),
        _.map(operation),
        _.parallel(concurrency)
    )
}

module.exports = {
    parallelBatchMap,
}
