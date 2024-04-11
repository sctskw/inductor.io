import PriceLoader from "../loader/index.mjs";

export default class PriceDatabase {

    loaded = false;
    loader = null;
    db = null;

    constructor() {
        this.loader = new PriceLoader()
    }

    // load: load the database from a filepath
    async load(filepath) {
        this.loaded = await this.loader.lazyLoadFile(filepath)
        this.db = this.loader.data;
        return true
    }

    // reload: reset the database from scratch
    async reload() {
        // retrieve the current filepath
        const file = this.loader.filepath

        // reconstruct the loader
        this.loader = new PriceLoader()

        // load the file again
        await this.loader.lazyLoadFile(file)

        // reset the database
        this.db = this.loader.data

        return true
    }

}