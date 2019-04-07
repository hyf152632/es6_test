const maxNumOfArr = (arr = []) => Math.max(...arr)

const copyArr = (arr = []) => [...arr]

const mergeArr = (arr1 = [], arr2 = []) => [...arr1, ...arr2]

const strToArr = (str = '') => [...str]

const reverseStr = (str = '') => [...str].reverse().join('')

//任何定义了遍历器（Iterator）接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组。

//let nodeList = document.querySelectorAll('div')
//let array = [...nodeList]

//Array.from
//Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。
//实际应用中，常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。
//值得提醒的是，扩展运算符（...）也可以将某些数据结构转为数组。
//扩展运算符背后调用的是遍历器接口（Symbol.iterator），如果一个对象没有部署这个接口，就无法转换。Array.from方法还支持类似数组的对象。
//所谓类似数组的对象，本质特征只有一点，即必须有length属性。因此，任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换。

//Array.of()
//Array.of方法用于将一组值，转换为数组。
//这个方法的主要目的，是弥补数组构造函数Array()的不足。

//[].copyWithin()
//数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
//Array.prototype.copyWithin(target, start = 0, end = this.length)

//[].find, [].findIndex
//数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
//数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。

//这两个方法都可以发现NaN，弥补了数组的indexOf方法的不足。
// [NaN].indexOf(NaN)
// -1

// [NaN].findIndex(y => Object.is(NaN, y))
// 0

//[].fill
//fill方法使用给定值，填充一个数组。

//数组实例的 entries()，keys() 和 values()

//数组实例的 includes()

//数组实例的 flat()，flatMap()

const flatMap = (arr = []) => arr.flatMap(x => [x, x * 2])

export { maxNumOfArr, copyArr, mergeArr, strToArr, reverseStr, flatMap }
