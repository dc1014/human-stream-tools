import _ from 'highland'
import csv from 'fast-csv'
import {createWriteStream} from 'fs'

export default function (options = {headers: true, delimiter: '|'}, file = 'output.csv', xform = x => x) {
    if (typeof xform !== 'function') return new Error('transform must be a function')

    const csvStream = csv.format(options.csv)
    const writeableStream = createWriteStream(file, options.file)

    csvStream.pipe(writeableStream)

    const write = csvStream.write.bind(csvStream)

    return _.pipeline(
            _.map(xform),
            _.map(write),
            _.errors(console.warn),
            _.done(() => {
                csvStream.end()
                return writeableStream.on('finish', () => 'finished')
            })
        )
}
