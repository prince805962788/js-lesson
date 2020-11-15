function New (func) {
  let res = {}
  if(func.prototype !== null) {
    res.prototype = func.prototype
  }
  const args = Array.prototype.slice.call(arguments, 1)
  const funcRes = func.apply(res, args)
  if(typeof funcRes === 'object' || typeof funcRes === 'function') {
    return funcRes
  }else{
    return res
  }
}
function setObj (name, gender) {
  this.name = name
  this.gender = gender
}
const res2 = New(setObj, 'lee', 'male')
console.log(res2)