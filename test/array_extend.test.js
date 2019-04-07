import { maxNumOfArr, copyArr, mergeArr, strToArr, reverseStr } from './../src/array_extend'
describe('spred arr', () => {
  test('[1,2,3] max should return 3', () => {
    expect(maxNumOfArr([1, 2, 3])).toBe(3)
  })

  test('copy arr', () => {
    const arr1 = [1, 2, 3]
    const arr2 = copyArr(arr1)
    arr1.push(4)
    expect(arr2).toHaveLength(3)
  })

  test('merge arr', () => {
    const arr1 = [1, 2]
    const arr2 = [3, 4]
    expect(mergeArr(arr1, arr2)).toHaveLength(4)
  })

  test('string to arr', () => {
    expect(strToArr('hello')).toHaveLength(5)
  })

  test('reverse string', () => {
    expect(reverseStr('hello')).toBe('olleh')
  })
})
