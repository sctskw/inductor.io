import path from 'path';

import { FileNotFoundError, StockSymbolNotFoundError } from '../errors';

import StockPrices from ".";

const TEST_DB = path.resolve('testdata/prices.jsonl');

test('StockPrices.init throws an error when an invalid filepath is given', async () => {
    expect.assertions(1)

    const api = new StockPrices("/tmp/gone")
    await expect(api.init()).rejects.toThrow(FileNotFoundError)
})

test('StockPrices.getPricesSingle throws an error with invalid symbol', async () => {
    expect.assertions(1)

    const api = await new StockPrices(TEST_DB).init()

    await expect(api.getPricesSingle("BLAH")).rejects.toThrow(StockSymbolNotFoundError)
})