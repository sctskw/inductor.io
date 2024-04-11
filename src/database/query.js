import QueryResult from "./result"

export default class Query {

    constructor(database) {

        if(!database.loaded) {
            database.load()
        }

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


            // optional date range
            if (dateStart || dateEnd ) {
                const cDate = new Date(row.date)
                const sDate = new Date(dateStart)
                const eDate = new Date(dateEnd)
                
                // is outside of date range. skip
                if (cDate < sDate || cDate > eDate) {
                    return
                }
                
            }
            
            if(symbol in row) {
                results.addRow(symbol, row.date, row[symbol])
            } else {
                results.addRow(symbol, row.date, null)
            }
        })
        return results
    }

    // execute a query by a symbol restricted to an end date
    async bySymbolAndAfterDate(symbol, dateStart) {
        return await this.bySymbolAndBetweenDateRange(symbol, dateStart)
    }

    // execute a query by a symbol restricted to an end date
    async bySymbolAndBeforeDate(symbol, dateEnd) {
        return await this.bySymbolAndBetweenDateRange(symbol, null, dateEnd)
    }


}