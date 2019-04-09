import {union, intersect, difference}from './../src/set_map'

describe('set', () =>  {
  test('should remove repeat value', () =>  {
      const arr = [1, 2, 3, 2, 3, 4]

      const removedRepeatValueArr = [...new Set(arr)]

      expect(removedRepeatValueArr).toHaveLength(4)

      const arrWithObj = [ {},  {}, [], []]

      const removedRepeatValueArr2 = [...new Set(arrWithObj)]

      expect(removedRepeatValueArr2).toHaveLength(4)
  })

  test('union [1,2], [2,3,4], equal [1,2,3,4]', () =>  {
      expect(union([1, 2], [2, 3, 4])).toEqual([1, 2, 3, 4])
  })

  test('intersect [1,2], [2,3,4], equal [2]', () =>  {
      expect(intersect([1, 2], [2, 3, 4])).toEqual([2])
  })

  test('difference [1,2], [2,3,4], equal [1,3,4]', () =>  {
      expect(difference([1, 2], [2, 3, 4])).toEqual([1])
  })
})

describe('map', () =>  {
  test('map can use object as key', () =>  {
      const m = new Map()
      const o =  {p:'Hello World'}

      m.set(o, 'content')

      expect(m.get(o)).toBe('content')
      expect(m.has(o)).toBeTruthy()
      expect(m.delete(o))
      expect(m.has(o)).toBeFalsy()
  })

  test('map can use array to create', () =>  {
      const map = new Map([
          ['name', '张三'], 
          ['title', 'Author']
      ])

      expect(map.has('name')).toBeTruthy()
  })

  test('只有对同一个对象的应用， Map 结构才将其视为同一个键', () =>  {
      const map = new Map()

      map.set(['a'], 555)

      expect(map.get(['a'])).toBeUndefined()

      const map2 = new Map()

      map2.set( {}, 666)

      expect(map.get( {})).toBeUndefined()
  })
})


