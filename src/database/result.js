
export default class QueryResult {
    symbol = null
    data = {}

    // add a new row to the query result
    addRow(symbol, date, price) {

        this.symbol = symbol
        this.data[date] = price
    }

    // generate the keys for the query results
    indexes() {
        return Object.keys(this.data)
    }

    // determine the total amount of rows from the query
    rowCount() {
        return this.indexes().length
    }

    // create serialized object 
    toJSON() {

        const result = {
            // omit the symbol
            // symbol: this.symbol,
            dates: [],
            prices: []
        }

        // sort ASC
        const dates = this.indexes().sort()

        for(const date of dates) {
            result.dates.push(date)
            result.prices.push(this.data[date])
        }

        return result
    }

    // prettyprint output
    toString() {
        return JSON.stringify(this.toJSON(), null, 2)
    }

}