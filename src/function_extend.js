// 箭头函数有几个使用注意点。

// （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

// （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

// （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

// （4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

//另外，由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。

// 不适用场合
// 由于箭头函数使得this从“动态”变成“静态”，下面两个场合不应该使用箭头函数。

// 第一个场合是定义函数的方法，且该方法内部包括this。

// const cat = {
//   lives: 9,
//   jumps: () => {
//     this.lives--;
//   }
// }
// 上面代码中，cat.jumps()方法是一个箭头函数，这是错误的。调用cat.jumps()时，如果是普通函数，该方法内部的this指向cat；如果写成上面那样的箭头函数，使得this指向全局对象，因此不会得到预期结果。

// 第二个场合是需要动态this的时候，也不应使用箭头函数。

// var button = document.getElementById('press');
// button.addEventListener('click', () => {
//   this.classList.toggle('on');
// });
// 上面代码运行时，点击按钮会报错，因为button的监听函数是一个箭头函数，导致里面的this就是全局对象。如果改成普通函数，this就会动态指向被点击的按钮对象。

// 另外，如果函数体很复杂，有许多行，或者函数内部有大量的读写操作，不单纯是为了计算值，这时也不应该使用箭头函数，而是要使用普通函数，这样可以提高代码可读性。

//尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。

//递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。

//不使用尾递归， 计算n的阶乘， 最多需要保存 n 个调用记录， 复杂度 O(n)
const factorial = n => {
  if (n === 1) return 1
  return n * factorial(n - 1)
}

//改写成尾递归， 只保留一个调用记录， 复杂度O(1)

const factorial_optimize = (n, total = 1) => {
  if (n === 1) return total
  return factorial_optimize(n - 1, n * total)
}

const Fibonacci = n => {
    if(n <= 1) return 1

    return Fibonacci(n - 1) + Fibonacci(n - 2)
}

const Fibonacci_optimize = (n, ac1 = 1, ac2 = 1) {
    if(n <= 1) return ac2

    return Fibonacci_optimize(n - 1, ac2, ac1 + ac2)
}

//ES2017 允许函数的最后一个参数有尾逗号（trailing comma）。