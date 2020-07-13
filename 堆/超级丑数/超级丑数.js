class ugly {
  constructor(n, primes) {
    this.n = n
    this.primes = new heap(primes)
  }
  getAll() {
    //超级丑数列表
    let res = [1]
    let i = 2
    let primes = this.primes
    while (res.length < this.n) {
      let arr = ugly.gerPrimes(i)
      let k = 0
      let l = arr.length
      for (; k < l; k++) {
        if (!primes.find(arr[k])) {
          break
        }
      }
      if (k === l) {
        if (l === 0) {
          if (primes.find(arr[k])) {
            res.push(i)
          }
        } else {
          res.push(i)
        }
      }
      i++
    }
    return res[this.n - 1]
  }
  static gerPrimes(n) { //找到正整数n的质因数
    let prime = n => {
      let arr = [] //储存所有质因数
      for (let i = 2; i < n / 2 + 1; i++) {
        if (n % i === 0 && !prime(i).length) { //整除等于0说明是质数，并且这个因数也是质数，所以递归他不存在质因数列表
          arr.push(i)
        }
      }
      return arr
    }
    return prime(n)
  }
}
class heap {
  constructor(arr) {
    this.data = arr
    this.max = arr.length
  }
  static swap(arr, i, j) {
    const swap = arr[i]
    arr[i] = arr[j]
    arr[j] = swap
  }
  static maxHeapify(arr, i, size) {
    let left = i * 2 + 1
    let right = i * 2 + 2
    let largest = i
    if (left < size && arr[left] > arr[i]) {
      largest = left
    }
    if (right < size && arr[right] > arr[i]) {
      largest = right
    }
    if (largest !== i) {
      heap.swap(arr, largest, i)
      this.maxHeapify(arr, largest, size)
    }
  }
  sort() {
    let arr = this.data
    let len = arr.length
    if (len <= 0) {
      return arr
    } else {
      for (let i = Math.floor(len / 2 - 1); i > 0; i--) {
        heap.maxHeapify(arr, i, len)
      }
      // 只是查找，不需要做排序
      // for (let j = len - 1; j > 0; j--) {
      //   swap(arr, 0, j)
      //   heap.maxHeapify(arr, 0, j)
      // }
    }
    return arr
  }
  find(val, i = 0) {
    let arr = this.data
    if (val > arr[i] || i > this.max) {
      return false
    } else if (val === arr[i]) {
      return val
    } else {
      return this.find(val, i * 2 + 1) || this.find(val, i * 2 + 2)
    }
  }
}
const num = 180
const primes = ugly.gerPrimes(num)
console.log(primes)