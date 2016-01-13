const _ = require('highland')
const Code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const lib = require('./../lib')

const expect = Code.expect
const test = lab.test

test('should batch and map', done => {
    'use strict'

    const operation = x => x.map(y => y + 1)
    const batchSize = 1
    const concurrency = 2
    const data = [1,2,3,4]

    const through = lib.parallelBatchMap(batchSize, concurrency, operation)

    _(data).pipe(through).toArray(console.log)

    done()
})


