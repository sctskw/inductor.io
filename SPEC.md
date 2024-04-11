Requirements
============

The task is to implement a JavaScript class named StockPrices that exposes a couple of methods, as one might implement as part of (the server side of) a hypothetical application that utilizes historical stock prices.


The constructor for the StockPrices class should accept a path to a text file which is guaranteed to satisfy the following:

- Each line of the file contains a single JSON object giving the prices for various stock ticker symbols on a single date.
- The date for each line is given by each JSON object’s “date” field (in “month/day/year” format; years are denoted with four digits).
- All other fields in each JSON object map a stock ticker symbol to its corresponding price on that date.
- No dates are repeated in the file.

An example of such a file is attached to this email (though of course please ensure that your implementation would function correctly if provided with any file satisfying the bullets above).


### Part 1

The StockPrices class should expose the following methods:

#### getPricesSingle

Should take as arguments a string-valued stock ticker symbol, as well as optionally a start date and optionally an end date.

If the provided stock ticker symbol is present in the prices file passed to the constructor, then this method should return an object containing the following keys and corresponding values (if either start or end dates are provided as arguments, the returned object should only contain data for dates between the start and end dates, inclusive):

“dates”: An array of dates in increasing order.

“prices”: An array of prices having the same length as dates and containing the price of the stock ticker symbol on each date in dates, or null for any dates in the prices file on which the stock ticker symbol does not appear.

If the provided stock ticker symbol is not present in the prices file, then this method should raise an exception.

The relevant data should be read from the prices file on disk upon every execution of this method (unless you have completed Part 3 below).

#### getPricesMultiple

Should take as arguments an array of string-valued stock ticker symbols, as well as optionally a start date and optionally an end date.

If all of the specified stock ticker symbols are present in the prices file passed to the constructor, then this method should return an object containing the following keys and corresponding values (if either start or end dates are provided as arguments, the returned object should only contain data for dates between the start and end dates, inclusive):

“dates”: An array of dates in increasing order.

“prices”: An object mapping (string-valued) stock ticker symbol to corresponding array of prices.  Each price array should have the same length as dates and contain the price of the corresponding ticker on each date in dates, or null for any dates in the prices file on which the stock ticker symbol does not appear.

If any specified stock ticker symbol is not present in the prices file, then this method should raise an exception.

The relevant data should be read from the prices file on disk upon every execution of this method (unless you have completed Part 3 below).



### Part 2


Ensure that your implementation will continue to function correctly if

the contents of the prices file are too large to be stored in memory in their entirety, and

every call to getPricesSingle or getPricesMultiple is guaranteed to receive either a start date or an end date (or both), such that the subset of data in the prices file falling in the date range defined by the start date and/or end date is sufficiently small to be stored in memory.



### Part 3 

**without compromising on completion of Parts 1 and 2, please implement the following if you have sufficient time**

[NOTE: The first priority is to ensure that Parts 1 and 2 above are complete.  Without compromising on completion of Parts 1 and 2, please implement Part 3 if you have sufficient time.  We recommend saving a snapshot of your code upon completing Parts 1 and 2, prior to implementing Part 3 (unless you have chosen to implement all three parts in one shot).]

Enable the constructor of the StockPrices class to also take an optional integer-valued argument named cacheSize.

If a positive cacheSize value is provided to the constructor, then:

The StockPrices instance should store in memory the raw prices data (as read from the prices file) for dates that have been returned by prior calls to getPricesSingle or getPricesMultiple, up to a limit of cacheSize dates.

If a call to getPricesSingle or getPricesMultiple would cause the number of dates having data stored in memory to exceed cacheSize, then the date ranges least recently added to the in-memory cache (i.e., by the least recent calls to getPricesSingle or getPricesMultiple) should be dropped until there is sufficient cache capacity available to accommodate the dates returned by the current call to getPricesSingle or getPricesMultiple.

Do not add any data to the in-memory cache as a result of calls to getPricesSingle or getPricesMultiple that individually return more than cacheSize dates.

Any calls to getPricesSingle or getPricesMultiple which return a set of dates that are all present in the in-memory cache at that moment should read and return the required data from the in-memory cache, and not from the prices file on disk.  All other calls to getPricesSingle or getPricesMultiple should read the requisite data from the prices file on disk (and update the in-memory cache as merited).

Assume that the contents of the prices file are immutable after the StockPrices instance is created.

If no cacheSize value is provided to the constructor (or the cacheSize is 0), then all relevant data must be read from the prices file on every call to getPricesSingle or getPricesMultiple, as in Part 1 above.