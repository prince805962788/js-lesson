let evalRPN = (tokens) => {
  let stack = []
  let res
  for (let i = 0; i < tokens.length; i++) {
    let num
    switch (tokens[i]) {
      case '+':
        res = parseInt(stack.pop() + stack.pop(), 10)
        stack.push(res)
        break;
      case '-':
        num = stack.pop()
        res = parseInt(stack.pop() - num, 10)
        stack.push(res)
        break;
      case '*':
        res = parseInt(stack.pop() * stack.pop(), 10)
        stack.push(res)
        break;
      case '/':
        num = stack.pop()
        res = parseInt(stack.pop() / num, 10)
        stack.push(res)
        break;
      default:
        stack.push(parseInt(tokens[i]))
    }
  }
  return stack.pop()
}
let res = evalRPN(["4"])
console.log(res)