//寄生组合式继承
function Parent (name) {
  this.name = name
}

function Child (name, age) {
  Parent.call(this, name)
  this.age = age
}
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child
let parent = new Parent('lee')
let child = new Child('prince', 23)
console.log(parent, child, child instanceof Parent)
//数组扁平化
function platArr (arr) {
  const res = []
  const plat = arr => {
    arr.map(item => {
      Array.isArray(item) ? plat(item) : res.push(item)
    })
  }
  plat(arr)
  return res
}
const arr = [1, 2, [3, 4, [5, 6]], 7, 8]
console.log('------------数组扁平化------------')
console.log(platArr(arr))
//函数柯里化
function curry (fn, args) {
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

function multiFn (a, b, c) {
  return a * b * c;
}

const multi = curry(multiFn);
console.log(multi(2)(3)(4))
//实现一个intanceof
function intanceof (l, r) {
  let left = l.__proto
  let right = r.prototype
  while (1) {
    if (left === null) return false
    if (left === right) return true
    left = left.__proto__
  }
}