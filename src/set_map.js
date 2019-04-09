//set 
//类似于数组，但是成员的值都是唯一的

//Set 函数可以结构一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化

// const divEleSet = new Set(document.querySelectorAll('div'))

const divEleSet2 = new Set()
// document.querySelectorAll('div').forEach(div => set.add(div))

//Set.prototype.constructor
//Set.prototype.size

//s.add()
//s.delete()
//s.has()
//s.clear()

//遍历方法
//keys()
//values()
//entries()
//forEach()

//扩展运算符(...)内部使用for...of循环，所以也可以用于 Set 结构

const union = (arr1 = [], arr2 = []) =>  {
    const a = new Set(arr1)
    const b = new Set(arr2)
    return [...new Set([...a, ...b])]
}

const intersect = (arr1 = [], arr2 = []) =>  {
    const a = new Set(arr1)
    const b = new Set(arr2)
    return [...new Set([...a].filter(x => b.has(x)))]
}

const difference = (arr1 = [], arr2 = []) =>  {
    const a = new Set(arr1)
    const b = new Set(arr2)
    return [...new Set([...a].filter(x =>  ! b.has(x)))]
}

//WeakSet
//成员只能是对象


export {
    union, 
    intersect, 
    difference
}


//Map 
//类似于对象，也是键值对的合集， 但是"键"的范围不限于字符串，各种类型的值（包括）对象都可以当做键。
//Object结构提供了“字符串——值”的对应，Map结构提供了“值——值”的对应，是一种更完善的 Hash 结构实现。
//如果你需要“键值对”的数据结构， Map 比 Object 更合适。

//任何具有 Iterator 接口，且每个成员都是一个双元素的数组的数据结构都可以当做 Map 构造函数的参数。
//也就是说， Set 和 Map  都可以用来生成新的 Map。

//如果对同一个键多次赋值，后面的值将覆盖前面的值

//如果读取一个未知的键，则返回 undefined

//Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用当型暂存的属性与原作者的属性同名。

//size
//set
//get
//has 
//delete 
//clear 

//keys
//values
//entries
//forEach
//for...of
