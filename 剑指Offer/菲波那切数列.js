let arr = [0, 1]
let fib = function (n) {
  if(n === 0) return arr[0]
  if(n === 1) return arr[1]
  if(arr[n]) {
    return arr[n] % 1000000007
  }else {
    arr[n] = fib(n - 1) + fib(n - 2)
    return arr[n] % 1000000007
  }
};
fib(55)