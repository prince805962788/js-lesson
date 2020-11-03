// 冒泡排序
const bubbleSort = (arr) => {
  if(arr.length <= 1) return
  const len = arr.length
  for(let i = 0; i < len; i++) {
    // 提前退出冒泡循环的标志位
    let hasChange = false
    //每次对相邻的2个数做对比，把大的放到后面，这样每一轮下来，最大的都在最后一位，就完成了冒泡排序
    for(let j = 0; j < len - i - 1; j++) { 
      if(arr[j] > arr[j + 1]) {
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
        hasChange = true
      }
    }
    //如果标记依然是false，就说明这一次循环没有出现位置交换，那么就已经完成排序，后续的交换也不需要了，直接跳出循环
    if(!hasChange) break
  }
}
// 插入排序
const insertionSort = (arr) => {
  if(arr.length <= 1) return
  for(let i = 1; i < arr.length; i++) {
    const temp = arr[i]
    // 若arr[i]前有大于arr[i]的值，向后移位，腾出空间，直到一个<=arr[i]的值
    let j = i - 1
    //循环i前面的有序数列，如果有数的大约他，这个大于他的数就向后移动一位，直到没有大于他的数的位置，然后插入到这里
    for(j; j >= 0; j--) {
      if(arr[j] > temp) {
        arr[j + 1] = arr[j]
      }else {
        break
      }
    }
    //把这个值插入到这里
    arr[j + 1] = temp
  }
}
//选择排序
const selectionSort = (arr) => {
  if(arr.length <= 1) return
  for(let i = 0; i < arr.length; i++) {
    let minIndex = i
    for(let j = i + 1; j < arr.length; j++) {
      if(arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    const temp = arr[minIndex]
    arr[minIndex] = arr[i]
    arr[i] = temp
  }
}

const test = [4, 5, 6, 3, 2, 1]
bubbleSort(test)
const testSort = [4, 1, 6, 3, 2, 1]
insertionSort(testSort)
const testSelect = [4, 8, 6, 3, 2, 1, 0, 12]
selectionSort(testSelect)
console.log(testSelect)