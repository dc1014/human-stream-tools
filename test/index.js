const _ = require('highland')
const Code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script()

// const lib = require('./../lib')

const expect = Code.expect
const test = lab.test

test('should batch and map', done => _([1])
    .map(x => x + 1)
    .toArray(numbers => {
        expect(numbers[0]).to.equal(2)

        return done()
    })
)
