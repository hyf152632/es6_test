const sum = (a, b) => a + b

const constantize = obj => {
  Object.freeze(obj)
  Object.keys(obj)
    .filter(key => typeof obj[key] === 'object' && obj[key] !== null)
    .forEach(key => constantize(obj[key]))
}

const getGlobal = () => {
  if (typeof self !== 'undefined') {
    return self
  }
  if (typeof window !== 'undefined') {
    return window
  }
  if (typeof global !== 'undefined') {
    return global
  }
  throw new Error('unable to locate global object')
}

export { sum, constantize, getGlobal }
