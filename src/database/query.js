import QueryResult from "./result"

export default class PriceQuery {

    constructor(database) {
        // TODO: validate database
        this.cursor = database;
    }

    // execute a query by a symbol
    async bySymbol(symbol) {
        const results = new QueryResult()
        const data = await this.cursor.db.findMatch((row) => {
            
            // if the symbol was recorded on the date, record the specified strike price
            // otherwise, record an empty strike price
            if(symbol in row) {
                results.addRow(symbol, row.date, row[symbol])
            } else {
                results.addRow(symbol, row.date, null)
            }

        })
        return results
    }

    // execute a query by a symbol restricted to a date range
    async bySymbolAndBetweenDateRange(symbol, dateStart, dateEnd) {
        const results = new QueryResult()
        const data = await this.cursor.db.findMatch((row) => {
            
            if(symbol in row) {
                results.addRow(symbol, row.date, row[symbol])
            } else {
                results.addRow(symbol, row.date, null)
            }
        })
        return results
    }

}