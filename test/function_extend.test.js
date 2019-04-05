describe('function default params', () => {
  test('should return default params', () => {
    //3-As:
    //Arrange-Act-Assert
    const funWithDefaultParam = (greeting = 'hello') => {
      return `${greeting} world.`
    }

    const ret = funWithDefaultParam()

    expect(ret).toBe('hello world.')
  })
})

describe('use default param', () => {
  test('should throw error, if not get param', () => {
    const throwIfMissing = () => {
      throw new Error('Missing parameter.')
    }
    const foo = (mustBeProvided = throwIfMissing()) => {
      return mustBeProvided
    }

    expect(() => foo()).toThrow(/Missing parameter/)

    expect(foo('haha')).toBe('haha')
  })
})

describe('rest param', () => {
  test('rest param is truthy a array.', () => {
    const funWithRest = (...rest) => Array.isArray(rest)

    expect(funWithRest()).toBeTruthy()
  })

  test('rest param must be last param', () => {
    //语法错误
    // const funWithRestButNotLastParam = (a, ...rest, c) => rest
    //funWithRestButNotLastParam()
  })
})

describe('arrow func with rest', () => {
  test('should return array[0]', () => {
    const getArrayHead = ([head]) => head
    const getArrayFinal = (arr = []) =>
      arr.length === 1 ? getArrayHead(arr) : getArrayFinal(arr.slice(1))
    expect(getArrayHead([1, 2, 3])).toBe(1)
    expect(getArrayFinal([1, 2, 3])).toBe(3)
  })
})

describe('arrow func with nest', () => {
  test('insert func', () => {
    const insert = value => ({
      into: array => ({
        after: afterValue => {
          array.splice(array.indexOf(afterValue) + 1, 0, value)
          return array
        }
      })
    })
    expect(
      insert(2)
        .into([1, 3])
        .after(1)
    ).toEqual(expect.arrayContaining([1, 2, 3]))
  })

  test('pipeline', () => {
    const pipeline = (...funcs) => val => funcs.reduce((a, b) => b(a), val)
    const plus1 = a => a + 1
    const mult2 = a => a * 2
    const addThenMult = pipeline(plus1, mult2)
    expect(addThenMult(5)).toBe(12)
  })
})

describe('尾调用优化', () => {})
