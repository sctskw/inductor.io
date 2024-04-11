import path from 'path';

import PriceDatabase from "."
import FileNotFoundError from '../errors';

const TEST_DB = path.resolve('testdata/prices.jsonl');

test('loading a missing file throws an error', async () => {
    expect.assertions(1)

    const file = path.resolve('/tmp/gone')
    const db = new PriceDatabase()

    await expect(db.load(file)).rejects.toThrow(FileNotFoundError)
})

test('load filepath creates a jsonldb from testdata', async () => {
    expect.assertions(4)

    const db = new PriceDatabase()

    expect(db.loader).not.toBe(null)
    await expect(db.load(TEST_DB)).resolves.toBeTruthy()
    expect(db.loaded).toBeTruthy()
    expect(db).not.toBeNull()
})


test('reload recreates the existing database', async () => {
    expect.assertions(4)

    const db = new PriceDatabase()

    await expect(db.load(TEST_DB)).resolves.toBeTruthy()
    await expect(db.reload()).resolves.toBeTruthy()
    expect(db.loaded).toBeTruthy()
    expect(db).not.toBeNull()
})
