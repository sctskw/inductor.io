import PriceLoader from './index.mjs'

test('constructor accepts a filename as a string', ()=> {
    expect(new PriceLoader(false)).toThrow(TypeError)
})