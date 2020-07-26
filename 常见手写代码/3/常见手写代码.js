//防抖 debounce
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
//节流 throttle
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
var debounceRun = throttle(function () {
  console.log(123)
}, 2000)
// 只有当鼠标移动停止后2s打印123
window.addEventListener('mousemove', debounceRun)