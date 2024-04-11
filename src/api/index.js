import PriceDatabase from "../database";
import PriceQuery from "../database/query";
import { StockSymbolNotFoundError } from "../errors";

export default class StockPrices {

    ready = false;
    database;

    // The constructor for the StockPrices class should accept a path to a text file which is guaranteed to satisfy the following:
    // - Each line of the file contains a single JSON object giving the prices for various stock ticker symbols on a single date.
    // - The date for each line is given by each JSON object’s “date” field (in “month/day/year” format; years are denoted with four digits).
    // - All other fields in each JSON object map a stock ticker symbol to its corresponding price on that date.
    // - No dates are repeated in the file.
    constructor(filepath) {
        this.db = new PriceDatabase(filepath);
    }

    // initialize the API with configuration options
    async init(config = {}) {

        if(config.filepath) {
            this.db.filepath = filepath;
        }

        await this.db.load()
        this.ready = true

        return this
    }

    // Should take as arguments a string-valued stock ticker symbol, as well as optionally a start date and optionally an end date.
    // If the provided stock ticker symbol is present in the prices file passed to the constructor, then this method should return an object containing the following keys and corresponding values (if either start or end dates are provided as arguments, the returned object should only contain data for dates between the start and end dates, inclusive):
    // “dates”: An array of dates in increasing order.
    // “prices”: An array of prices having the same length as dates and containing the price of the stock ticker symbol on each date in dates, or null for any dates in the prices file on which the stock ticker symbol does not appear.
    // If the provided stock ticker symbol is not present in the prices file, then this method should raise an exception.
    async getPricesSingle(symbol, dateStart, dateEnd) {

        const q = new PriceQuery(this.db)

        let r = null;

        // optional date range
        if(dateStart || dateEnd) {
            r = await q.bySymbolAndBetweenDateRange(symbol, dateStart, dateEnd)
        } else {
            r = await q.bySymbol(symbol)
        }

        if(!r.hasRows()) {
            throw new StockSymbolNotFoundError(`stock symbol ${symbol} not found`)
        }

        console.log(`${r}`)

        return r

    }

    // Should take as arguments an array of string-valued stock ticker symbols, as well as optionally a start date and optionally an end date.
    // If all of the specified stock ticker symbols are present in the prices file passed to the constructor, then this method should return an object containing the following keys and corresponding values (if either start or end dates are provided as arguments, the returned object should only contain data for dates between the start and end dates, inclusive):
    // “dates”: An array of dates in increasing order.
    // “prices”: An object mapping (string-valued) stock ticker symbol to corresponding array of prices.  Each price array should have the same length as dates and contain the price of the corresponding ticker on each date in dates, or null for any dates in the prices file on which the stock ticker symbol does not appear.
    // If any specified stock ticker symbol is not present in the prices file, then this method should raise an exception.
    getPricesMultiple(symbols, startDate, endDate) {}

}