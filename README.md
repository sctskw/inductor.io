StockPrice API
==============


### Include in your project (ECMA)
```javascript
import StockPricesAPI from 'inductor.io';
```

### Initialize Prices Database (via JSONL file format)
```javascript
const api = new StockPricesAPI("/path/to/db.jsonl")

try {
    await api.init()
} catch (FileNotFoundError e) {
    console.log(e)
}
```

### Retrieve Prices for Single Stock Ticker Symbol
```javascript
const results = await api.getPricesSingle("AAPL")

console.log(results.prices)

// API Example Output
    {
        "dates": [
            "1/17/2014",
            "1/21/2014",
            "1/22/2014",
            "1/23/2014",
            "1/24/2014",
            "1/27/2014",
            "1/28/2014",
            "1/29/2014",
            "1/30/2014",
            "1/31/2014",
            "2/3/2014"
        ],
        "prices": [
            19.31,
            19.61,
            19.7,
            19.86,
            19.5,
            19.66,
            18.09,
            17.88,
            17.85,
            17.88,
            17.91
        ]
    }
```

### Retrieve Prices for Single Stock Ticker Symbol within a Date Range (inclusive)
```javascript

const results = await api.getPricesSingle("AAPL", "1/21/2014", "1/27/2014")

console.log(result.prices)

// API Example Output
    {
        "dates": [
            "1/21/2014",
            "1/22/2014",
            "1/23/2014",
            "1/24/2014",
            "1/27/2014"
        ],
        "prices": [
            19.61,
            19.7,
            19.86,
            19.5,
            19.66
        ]
    }
```


### Retrieve Prices for Multiple Stock Ticker Symbols
```javascript
const results = await api.getPricesMultiple(["AAPL", "MSFT])

console.log(results.prices)

// API Example Output
    {
        "dates": [
            "1/17/2014",
            "1/21/2014",
            "1/22/2014",
            "1/23/2014",
            "1/24/2014",
            "1/27/2014",
            "1/28/2014"
        ],
        "prices": {
            "AAPL": [
                19.31,
                19.61,
                19.7,
                19.86,
                19.5,
                19.66,
                18.09
            ],
            "MSFT": [
                36.38,
                36.17,
                35.93,
                36.06,
                36.81,
                36.03,
                36.27
            ]
        }
    }
```

