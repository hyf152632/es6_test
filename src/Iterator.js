//Iterator 是一种接口，为各种不同的数据结构提供统一额访问机制。任何数据结构只要不输Iterator接口，就可以完成便利操作

//Iterator的作用有三个： 为各种数据结构，提个一个统一的，渐变的访问接口，而是使得数据结构的成员能够按某种持续排列。
//三是ES6创造了一种新的遍历命令.for...of循环，Iterator接口主要供for..of消费

//遍历器对待本质上，就是一个指针对象。

/**
 * makeIterator 生成iterator
 * @param {array} arr - 需要生成的数组
 * @return
 *
 */
const makeIterator = (arr = []) => {
  try {
    arr = Array.from(arr);
  } catch (e) {
    return { value: undefined, done: true };
  }

  //   return {
  //     next: function() {
  //       return arr.length
  //         ? { value: arr.shift(), done: false }
  //         : { value: undefined, done: true };
  //     }
  //   };
  let nextIndex = 0;
  return {
    next: function() {
      return nextIndex < arr.length
        ? { value: arr[nextIndex++], done: false }
        : { value: undefined, done: true };
    }
  };
};

//ES6 规定，默认的Iterator接口部署在数据结构的 Symbol.iterator 属性，或者说一个数据结构是要具有Symbol.iterator
//就可以认为是“可遍历的”
//Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。

const obj = {
  origin: Array.from({ length: 10 }, (_, index) => index + 1),
  [Symbol.iterator]: function() {
    const arr = [...this.origin];
    return {
      next: function() {
        return arr.length
          ? { value: arr.shift(), done: false }
          : { value: undefined, done: true };
      }
    };
  }
};
// for (let i of obj) {
//     console.log(i)
// }

//原生具备 Iterator 接口的数据结构如下：
// - Array
// - Map
// - Set
// - String
// - TypedArray
// - 函数的 argumets 对象
// - NodeList 对象

// let arr = ['a', 'b', 'c']
// let iter = arr[Symbol.iterator]()
// arr.map(() => console.log(iter.next()))

//一个对象如果要具备可被for...fo循环调用的Iterator接口，就必须在SAmbole.iteraor的属性上部署遍历器生成方法

class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }
  [Symbol.iterator]() {
    return this;
  }

  next() {
    var value = this.value;
    if (value < this.stop) {
      this.value++;
      return { done: false, value: value };
    }
    return { done: true, value: undefined };
  }
}

function range(start, stop) {
  return new RangeIterator(start, stop);
}
// for(var value of range(0, 3)) {
//     console.log(value)
// }

//通过遍历器实现指针结构的例子
function Obj(value) {
  this.value = value;
  this.next = null;
}
Obj.prototype[Symbol.iterator] = function() {
  var current = this;

  return {
    next: function next() {
      if (current) {
        var value = current.value;
        current = current.next;
        return { done: false, value: value };
      } else {
        return { done: true, value: undefined };
      }
    }
  };
};

var one = new Obj(1);
var two = new Obj(2);
var three = new Obj(3);
one.next = two;
two.next = three;

// for (var i of one) {
//   console.log(i);
// }

//对于类似数组的对象，部署Iterator接口，有一个降本很暗，就是Symbol.iterator方法直接饮用数组的Iterator接口

let iterable = {
  0: 'a',
  1: 'b',
  2: 'c',
  3: 'd',
  length: 4
};

// for(let i of Array.from(iterable)){
//     console.log(i)
// }

let iterableObj = Object.assign({}, iterable, {
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
});
// for(let i of iterableObj) {
//     console.log(i)
// }

// 普通对象部署Iterator 不会有效果
let iterableNo = {
  a: 'a',
  b: 'b',
  c: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};

// for(let i of iterableNo) {
//     console.log(i)
// // undefined undefined undefined
// }

//扩展运算符内部就调用 Iterator 接口

//yield 后面跟一个可遍历的结构，他就会调用该结构的遍历器接口

//可以覆盖原生的Symbol.Iterator方法，达到修改便利其行为的目的

const str = new String('hi');
// ;console.log([...str])

str[Symbol.iterator] = function() {
  return {
    _first: true,
    next: function() {
      if (this._first) {
        this._first = false;
        return { value: 'bye', done: false };
      } else {
        return { done: true };
      }
    }
  };
};

// console.log([...str])
// console.log(str)

//使用 Generator 函数，实现Symbol.iterator

let myIterator = {
  [Symbol.iterator]: function*() {
    yield 1;
    yield 2;
    yield 3;
  }
};
// console.log([...myIterator])

let objj = {
  *[Symbol.iterator]() {
    yield 'hello';
    yield 'world';
  }
};

// for(let x of objj) {
//     console.log(x)
// }

//for...of
//一个数据结构只要部署了 Symbole.iterator属性，就是为具有Iterator接口，
//就可以用for...of循环遍历它的成员。也就是说，for...of循环内部调用的数据结构的Symbol.iterator方法

//for...in 循环主要是为遍历对象设计额，不适合遍历数组

// for(let n of [1,2,3,4,5]) {
//     if(n > 3)
//     break
//     console.log(n)
// }

export { makeIterator };
