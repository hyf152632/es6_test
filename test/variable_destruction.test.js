import { fibs } from './../src/variable_destruction'

describe('数组的解构赋值', () => {
  test('destruction array', () => {
    let [a, b, c] = [1, 2, 3]
    expect(a).toBe(1)
    expect(b).toBe(2)
    expect(c).toBe(3)
    expect(a).not.toBe(2)
  })
  test('数组解构，本质上是一种模式匹配', () => {
    let [foo, [[bar], baz]] = [1, [[2], 3]]
    expect(foo).toBe(1)
    expect(bar).toBe(2)

    let [, , third] = ['foo', 'bar', 'baz']
    expect(third).toBe('baz')

    let [head, ...tail] = [1, 2, 3, 4]
    expect(tail).toEqual(expect.arrayContaining([2, 3, 4]))

    let [x, y, ...z] = ['a']
    expect(x).toBe('a')
    expect(y).toBeUndefined()
    expect(typeof z).toBe('object')
    expect(z.length).toBe(0)
  })

  test('Set 也可以用数组的解构赋值', () => {
    let [x, y, z, ...d] = new Set(['a', 'b', 'c', 'c', 'd'])
    expect(x).toBe('a')
    expect(y).toBe('b')
    expect(z).toBe('c')
    expect(d).toEqual(expect.arrayContaining(['d']))
  })
})

test('只要某种数据结构具有 Iterator 接口， 都可以采用数组形式的解构赋值', () => {
  let [first, second, third] = fibs()
  expect(first).toBe(1)
  expect(second).toBe(1)
})

describe('解构允许指定默认值', () => {
  test('foo should be true', () => {
    let [foo = true] = []
    expect(foo).toBeTruthy()
  })
  test('y should be b', () => {
    let [x, y = 'b'] = ['a']
    expect(y).toBe('b')
  })
  test('只有当数组成员严格等于 undefined, 默认值才会生效', () => {
    let [a = 1] = [null]
    expect(a).toBeNull()
    expect(a).toBeDefined()
  })
  test('默认值可以应用解构赋值的其他变量，但该变量必须已经声明', () => {
    let [x = 1, y = x] = []
    expect(x).toBe(1)
    expect(y).toBe(1)

    let [m = 1, n = m] = [1, 2]
    expect(m).toBe(1)
    expect(n).toBe(2)

    expect(() => {
      let [j = k, k = 1] = []
    }).toThrow(/k is not defined/)
  })
})

describe('对象的解构赋值', () => {
  test('解构不仅可以用于数组， 还可以用于对象', () => {
    let { foo, bar } = { foo: 'aaa', bar: 'bbb' }
    expect(foo).toBe('aaa')
    expect(bar).toBe('bbb')
  })

  test('对象的属性没有次序， 变量必须与属性同名，才能取到正确的值', () => {
    let { bar, foo } = { foo: 'aaa', bar: 'bbb' }
    expect(bar).toBe('bbb')

    let { baz } = { foo: 'aaa', bar: 'bbb' }
    expect(baz).toBeUndefined()
  })

  test('对象的解构可以很方便的将现有对象的方法，赋值到某个变量', () => {
    const { max } = Math
    const numArr = [3, 6, 4, 8, 10, 1, 4]
    expect(max.apply(null, numArr)).toBe(10)

    const { log } = console
    expect(typeof log).toBe('function')
  })

  test('解构也可以用于嵌套解构的对象', () => {
    let obj = {
      p: [
        'Hello',
        {
          y: 'World'
        }
      ]
    }
    let {
      p: [x, { y }]
    } = obj
    expect(x).toBe('Hello')
    expect(y).toBe('World')
    //此时， p 是模式， 而不是变量， 如果想让 p 也是变量，可以写成：
    expect(() => {
      let {
        p,
        p: [x, { y }]
      } = obj
      return p
    }).toBeDefined()
  })

  test('嵌套赋值', () => {
    let obj = {}
    let arr = []
    ;({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true })

    expect(obj.prop).toBe(123)
    expect(arr[0]).toBeTruthy()
  })

  test('解构赋值可以取到继承的属性', () => {
    const obj1 = {}
    const obj2 = { foo: 'bar' }
    Object.setPrototypeOf(obj1, obj2)

    const { foo } = obj1

    expect(foo).toBe('bar')
  })
})

describe('对象的解构赋值，也可以指定默认值', () => {
  test('y should be 3, x is just pattern', () => {
    var { x: y = 3 } = {}
    expect(y).toBe(3)
  })

  test('y should be 5', () => {
    var { x: y = 3 } = { x: 5 }
    expect(y).toBe(5)
  })

  test('默认值生效的条件是， 对象的属性值严格等于undefined', () => {
    var { x = 3 } = { x: null }
    expect(x).toBeNull()
  })

  test('由于数组的本质是对象，因此可以对数组进行对象属性的解构', () => {
    let arr = [1, 2, 3]
    let { 0: first, [arr.length - 1]: last } = arr
    expect(first).toBe(1)
    expect(last).toBe(3)
  })
})

//other
describe('Person class', () => {
  class Person {
    constructor(name) {
      if (typeof name !== 'string') {
        throw TypeError('name must be a string')
      }
      this.name = name
    }
  }

  test('it throws when name is not provided', () => {
    expect(() => new Person()).toThrow()
  })

  test('it throws when name is not a string', () => {
    expect(() => new Person(10)).toThrow()
  })
})

describe('字符串也可以解构赋值', () => {
  const [a, b, c, d, e] = 'hello'
  test('a should be h', () => {
    expect(a).toBe('h')
  })

  test('b should be e', () => {
    expect(b).toBe('e')
  })

  test('类数组都有一个 length, 因此可以对 length属性解构', () => {
    let { length: len } = 'hello'
    expect(len).toBe(5)
  })
})

describe('函数参数也可以解构', () => {
  //解构 + 默认值
  function move({ x = 0, y = 0 } = {}) {
    return [x, y]
  }

  test('should return [0, 0]', () => {
    expect(move()).toEqual(expect.arrayContaining([0, 0]))
  })

  //给对象赋默认值
  function move2({ x, y } = { x: 0, y: 0 }) {
    return [x, y]
  }

  test('should return [undefined, undefined]', () => {
    expect(move2()).toEqual(expect.arrayContaining([0, 0]))

    expect(move2({})).toEqual(expect.arrayContaining([undefined, undefined]))
  })
})

describe('赋值解构的用途', () => {
  test('交换变量', () => {
    let x = 1
    let y = 2
    ;[x, y] = [y, x]

    expect(x).toBe(2)
    expect(y).toBe(1)
  })

  test('从函数返回多个值', () => {
    function example() {
      return [1, 2, 3]
    }
    let [a, b, c] = example()

    expect(a).toBe(1)

    function example2() {
      return {
        foo: 1,
        bar: 2
      }
    }
    let { foo, bar } = example2()

    expect(foo).toBe(1)
  })

  //函数参数的定义

  //提取 JSON 数据

  test('函数参数的默认值', () => {
    const jQuery = {}
    jQuery.ajax = function(
      url,
      {
        async = true,
        beforeSend = function() {},
        cache = true,
        complete = function() {},
        crossDomain = false,
        global = true
        //...
      } = {}
    ) {}
  })

  //遍历 Map 结构

  //模块的指定方法
  // const {someMethod} = require('someModule')
})
