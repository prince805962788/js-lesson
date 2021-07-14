function curry (fn, args) {
  const len = fn.length;
  args = args || []
  return function () {
    const newArgs = [...args, ...arguments]
    if(newArgs.length < len) {
      return curry.call(this, fn, newArgs)
    }else {
      return fn.apply(this, newArgs)
    }
  }
}
function multiFn (a, b, c) {
  return a * b * c;
}

const multi = curry(multiFn);
console.log(multi(2)(3)(4))

let nums = []
function A (n) {
  nums.push(n)
  return function () {
    if(arguments.length > 0) {
      return A.apply(this, [...arguments])
    }else {
      return nums.reduce((a, b) => a + b, 0)
    }
  }
}
const res = A(1)(2)(3)(4)()
console.log(res)