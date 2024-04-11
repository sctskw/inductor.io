import path from 'path';

import PriceDatabase from "."
import Query from './query';
import QueryResult from './result';

const TEST_DB = path.resolve('testdata/prices.jsonl');


test('query.bySymbol returns a QueryResult', async () => {

    expect.assertions(1)

    const db = await new PriceDatabase(TEST_DB).load()
    const query = new Query(db)
    const results = await query.bySymbol("any")

    expect(results).toBeInstanceOf(QueryResult)

})

test('query.bySymbol returns a results for AAPL', async () => {

    expect.assertions(3)

    const db = await new PriceDatabase(TEST_DB).load()

    const query = new Query(db)
    const results = await query.bySymbol("AAPL")

    // console.log(`${results}`)

    expect(results.rowCount()).toBe(11)

    const prices = results.toJSON().prices
    expect(prices).not.toContain(null)
    expect(prices.filter((p) => p === null )).toHaveLength(0)

})

test('query.bySymbol returns a results for AMZN', async () => {

    expect.assertions(3)

    const db = await new PriceDatabase(TEST_DB).load()

    const query = new Query(db)
    const results = await query.bySymbol("AMZN")

    // console.log(`${results}`)

    expect(results.rowCount()).toBe(11)

    const prices = results.toJSON().prices
    expect(prices).toContain(null)
    expect(prices.filter((p) => p === null )).toHaveLength(1)

})

test('query.bySymbol returns a results for MSFT', async () => {

    expect.assertions(3)

    const db = await new PriceDatabase(TEST_DB).load()

    const query = new Query(db)
    const results = await query.bySymbol("MSFT")

    // console.log(`${results}`)

    expect(results.rowCount()).toBe(11)

    const prices = results.toJSON().prices
    expect(prices).toContain(null)
    expect(prices.filter((p) => p === null )).toHaveLength(1)

})

test('query.bySymbolBetweenDateRange returns results for AAPL', async () => {

    expect.assertions(3)

    const db = await new PriceDatabase(TEST_DB).load()

    const query = new Query(db)
    const results = await query.bySymbolAndBetweenDateRange("AAPL", "1/21/2014", "1/24/2014")

    expect(results.rowCount()).toBe(4)

    const prices = results.toJSON().prices
    expect(prices).not.toContain(null)
    expect(prices.filter((p) => p === null )).toHaveLength(0)
})

test('query.bySymbolBetweenDateRange returns results for AMZN', async () => {

    expect.assertions(3)

    const db = await new PriceDatabase(TEST_DB).load()

    const query = new Query(db)
    const results = await query.bySymbolAndBetweenDateRange("AMZN", "1/22/2014", "1/24/2014")

    expect(results.rowCount()).toBe(3)

    const prices = results.toJSON().prices
    expect(prices).toContain(null)
    expect(prices.filter((p) => p === null )).toHaveLength(1)
})

test('query.bySymbolBetweenDateRange returns results for MSFT', async () => {

    expect.assertions(3)

    const db = await new PriceDatabase(TEST_DB).load()

    const query = new Query(db)
    const results = await query.bySymbolAndBetweenDateRange("MSFT", "1/21/2014", "1/30/2014")

    expect(results.rowCount()).toBe(8)

    const prices = results.toJSON().prices
    expect(prices).toContain(null)
    expect(prices.filter((p) => p === null )).toHaveLength(1)
})

test('query.bySymbolBetweenDateRange returns results for optional dateStart and no dateEnd', async () => {

    expect.assertions(3)

    const db = await new PriceDatabase(TEST_DB).load()

    const query = new Query(db)
    const results = await query.bySymbolAndAfterDate("MSFT", "1/27/2014")

    expect(results.rowCount()).toBe(6)

    const prices = results.toJSON().prices
    expect(prices).toContain(null)
    expect(prices.filter((p) => p === null )).toHaveLength(1)
})

test('query.bySymbolBetweenDateRange returns results for optional dateEnd and no dateStart', async () => {

    expect.assertions(3)

    const db = await new PriceDatabase(TEST_DB).load()

    const query = new Query(db)
    const results = await query.bySymbolAndBeforeDate("AMZN", "1/23/2014")

    // console.log(`${results}`)

    expect(results.rowCount()).toBe(4)

    const prices = results.toJSON().prices
    expect(prices).toContain(null)
    expect(prices.filter((p) => p === null )).toHaveLength(1)
})