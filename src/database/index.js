import PriceLoader from "../loader/index.mjs";

export default class PriceDatabase {

    loaded = false;
    loader = null;
    db = null;

    constructor(filepath) {
        this.loader = new PriceLoader(filepath)
    }

    // load: load the database from a filepath
    async load() {
        this.loaded = await this.loader.lazyLoadFile()
        this.db = this.loader.data;
        return this
    }

    // reload: reset the database from scratch
    async reload() {
        // retrieve the current filepath
        const fp = this.loader.filepath

        // reconstruct the loader
        this.loader = new PriceLoader(fp)

        // load the file again
        await this.loader.lazyLoadFile()

        // reset the database
        this.db = this.loader.data

        return true
    }

}