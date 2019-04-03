# 《es6 入门》example test

## use [jest](https://jestjs.io/docs/zh-Hans/getting-started)

```js
expect({a:1}).toBe({a:1})//判断两个对象是否相等
expect(1).not.toBe(2)//判断不等
expect(n).toBeNull(); //判断是否为null
expect(n).toBeUndefined(); //判断是否为undefined
expect(n).toBeDefined(); //判断结果与toBeUndefined相反
expect(n).toBeTruthy(); //判断结果为true
expect(n).toBeFalsy(); //判断结果为false
expect(value).toBeGreaterThan(3); //大于3
expect(value).toBeGreaterThanOrEqual(3.5); //大于等于3.5
expect(value).toBeLessThan(5); //小于5
expect(value).toBeLessThanOrEqual(4.5); //小于等于4.5
expect(value).toBeCloseTo(0.3); // 浮点数判断相等
expect('Christoph').toMatch(/stop/); //正则表达式判断
expect(['one','two']).toContain('one'); //不解释

function compileAndroidCode() {
  throw new ConfigError('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(ConfigError); //判断抛出异常
}）

const expected = ['Alice', 'Bob'];
expect(['Alice', 'Bob', 'Eve']).toEqual(expect.arrayContaining(expected));
expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected));


```

## 函数注释规范

example1:

```js
/**
 * test the js document.
 * @param {string} name - js name
 * @param {string | number} flag - js flllllll
 * @returns {*} - current jsdoc
 *
 * @example
 * // returns flag
 * testJsDoc('haha', 'e');
 */
function testJsDoc(name, flag) {
  if (flag) {
    return 'flag'
  }
  return name
}

export default testJsDoc
```

example2:

```js
/**
* Book类，代表一个书本.
* @constructor
* @param {string} title - 书本的标题.
* @param {string} author - 书本的作者.
*/
functionBook(title, author){
    this.title=title;
    this.author=author;
}

//* @returns {string|*} 返回当前的书本名称

/*

* @example

* multiply(3, 2);

*/

//其他常用注释
//@overview对当前代码文件的描述。

//@copyright代码的版权信息。

//@author []代码的作者信息。

//@version当前代码的版本。

```
