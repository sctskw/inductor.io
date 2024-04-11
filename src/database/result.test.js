import { StockSymbolNotFoundError } from "../errors";
import { QueryResult, QueryResultMulti } from "./result";

test('QueryResult.hasRows() succeeds when a symbol is found', () => {

    const r = new QueryResult()
    r.addRow("NVDA", "1/1/1999", null)
    r.addRow("NVDA", "1/2/1999", "1.20")
    r.addRow("NVDA", "1/3/1999", null)

    expect(r.hasRows()).toBeTruthy()
    expect(r.rowCount()).toBe(3)

    // console.log(r.prices)

    expect(r.dates).toEqual(["1/1/1999", "1/2/1999", "1/3/1999"])
    expect(r.prices).toEqual([null, "1.20", null])

})

test('QueryResult.hasRows() fails when a symbol is not found', () => {

    const r = new QueryResult()
    r.addRow("NVDA", "1/1/1999", null)
    r.addRow("NVDA", "1/2/1999", null)
    r.addRow("NVDA", "1/3/1999", null)

    expect(r.hasRows()).toBeFalsy()
    expect(r.rowCount()).toBe(0)

})


test('QueryResultMulti.merge creates a combined query result object', () => {

    expect.assertions(5)

    const rm = new QueryResultMulti()

    const r1 = new QueryResult()
    r1.addRow("NVDA", "1/1/1999", "1.00")
    r1.addRow("NVDA", "1/2/1999", "1.20")
    r1.addRow("NVDA", "1/3/1999", "1.40")

    const r2 = new QueryResult()
    r2.addRow("TSLA", "1/1/2010", null)
    r2.addRow("TSLA", "1/2/2010", "2.50")
    r2.addRow("TSLA", "1/3/2010", "2.60")


    const r3 = new QueryResult()
    r3.addRow("GOOG", "8/19/2004", "85.00")
    r3.addRow("GOOG", "8/20/2004", "86.50")
    r3.addRow("GOOG", "8/21/2004", null)

    rm.merge(r1)
    rm.merge(r2)
    rm.merge(r3)

    // console.log(`${rm}`)

    expect(rm.dates).toHaveLength(9)
    expect(rm.prices['NVDA']).toHaveLength(9)
    expect(rm.prices['TSLA']).toHaveLength(9)
    expect(rm.prices['GOOG']).toHaveLength(9)

    expect(rm.prices['GOOG']).toEqual([null, null, null, null, null, null, "85.00", "86.50", null])





})