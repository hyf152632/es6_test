import { extractDate } from './../src/regexp_extend'

describe('extractDate fun', () => {
  test('no param should return []', () => {
    expect(extractDate()).toEqual([])
  })
})
