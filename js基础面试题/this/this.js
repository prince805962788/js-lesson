// this 的指向，是在调用函数时根据执行上下文所动态确定的。
// 重点：在执行函数时，如果函数中的 this 是被上一级的对象所调用，那么 this 指向的就是上一级的对象；否则指向全局环境。

// 1
const student = {
  name: 'Lucas',
  fn: function () {
    return this
  }
}
console.log(student.fn() === student) // ture
// 2
const person = {
  name: 'Lucas',
  brother: {
    name: 'Mike',
    fn: function () {
      return this.name
    }
  }
}
console.log(person.brother.fn()) // Mike
// 3
const o1 = {
  text: 'o1',
  fn: function () {
    return this.text
  }
}
const o2 = {
  text: 'o2',
  fn: function () {
    return o1.fn()
  }
}
const o3 = {
  text: 'o3',
  fn: function () {
    var fn = o1.fn
    return fn()
  }
}

console.log(o1.fn()) // this被上级对象o1调用，打印出o1
console.log(o2.fn()) // 最终还是调用 o1.fn()，打印o1
console.log(o3.fn()) // var fn = o1.fn 赋值之后，fn是“裸奔”调用
// 输出 o2，该怎么做？
// const o2 = {
//   text: 'o2',
//   fn: o1.fn,
// }
// console.log(o2.fn())