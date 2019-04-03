/**
 *
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
export { extractDate }
