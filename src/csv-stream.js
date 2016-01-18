import {createReadStream} from 'fs'
import csv from 'fast-csv'

export default function (file, options, xform) {
    if (!options.fileOptions) options.fileOptions = null
    if (!options.csvOptions) return new Error('requires options argument')
    if (typeof xform !== 'function') return new Error('transform must be a function')

    const inputStream = createReadStream(file, options.fileOptions)

    return xform ? csv.fromStream(inputStream, options) : csv
        .fromStream(inputStream, options)
}
