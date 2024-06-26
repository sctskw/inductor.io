import PriceDatabase from "../database";
import Query from "../database/query";
import { QueryResultMulti } from "../database/result";
import { StockSymbolNotFoundError } from "../errors";

export default class StockPrices {

    ready = false;
    database;

    /**
     * The constructor for the StockPrices class should accept a path to a text file which is guaranteed to satisfy the following:
     * 
     * 1. Each line of the file contains a single JSON object giving the prices for various stock ticker symbols on a single date.
     * 2. The date for each line is given by each JSON object’s “date” field (in “month/day/year” format; years are denoted with four digits).
     * 3. All other fields in each JSON object map a stock ticker symbol to its corresponding price on that date.
     * 4. No dates are repeated in the file.
     * 
     * @param {string} filepath - the path to the .jsonl file on disk
     * 
     */
    constructor(filepath) {
        this.db = new PriceDatabase(filepath);
        return this
    }

    /**
     * Initializes the StockPrices API with a configuration object
     * 
     * @param {object} config - configuration object
     */
    async init(config = {}) {

        this.ready = false

        if(config.filepath) {
            this.db.filepath = filepath;
        }

        await this.db.load()
        this.ready = true

        return this
    }

       /**
        * Should take as arguments a string-valued stock ticker symbol, as well as optionally a start date and optionally an end date.
        * If the provided stock ticker symbol is present in the prices file passed to the constructor, then this method should return an 
        * object containing the following keys and corresponding values (if either start or end dates are provided as arguments, the 
        * returned object should only contain data for dates between the start and end dates, inclusive):
        * 
        * “dates”: An array of dates in increasing order. 
        * “prices”: An array of prices having the same length as dates and containing the price of the stock ticker symbol on each date in dates, 
        *           or null for any dates in the prices file on which the stock ticker symbol does not appear.
        * 
        * @param {string} symbol - The Stock Ticket symbol to query, eg: AAPL
        * @param {string} dateStart (optional) - The first date the query should start from
        * @param {string} dateEnd (optional) - The last date the query should end on
        * 
        * @throws {StockSymbolNotFoundError} - If the provided stock ticker symbol is not present in the prices file, then this method should raise an exception.
        */

    async getPricesSingle(symbol, dateStart, dateEnd) {

        const q = new Query(this.db)

        let results = null;

        // optional date range
        if(dateStart || dateEnd) {
            results = await q.bySymbolAndBetweenDateRange(symbol, dateStart, dateEnd)
        } else {
            results = await q.bySymbol(symbol)
        }

        if(!results.hasRows()) {
            throw new StockSymbolNotFoundError(`stock symbol ${symbol} not found`)
        }

        return results

    }

    /**
     * Should take as arguments an array of string-valued stock ticker symbols, as well as optionally a start date and optionally an end date.
     * If all of the specified stock ticker symbols are present in the prices file passed to the constructor, then this method should return an object 
     * containing the following keys and corresponding values (if either start or end dates are provided as arguments, the returned object should 
     * only contain data for dates between the start and end dates, inclusive):
     * 
     * “dates”: An array of dates in increasing order.
     * “prices”: An object mapping (string-valued) stock ticker symbol to corresponding array of prices.  
     *      Each price array should have the same length as dates and contain the price of the corresponding ticker on each date in dates, or null for
     *      any dates in the prices file on which the stock ticker symbol does not appear.
     * 
     * @param {string} symbol - The Stock Ticket symbol to query, eg: AAPL
     * @param {string} dateStart (optional) - The first date the query should start from
     * @param {string} dateEnd (optional) - The last date the query should end on
     * 
     * @throws {StockSymbolNotFoundError} - If the provided stock ticker symbol is not present in the prices file, then this method should raise an exception.
     */
     
    async getPricesMultiple(symbols, dateStart, dateEnd) {
        const results = new QueryResultMulti()

        for(let symbol of symbols) {
            const r = await this.getPricesSingle(symbol, dateStart, dateEnd)
            results.merge(r)
        }

        return results

    }

}