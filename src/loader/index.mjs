import fs from 'fs/promises'

import jsonlFile from 'jsonl-db'

import { FileNotFoundError } from '../errors'


export default class PriceLoader {

    // store the name of the file
    filepath;

    // store the data
    data;

    constructor(filepath) {
        this.filepath = filepath
    }

    async lazyLoadFile() {

        const fp = this.filepath

        if (typeof fp !== "string") {
            throw new TypeError("invalid filepath")
        }

        try {
            await fs.stat(fp)
        } catch {
            throw new FileNotFoundError("file does not exist")
        }

        this.data = jsonlFile(fp)

        return true
    }

}