# js-lesson
## 目录
[手写代码](#手写代码)
## 手写代码
### es5继承
```
function Parent(name) {
  this.name = name
}

function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child
```
### intanceof
```
function intanceof(l, r) {
  const left = l.__proto
  const right = r.prototype
  
  while (true) {
    if (left === null) return false
    if (left === right) return true
    left = left.__proto__
  }
}
```
### new的实现
```
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
```
### call,apply,bind的实现
#### call的实现
```
Function.prototype.myCall = function (context = window) {
  context.fn = this
  const args = [...arguments].slice(1)
  const result = context.fn(...args)
  delete context.fn
  return result
}
```
#### apply的实现
```
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
```
#### bind的实现
```
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
```
### reduce的实现
```
Array.prototype.myReduce = function (func, initialValue) {
  const arr = this
  //累加的结果值，如果没有传入的初始值，那么取数组的第一个为初始值
  let res = initialValue === undefined ? arr[0] : initialValue
  //开始遍历的节点位置，如果没有传入的初始值，那么从数组的第一个开始
  const startPoint = initialValue === undefined ? 1 : 0
  arr.slice(startPoint).forEach((val, index) => {
    res = func(res, val, index + startPoint, arr)
  })
  return res
}
```
### 函数柯里化
```
function curry(fn, args) {
  const length = fn.length //函数fn的参数数量
  args = args || []
  return function () {
    const newArgs = args.concat(Array.prototype.slice.call(arguments))
    if (newArgs.length < length) {
      return curry.call(this, fn, newArgs)
    } else {
      return fn.apply(this, newArgs);
    }
  }
}
```
### 防抖
```
function debounce(fn, wait) {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments) //返回当前函数所属的作用域下执行
    }, wait)
  }
}
```
### 节流
```
function throttle(fn, wait) {
  let timer = null
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
        timer = null
      }, wait)
    }
  }
}
```
### 数组扁平化
```
function platArr(arr) {
  const res = []
  const plat = arr => {
    arr.map(item => {
      Array.isArray(item) ? plat(item) : res.push(item)
    })
  }
  plat(arr)
  return res
}
```
