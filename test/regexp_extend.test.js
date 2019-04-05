import { extractDate, extractDate_super, transDateStr } from './../src/regexp_extend'

describe('extractDate fun', () => {
  test('no param should return []', () => {
    expect(extractDate()).toEqual([])
  })

  test('if error param type, return []', () => {
    expect(extractDate(null)).toEqual([])
  })

  test('2019-4-5 should return [2019, 04, 05]', () => {
    expect(extractDate('2019-4-5')).toEqual(expect.arrayContaining(['2019', '04', '05']))
  })
})

describe('extractDate_super fun', () => {
  test('no param should return []', () => {
    expect(extractDate_super()).toEqual([])
  })

  test('if error param type, return []', () => {
    expect(extractDate_super(12)).toEqual([])
  })

  test('2019-3, return []', () => {
    expect(extractDate_super('2019-3')).toEqual([])
  })

  test('2019-4-5, return ["2019", "04", "05"]', () => {
    expect(extractDate_super('2019-4-5')).toEqual(expect.arrayContaining(['2019', '04', '05']))
  })

  test('2019-04-05, return ["2019", "04", "05"]', () => {
    expect(extractDate_super('2019-04-05')).toEqual(expect.arrayContaining(['2019', '04', '05']))
  })
})

describe('transDateStr fun', () => {
  test('no param, return null', () => {
    expect(transDateStr()).toEqual(null)
  })
  test('error result format string "", return null', () => {
    expect(transDateStr('')).toEqual(null)
  })
  test('error result format string "whatever", return null', () => {
    expect(transDateStr('whatever')).toEqual(null)
  })
  test('"2019-4-5", return "05/04/2019"', () => {
    expect(transDateStr('2019-4-5')).toEqual('05/04/2019')
  })
  test('"2019-04-05", return "05/04/2019"', () => {
    expect(transDateStr('2019-04-05')).toEqual('05/04/2019')
  })
})
