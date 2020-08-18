function fn1(){
  console.log(1)
}
function fn2(){
  console.log(2)
}
function fn3(){
  console.log(3)
}
function *showNumber(){
  const arr = [fn1,fn2,fn3]
  for(item of arr){
    yield item()
  }
}
const res = showNumber()
res.next()
res.next()
res.next()