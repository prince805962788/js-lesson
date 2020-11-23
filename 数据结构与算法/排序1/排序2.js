//快速排序
function swap (arr, i, j) {
  [arr[j], arr[i]] = [arr[i], arr[j]]
}
function findTarget (arr, left, right) {
  let flag = arr[left]
  let index = left + 1
  for(let i = index; i <= right; i++) {
    if(arr[i] < flag) {
      swap(arr, index, i)
      index++
    }
  }
  swap(arr, left, index - 1)
  return index
}
function fastSort (arr, left, right) {
  if(left < right) {
    let center = findTarget(arr, left, right)
    fastSort(arr, left, center - 1)
    fastSort(arr, center, right)
  }
  return arr
}
const arr = [12, 4, 6, 14, 8, 2, 3, 9]
console.log(fastSort(arr, 0, arr.length - 1))