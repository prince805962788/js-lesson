//new的实现
function New(func) {
  const res = {}
  if (func.prototype !== null) { //如果构造函数不为空
    res.__proto__ = func.prototype //实力的原形对象指向构造函数的原形
  }
  const args = Array.prototype.slice.call(arguments, 1) //取出除去构造函数的剩余参数
  const funcRes = func.apply(res, args) //使用构造函数func在res作用域下执行
  //如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，那么new表达式中的函数调用会自动返回这个新的对象。
  if (typeof funcRes === 'object' || typeof funcRes === 'null' || typeof funcRes === 'function') {
    return funcRes
  } else {
    return res
  }
}
console.log('--------New的实现--------')

function setObj(name, gender) {
  this.name = name
  this.gender = gender
}
const res1 = new setObj('lee', 'male')
const res2 = New(setObj, 'lee', 'male')
console.log(res1)
console.log(res2)

//call的实现
Function.prototype.myCall = function (context = window) {
  context.fn = this
  const args = [...arguments].slice(1)
  const result = context.fn(...args)
  delete context.fn
  return result
}
//apply的实现
Function.prototype.myApply = function (context = window) {
  context.fn = this
  let result
  if (arguments.length >= 1) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}
//bind的实现
Function.prototype.myBind = function (context = window) {
  if (typeof this != "function") {
    throw Error("not a function")
  }
  let fn = this
  const args = [...arguments].slice(1) // Array.prototype.slice.call(arguments, 1)
  let resFn = function () {
    return fn.apply(this instanceof resFn ? this : context, args.concat(...arguments))
  }
  resFn.prototype = this.prototype
  return resFn
}
const obj = {
  value: 123
}
const testCall = function (name, age) {
  console.log('myCall:', name, age, this.value)
}
const testApply = function (name, age) {
  console.log('myApply:', name, age, this.value)
}
const testBind = function (name, age) {
  console.log('myBind:', name, age, this.value)
}
console.log('--------call,apply,bind的实现--------')
testCall.myCall(obj, 'lee', 24)
testApply.myApply(obj, ['prince', 25])
let bind = testBind.myBind(obj, 'princlee', 26)
bind()