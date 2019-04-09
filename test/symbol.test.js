describe('Symbol dataType represent a unique value', () =>  {
  let s = Symbol()
  test('should return true, typeof Symbol is symbol', () =>  {
    expect(typeof s).toBe('symbol')
  })

  test('same Symbol func param is not equal', () =>  {
      let s1 = Symbol()
      let s2 = Symbol()

      expect(s1 === s2).toBeFalsy()

      let s3 = Symbol('foo')
      let s4 = Symbol('foo')

      expect(s3 !== s4).toBeTruthy()
  })

  test('Symbol can trans to string', () =>  {
      let sym = Symbol('My symbol')

      let symString = sym.toString()

      expect(symString).toBe('Symbol(My symbol)')
  })

  test('symbol as obj proper name', () =>  {
      let mySymbol = Symbol()
      let a =  {}
      a[mySymbol] = 'Hello'

      expect(a[mySymbol]).toBe('Hello')

      let b =  {
          [mySymbol]:'Hello'
      }

      let c =  {}

      Object.defineProperty(c, mySymbol,  {value:'Hello'})

      expect(b[mySymbol]).toBe('Hello')

      expect(c[mySymbol]).toBe('Hello')
  })

  test('Symbol define const', () =>  {
      const log =  {}

      log.levels =  {
          DEBUG:Symbol('debug'), 
          INFO:Symbol('info'), 
          WARN:Symbol('warn')
      }
      
  })

  test('use the same Symbol', () =>  {
      let s1 = Symbol.for('foo')
      let s2 = Symbol.for('foo')

      expect(s1 === s2).toBeTruthy()
  })

  test('should return registered Symbol key', () =>  {
      let s1 = Symbol.for('foo')
      expect(Symbol.keyFor(s1)).toBe('foo')

      let s2 = Symbol('foo')
      expect(Symbol.keyFor(s2)).toBeUndefined()
  })
})
