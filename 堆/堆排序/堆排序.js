class heap {
  constructor(data) {
    this.data = data
  }
  static swap(arr, i, j) {
    const swap = arr[i]
    arr[i] = arr[j]
    arr[j] = swap
  }
  static maxHeapify(arr, i, size) { //构建一次最大堆的过程
    let left = i * 2 + 1 //左节点索引
    let right = i * 2 + 2 //有节点索引
    let largest = i //当前的父节点
    if (left < size && arr[left] > arr[largest]) { //如果左节点存在并且左节点大于 当前最大节点，交换位置
      largest = left
    }
    if (right < size && arr[right] > arr[largest]) { //如果右节点存在并且右节点大于 当前最大节点，交换位置
      largest = right
    }
    if (largest !== i) { //如果发现修改了，则交换位置并对子重新构建最大堆
      heap.swap(arr, largest, i)
      heap.maxHeapify(arr, largest, size) //largest所在的节点变成了小的那个一点，所以对他进行递归
    }
  }
  sort() {
    let arr = this.data
    let len = arr.length
    if (len <= 1) {
      return arr
    } else {
      for (let i = Math.floor(len / 2 - 1); i >= 0; i--) {
        heap.maxHeapify(arr, i, len) //初始化最大堆，从最后一个父节点开始，先把数组初始化为一个最大堆
      }
      for (let j = len - 1; j >= 0; j--) {
        heap.swap(arr, 0, j) //堆顶一定是最大元素，将堆顶和尾部元素交换，最大元素就保存在尾部，并且不参与后面的调整
        heap.maxHeapify(arr, 0, j) //堆顶的元素已经被替换，所以对剩下的数组重新建堆
      }
    }
    return arr
  }
  find(val, i = 0) { //查找
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
let arr = new heap([5, 4, 12, 11, 6, 8, 15, 9, 7])
arr.sort()
console.log(arr)