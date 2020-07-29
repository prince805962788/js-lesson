//实现一个reduce
Array.prototype.myReduce = function(func, initialValue) {
  let arr = this
  let base = typeof initialValue === 'undefined' ? arr[0] : initialValue
  let startPoint = typeof initialValue === 'undefined' ? 1 : 0
  arr.slice(startPoint)
      .forEach((val, index)=> {
          base = func(base, val, index + startPoint, arr)
      })
  return base
}
let res = [1,2,3,4].myReduce((prev,cur)=>{
	return prev+cur
})
console.log(res)