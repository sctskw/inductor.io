
export class QueryResult {
    symbol = null
    data = {}

    get dates() {
        return this.indexes()
    }

    get prices() {
        return this.toJSON().prices
    }

    // generate the keys for the query results
    indexes() {
        return Object.keys(this.data).sort()
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
        const dates = this.indexes()

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

export class QueryResultMulti {

    data = {}
    queries = []

    get dates() {
        return this.indexes()
    }

    get prices() {
        return this.toJSON().prices
    }

    indexes() {
        return Object.keys(this.data).sort()
    }

    rowCount() {
        return this.indexes().length
    }

    // merge other QueueResults into a single object
    merge(query) {

        if(!query.hasRows()) {
            return false
        }

        this.queries.push(query)

        // keep track of all the unique dates
        for(let date of query.indexes()) {
            this.data[date] = true
        }

        return true
    }

   
    toJSON() {

        const data = {
            dates: this.indexes(),
            prices: {}
        }
        
        // output spec
        // “dates”: An array of dates in increasing order.
        // “prices”: An object mapping (string-valued) stock ticker symbol to corresponding array of prices.  
        // Each price array should have the same length as dates and contain the price of the corresponding ticker on each date in dates, 
        // or null for any dates in the prices file on which the stock ticker symbol does not appear.
        for(let q of this.queries) {
            data.prices[q.symbol] = []
            for(let date of data.dates) {
                data.prices[q.symbol].push(q.data[date] || null)
            }
        }

        return data

    }

    // prettyprint output
    toString() {
        return JSON.stringify(this.toJSON(), null, 2)
    }

}