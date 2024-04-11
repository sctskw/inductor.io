import PriceDatabase from "./database";

export default class StockPricess {

    database;

    constructor(filepath) {
        this.db = new PriceDatabase();
        
        // TODO: handle errors
        this.db.load(filepath)
    }

    // Should take as arguments a string-valued stock ticker symbol, as well as optionally a start date and optionally an end date.
    // If the provided stock ticker symbol is present in the prices file passed to the constructor, then this method should return an object containing the following keys and corresponding values (if either start or end dates are provided as arguments, the returned object should only contain data for dates between the start and end dates, inclusive):
    // “dates”: An array of dates in increasing order.
    // “prices”: An array of prices having the same length as dates and containing the price of the stock ticker symbol on each date in dates, or null for any dates in the prices file on which the stock ticker symbol does not appear.
    // If the provided stock ticker symbol is not present in the prices file, then this method should raise an exception.
    // The relevant data should be read from the prices file on disk upon every execution of this method (unless you have completed Part 3 below).
    getPricesSingle(symbol, startDate, endDate) {}

    // Should take as arguments an array of string-valued stock ticker symbols, as well as optionally a start date and optionally an end date.
    // If all of the specified stock ticker symbols are present in the prices file passed to the constructor, then this method should return an object containing the following keys and corresponding values (if either start or end dates are provided as arguments, the returned object should only contain data for dates between the start and end dates, inclusive):
    // “dates”: An array of dates in increasing order.
    // “prices”: An object mapping (string-valued) stock ticker symbol to corresponding array of prices.  Each price array should have the same length as dates and contain the price of the corresponding ticker on each date in dates, or null for any dates in the prices file on which the stock ticker symbol does not appear.
    // If any specified stock ticker symbol is not present in the prices file, then this method should raise an exception.
    // The relevant data should be read from the prices file on disk upon every execution of this method (unless you have completed Part 3 below).
    getPricesMultiple(symbols, startDate, endDate) {}

}