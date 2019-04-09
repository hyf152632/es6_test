describe('Object.is', () =>  {
  test('should return false, Object.js({},{})', () =>  {
      expect(Object.is( {},  {})).toBeFalsy()
  })
  test('should return false, Object.js(+0,-0)', () =>  {
        expect(Object.is(-0,  + 0)).toBeFalsy()
    })
    test('should return true, Object.js(NaN,NaN)', () =>  {
        expect(Object.is(NaN, NaN)).toBeTruthy()
    })
})

describe('Object.assign func handle array', () =>  {
  test('should retrn [4, 5, 3], when Object.assign([1, 2, 3], [4, 5]', () =>  {
    expect(Object.assign([1, 2, 3], [4, 5])).toEqual([4, 5, 3])
  })
})
