import fs from 'fs/promises';
import path from 'path';

import PriceLoader from './index.mjs'

test('lazyLoadFile throws TypeError if filename parameter is not a string', async ()=> {
    expect.assertions(1)
    const loader = new PriceLoader()
    await expect(loader.lazyLoadFile(false)).rejects.toThrow(TypeError)
})

test('lazyLoadFile throw SystemError if filename does not exist', async () => {
    expect.assertions(1)
    const loader = new PriceLoader()
    await expect(loader.lazyLoadFile("/tmp/myfile")).rejects.toThrow(Error)

})

test('lazyLoadFile returns true if file is loaded', async () => {
    expect.assertions(1)
    const loader = new PriceLoader()

    // create temp file
    const file = "/tmp/test.file"
    await fs.writeFile(file, '')

    await expect(loader.lazyLoadFile(file)).resolves.toBe(true)
})

test('lazyLoadFile creates a jsonldb from testdata', async () => {
    expect.assertions(2)
    const loader = new PriceLoader()

    const file = path.resolve('testdata/prices.jsonl')

    await expect(loader.lazyLoadFile(file)).resolves.toBe(true)
    expect(loader.db).not.toBe(null)
})