import path from 'path';

import { FileNotFoundError, StockSymbolNotFoundError } from '../errors';

import StockPrices from "../";

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


test('StockPrices.getPricesSingle returns results for AAPL', async () => {
    expect.assertions(1)

    const api = await new StockPrices(TEST_DB).init()
    const results = await api.getPricesSingle("AAPL")

    // console.log(`${results}`)

    expect(results.rowCount()).toBe(11)
})

test('StockPrices.getPricesSingle returns results for AAPL with only dateStart', async () => {
    expect.assertions(1)

    const api = await new StockPrices(TEST_DB).init()
    const results = await api.getPricesSingle("AAPL", "1/31/2014")

    expect(results.rowCount()).toBe(2)
})

test('StockPrices.getPricesSingle returns results for AAPL with only dateEnd', async () => {
    expect.assertions(1)

    const api = await new StockPrices(TEST_DB).init()
    const results = await api.getPricesSingle("AAPL", null, "1/23/2014")

    expect(results.rowCount()).toBe(4)
})

test('StockPrices.getPricesSingle returns results for AAPL with date range', async () => {
    expect.assertions(1)

    const api = await new StockPrices(TEST_DB).init()
    const results = await api.getPricesSingle("AAPL", "1/21/2014", "1/27/2014")

    console.log(`${results}`)

    expect(results.rowCount()).toBe(5)
})

test('StockPrices.getPricesMultiple throws an error with invalid symbol', async () => {
    expect.assertions(1)

    const api = await new StockPrices(TEST_DB).init()

    await expect(api.getPricesMultiple(["AAPL", "MSFT", "BLAH"])).rejects.toThrow(StockSymbolNotFoundError)
})

test('StockPrices.getPricesMultiple returns results for AAPL, MSFT', async () => {
    expect.assertions(1)

    const api = await new StockPrices(TEST_DB).init()
    const results = await api.getPricesMultiple(["AAPL", "MSFT"])

    // console.log(`${results}`)

    expect(results.rowCount()).toBe(11)
})

test('StockPrices.getPricesMultiple returns results for AAPL, MSFT with date range', async () => {
    expect.assertions(3)

    const api = await new StockPrices(TEST_DB).init()
    const results = await api.getPricesMultiple(["AAPL", "MSFT"], "1/23/2014", "1/28/2014")

    // console.log(`${results}`)

    expect(results.rowCount()).toBe(4)
    expect(results.prices['AAPL']).toHaveLength(4)
    expect(results.prices['MSFT']).toHaveLength(4)
})

test('StockPrices.getPricesMultiple returns results for AAPL, MSFT with dateStart', async () => {
    expect.assertions(3)

    const api = await new StockPrices(TEST_DB).init()
    const results = await api.getPricesMultiple(["AAPL", "MSFT"], "1/28/2014")

    // console.log(`${results}`)

    expect(results.rowCount()).toBe(5)
    expect(results.prices['AAPL']).toHaveLength(5)
    expect(results.prices['MSFT']).toHaveLength(5)
})


test('StockPrices.getPricesMultiple returns results for AAPL, MSFT with dateEnd', async () => {
    expect.assertions(3)

    const api = await new StockPrices(TEST_DB).init()
    const results = await api.getPricesMultiple(["AAPL", "MSFT"], null, "1/28/2014")

    // console.log(`${results}`)

    expect(results.rowCount()).toBe(7)
    expect(results.prices['AAPL']).toHaveLength(7)
    expect(results.prices['MSFT']).toHaveLength(7)
})
