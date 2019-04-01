import { sum, constantize, getGlobal } from './../src/var_let_const_1.js'

describe('sum fun', () => {
  test('should add 1 and 2, be 3', () => {
    expect(sum(1, 2)).toBe(3)
  })
  test('should add 0 and 1, be 1', () => {
    expect(sum(0, 1)).toEqual(1)
  })
})

describe('let 存在块作用域', () => {
  {
    let a = 10
    var b = 1
  }
  test('should throw ReferenceError: a is not defined', () => {
    expect(() => {
      return a
    }).toThrow(/a is not defined/)
  })
  test('b should be 1', () => {
    expect(b).toBe(1)
  })
})

describe('for 循环中用 let 定义的变量，只存在于 for 循环中', () => {
  test('should throw ReferenceError', () => {
    for (let i = 0; i < 10; i++) {}
    expect(() => i).toThrow()
  })
  test('for 循环设置循环变量的那部分是一个父作用域，而循环体内部是一个独立的子作用域', () => {
    for (let i = 0; i < 3; i++) {
      let i = 'abc'
      expect(i).toBe('abc')
    }
  })
})

describe('let 不存在变量提升', () => {
  test('提前引用 let 定义的变量， 会报 Reference', () => {
    expect(() => bar).toThrow(/bar is not defined/)
    let bar = 2
  })
  test('提前引用 var 定义的变量， 等于 undefined', () => {
    expect(foo).toBe(undefined)
    var foo = 1
  })
})

describe('var 定义的for 循环变量会泄露到全局', () => {
  test('i should be 5', () => {
    var s = 'hello'
    for (var i = 0; i < s.length; i++) {}
    expect(i).toBe(5)
  })
})

describe('const 声明的只读常量，不能改变', () => {
  test('should throw TypeError', () => {
    const PI = 3.14
    expect(() => (PI = 3)).toThrow(/Assignment to constant variable/)
  })
})

describe('const 只在声明的块内有效', () => {
  test('should throw ReferenceError', () => {
    if (true) {
      const MAX = 5
    }
    expect(() => MAX).toThrow(/MAX is not defined/)
  })
})

describe('const 不存在变量提升', () => {
  test('should throw ReferenceError', () => {
    expect(() => MAX).toThrow(/MAX is not defined/)
    const MAX = 5
  })
})

describe('const 实际上保证的， 并不是变量额值不得改动， 而是变量指向的那个内存地址所保存的数据不得改动', () => {
  const foo = {}
  foo.prop = 123
  test('foo.prop should be 123', () => {
    expect(foo.prop).toBe(123)
  })

  test('should throw Error: TypeError', () => {
    expect(() => (foo = {})).toThrow()
  })
})

describe('constantize fun', () => {
  const obj = {
    a: 'a',
    b: null,
    c: {
      d: 'd'
    }
  }
  constantize(obj)
  test('obj is been freezed', () => {
    expect(() => (obj.a = 'b')).toThrow()
    expect(() => (obj.b = 'b')).toThrow()
    expect(() => (obj.c.d = 'e')).toThrow()
    expect(obj.a).toBe('a')
  })
})

describe('get global object', () => {
  test('should get global', () => {
    expect(getGlobal()).toBe(global)
  })
})
