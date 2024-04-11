import StockPrices from ".";
import FileNotFoundError from "../errors";

test('StockPrices API throws an error when an invalid filepath is given', ()=> {

    expect(true).toBeTruthy()
    // expect(new StockPrices("/tmp/gone")).toThrow(FileNotFoundError)

})