// function Point(x, y) {
//   this.x = x;
//   this.y = y;
// }
// Point.prototype.toString = function() {
//   return `(${this.x},${this.y})`;
// };

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return `(${this.x},${this.y})`;
  }
}

class MyClass {
  constructor() {}
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: ' + value);
  }
}

let person = new class {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}('张三');

//静态方法
class Foo {
  static classMethod() {
    return 'hello';
  }
}
Foo.classMethod(); // 'hello'

var foo = new Foo();
foo.classMethod(); //TypeError: foo.classMethod is not a function

//实例属性的新写法
//实例属性除了定义在 constructor() 方法里面的this上面,也可以定义在类的最顶层

//静态属性提案
//私有属性提案

export { Point };
