import { is32Bit } from './../src/string_extend'

describe('test if a character is four Bit.', () => {
  test('should return false, when a', () => {
    expect(is32Bit('a')).toBe(false)
  })
  test('should return true when 吉', () => {
    expect(is32Bit('吉')).toBe(false)
  })
})
