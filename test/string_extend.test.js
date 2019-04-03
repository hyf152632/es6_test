import { is32Bit } from './../src/string_extend'

describe('test if a character is four Bit.', () => {
  test('should return false, when a', () => {
    expect(is32Bit('a')).toBe(false)
  })
  test('should return true when 吉', () => {
    expect(is32Bit('吉')).toBe(false)
  })
})

describe('includes, startsWith, endsWith', () => {
  test('aaa includes a, should return true', () => {
    expect('aaa'.includes('a')).toBeTruthy()
  })

  test('abcd starts with a, should return true', () => {
    expect('abcd'.startsWith('a')).toBeTruthy()
  })

  test('abcd ends with d, should return true', () => {
    expect('abcd'.endsWith('d')).toBeTruthy()
  })
})

//repeat

//padStart, padEnd

//matchAll

//template string

describe('template string can nest', () => {
  test('nest template', () => {
    const tmpl = addrs => `
  <table>
  ${addrs
    .map(
      addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `
    )
    .join('')}
  </table>
`
    expect(tmpl([])).toMatch(/<table>/)
  })
})
