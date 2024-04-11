import jsonlFile from 'jsonl-db';


export default class PriceLoader {

    constructor(filename) {
        if (typeof filename !== "string") {
            throw new TypeError("invalid filename")
        }
    }   
}