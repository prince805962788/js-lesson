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
