// 1
// 写一个函数实现arr的串行调用，让arr依次输出run1/run2/run3。
// 必须按照arr的顺序执行，需要用Promise的状态去实现先后顺序（resolve或者reject函数执行状态改变后才能执行下一个）。
let arr = [
  () => {
    return new Promise((resolve) => {
      console.log('run1')
      resolve()
    })
  },
  () => {
    return new Promise((resolve) => {
      console.log('run2')
      resolve()
    })
  },
  () => {
    return new Promise((resolve) => {
      console.log('run3')
      resolve()
    })
  },
]
async function p1 (arr) {
  for(const item of arr) {
    await item()
  }
}
p1(arr)

// function p2 (arr) {
//   let res = Promise.resolve()
//   arr.forEach(item => {
//     res = res.then(() => item())
//   });
// }
// p2(arr)

// function p3 (arr) {
//   arr.reduce( (pre, cur) => {
//     return pre.then(() => cur())
//   }, Promise.resolve());
// }
// p3(arr)
// 这里需要注意的一点是await只能出现在async函数中，所以这里遍历arr用for循环并没有用forEach。
// 因为forEach里就是另一个函数隔开了外层的async函数，控制台会报错。

// 2