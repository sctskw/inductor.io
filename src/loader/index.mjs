import fs from 'fs/promises';

import jsonlFile from 'jsonl-db';

import FileNotFoundError from '../errors';


export default class PriceLoader {

    // store the name of the file
    filepath;

    // store the data
    data;

    async lazyLoadFile(filepath) {

        if (typeof filepath !== "string") {
            throw new TypeError("invalid filepath")
        }

        try {
            await fs.stat(filepath)
        } catch {
            throw new FileNotFoundError("file does not exist")
        }

        this.filepath = filepath
        this.data = jsonlFile(filepath)

        return true
    }

}