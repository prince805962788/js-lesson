var isValid = function (s) {
  let rightStack = []
  if ((s.length) % 2 !== 0) return false
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      rightStack.push(')')
    } else if (s[i] === '[') {
      rightStack.push(']')
    } else if (s[i] === '{') {
      rightStack.push('}')
    } else if (rightStack.pop() !== s[i]) {
      return false
    }
  }
  return rightStack.length === 0
};
let res = isValid("(){}[}")
console.log(res)