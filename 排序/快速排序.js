const swap = (arr, i, j) => {
  const swap = arr[i]
  arr[i] = arr[j]
  arr[j] = swap
}
const findTarget = (arr, left, right) => {
  const flag = arr[left] //选择最左边的元素为标尺元素
  let index = left + 1 //从标尺元素后面的一个开始遍历
  for (let i = left; i <= right; i++) {
    if (arr[i] < flag) {
      swap(arr, index, i)
      index++
    }
  }
  swap(arr, left, index - 1) //把标尺元素和最后一个比标尺元素小的数交换，保证标尺元素前面的数字全部比标尺元素小
  return index
}
const fastSort = (arr, left, right) => {
  if (left < right) {
    const center = findTarget(arr, left, right)
    fastSort(arr, left, center - 1)
    fastSort(arr, center, right)
  }
}
const arr = [5, 21, 8, 4, 9, 2, 3, 12, 32, 7]
fastSort(arr, 0, arr.length - 1)
console.log(arr)