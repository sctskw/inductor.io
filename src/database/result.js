
export default class QueryResult {
    symbol = null
    data = {}

    // generate the keys for the query results
    indexes() {
        return Object.keys(this.data)
    }

    // add a new row to the query result
    addRow(symbol, date, price) {

        // only track the symbol if we have a single valid price
        if(price !== null) {
            this.symbol = symbol
        }

        this.data[date] = price
    }

    // if we never tracked the symbol it means there were no valid prices therefore no valid rows
    hasRows() {
        return this.symbol !== null
    }

    // determine the total amount of rows from the query
    rowCount() {
        if(this.hasRows()) {
            return this.indexes().length
        }
        return 0
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