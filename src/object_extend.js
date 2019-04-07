let obj = { foo: 123 }

Object.getOwnPropertyDescriptor(obj, 'foo')

// 目前，有四个操作会忽略enumerable为false的属性。

// for...in循环：只遍历对象自身的和继承的可枚举的属性。
// Object.keys()：返回对象自身的所有可枚举的属性的键名。
// JSON.stringify()：只串行化对象自身的可枚举的属性。
// Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。

//我们知道，this关键字总是指向函数所在的当前对象，
//ES6 又新增了另一个类似的关键字super，指向当前对象的原型对象。
//注意，super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。

//对象的扩展运算符

//对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

//Object.is()
//ES6 提出“Same-value equality”（同值相等）算法，用来解决这个问题。Object.is就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。

//Object.is(+0, -0) false
//Objecct.is(NaN, NaN) true

//Object.assign()

//Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。
//属性名为 Symbol 值的属性，也会被Object.assign拷贝。

// /Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。

//Object.assign可以用来处理数组，但是会把数组视为对象。

//Object.assign只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。

const clone = origin => Object.assign({}, origin)

const cloneWithProto = origin => {
  const originProto = Object.getPrototypeOf(origin)
  return Object.assign(Object.create(originProto), origin)
}

//指定默认值
const processContent = options => {
  const DEFAULTES = {
    logLevel: 0,
    outputFormat: 'html'
  }

  options = Object.assign({}, DEFAULTES, options)
  console.log(options)
  //...
}

//Object.getOwnPropertyDescriptors()

//Object.setPrototypeOf()
//Object.getPrototypeOf()

//Object.keys(), Object.values(), Object.entries()

//Object.fromEntries()

//该方法的主要目的，是将键值对的数据结构还原为对象，因此特别适合将 Map 结构转为对象。

Object.fromEntries([['foo', 'bar'], ['baz', 42]])

const entries = new Map([['foo', 'bar'], ['baz', 42]])

Object.fromEntries(entries)

Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
