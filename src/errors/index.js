
export class FileNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "FileNotFoundError"
    }
}

export class StockSymbolNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "StockSymbolNotFoundError"
    }
}

export default { FileNotFoundError, StockSymbolNotFoundError }