const sum = (a, b) => a + b

const constantize = obj => {
  Object.freeze(obj)
  Object.keys(obj)
    .filter(key => typeof obj[key] === 'object' && obj[key] !== null)
    .forEach(key => constantize(obj[key]))
}

export { sum, constantize }
