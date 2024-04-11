import fs from 'fs/promises';

import PriceLoader from './index.mjs'

test('lazyLoadFile throws TypeError if filename parameter is not a string', async ()=> {
    expect.assertions(1)
    const loader = new PriceLoader(false)
    await expect(loader.lazyLoadFile()).rejects.toThrow(TypeError)
})

test('lazyLoadFile throw SystemError if filename does not exist', async () => {
    expect.assertions(1)
    const loader = new PriceLoader("/tmp/myfile")
    await expect(loader.lazyLoadFile()).rejects.toThrow(Error)

})

test('lazyLoadFile returns true if file is loaded', async () => {
    expect.assertions(1)

    // create temp file
    const file = "/tmp/test.file"
    await fs.writeFile(file, '')

    const loader = new PriceLoader(file)
    await expect(loader.lazyLoadFile()).resolves.toBe(true)
})
