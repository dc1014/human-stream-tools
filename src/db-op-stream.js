import _ from 'highland'

const BATCH_SIZE = 1000,
    CONCURRENCY = 100

export default function dbOpStream(xform, op) {
    if (typeof xform !== 'function') return new Error('transform must be a function')
    if (typeof op !== 'function') return new Error('op must be a function')

    return _.pipeline(
        _.map(xform),
        _.errors(console.warn),
        _.batch(BATCH_SIZE),
        _.map(op),
        _.mergeWithLimit(CONCURRENCY),
        _.tap(console.log)
    )
}
