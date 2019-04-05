/**
 * 解析日期字符串的年月日，返回年月日数组
 * @param {string} dateStr - 日期字符串 ‘2019-4-05’
 * @returns {array} [2019, 04, 05] | []
 */
const extractDate = (dateStr = '') => {
  if (typeof dateStr !== 'string') return []
  const RE_DATE = /(\d{4})-(\d{1,2})-(\d{1,2})/
  const matchObj = RE_DATE.exec(dateStr)

  //if not match return null
  if (!matchObj) return []
  const [, year, month, day] = RE_DATE.exec(dateStr)
  if (!(year && month && day)) return []
  const padZero = num => String(num).padStart(2, '0')
  return [year, padZero(month), padZero(day)]
}

/**
 * 解析日期字符串中的年月日
 * @param {string} dateStr 日期字符串： '2019-4-5'
 * @returns {array} ['2019', '04', '05']
 */
const extractDate_super = (dateStr = '') => {
  if (typeof dateStr !== 'string') return []
  //ES2018 Named Capture Groups
  // const RE_DATE = /(?<year>\d{4})-(?<month>\d{1,2})-(?<day>\d{1,2})/
  // const matchObj = RE_DATE.exec(dateStr)
  // if (matchObj === null) return []
  // const { year, month, day } = matchObj.groups

  const isMatch = /(?<year>\d{4})-(?<month>\d{1,2})-(?<day>\d{1,2})/.exec(dateStr)
  if (!isMatch) return []
  //可以使用解构赋值直接从匹配结果上为变量赋值
  const {
    groups: { year, month, day } = {}
  } = /(?<year>\d{4})-(?<month>\d{1,2})-(?<day>\d{1,2})/.exec(dateStr)
  const isAllExist = (...list) => list.every(Boolean)
  if (!isAllExist(year, month, day)) return []
  const padZero = num => String(num).padStart(2, '0')
  return [year, padZero(month), padZero(day)]
}

/**
 * 转化日期字符串风格
 * @param {string} dateStr 日期字符串： ‘2019-04-05|2019/4/5’
 * @returns {string | null} '04/05/2019|null'
 */
const transDateStr = dateStr => {
  if (typeof dateStr !== 'string') return null
  const RE_DATE = /(?<year>\d{4})[-|\/](?<month>\d{1,2})[-|\/](?<day>\d{1,2})/u
  //在替换字符串中，使用$<组名>引用具名组
  // const retStr = dateStr.replace(RE_DATE, '$<day>/$<month>/$<year>')
  // const isValidDateStr = str => str.match(/\d{1,2}\/\d{1,2}\/\d{4}/)
  // if (isValidDateStr(retStr)) {
  //   const padZero = num => String(num).padStart(2, '0')
  //   return retStr
  //     .split('/')
  //     .reduce(
  //       (acc, curr) =>
  //         curr.length < 2
  //           ? `${acc ? acc + '/' : acc}${padZero(curr)}`
  //           : `${acc ? acc + '/' : acc}${curr}`,
  //       ''
  //     )
  // }
  // const isValidStr = str => str.match(/\d{2}\/\d{2}\/\d{4}/)
  // if (!isValidStr(retStr)) return null
  // return retStr

  //replace方法的第二个参数也可以是函数，该函数的参数序列如下。
  // '2015-01-02'.replace(re, (
  //   matched, // 整个匹配结果 2015-01-02
  //   capture1, // 第一个组匹配 2015
  //   capture2, // 第二个组匹配 01
  //   capture3, // 第三个组匹配 02
  //   position, // 匹配开始的位置 0
  //   S, // 原字符串 2015-01-02
  //   groups // 具名组构成的一个对象 {year, month, day}
  // ) => {
  //   let { day, month, year } = groups
  //   return `${day}/${month}/${year}`
  // })
  //具名组匹配在原来的基础上，新增了最后一个函数参数：具名组构成的一个对象。函数内部可以直接对这个对象进行解构赋值。

  const retStr = dateStr.replace(RE_DATE, (...list) => {
    if (!list.length) return
    const groups = list[list.length - 1]
    const { day, month, year } = groups
    const padZero = num => String(num).padStart(2, '0')
    return `${padZero(day)}/${padZero(month)}/${year}`
  })
  const isValidStr = str => str.match(/\d{2}\/\d{2}\/\d{4}/)
  if (!isValidStr(retStr)) return null
  return retStr
}
export { extractDate, extractDate_super, transDateStr }
