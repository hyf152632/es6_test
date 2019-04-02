//字符的 Unicode 表示
const a = '\u0061'
console.log(a === 'a')

//js 共有6中方法可以表示一个字符串

console.log('z' === 'z')
// console.log('\172' === 'z')
console.log('\x7A' === 'z')
console.log('\u007A' === 'z')
console.log('\u{7A}' === 'z')

//string.codePointAt
//JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode 码点大于0xFFFF的字符），JavaScript 会认为它们是两个字符。
//ES6 提供了codePointAt方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。
//总之，codePointAt方法会正确返回 32 位的 UTF-16 字符的码点。对于那些两个字节储存的常规字符，它的返回结果与charCodeAt方法相同。
//codePointAt方法返回的是码点的十进制值，如果想要十六进制的值，可以使用toString方法转换一下。

//测试一个字符是由两个字节还是由四个字节组成的：
//测试没通过。。。
const is32Bit = (c = '') => c.codePointAt(0) > 0xffff

export { is32Bit }

//String.fromCodePoin()
//可以识别大于0xFFFF的字符，弥补了String.fromCharCode方法的不足。在作用上，正好与codePointAt方法相反。
