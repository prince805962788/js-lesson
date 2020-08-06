//二分查找的前提为： 数组、 有序
function binarySearch(target, arr) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    var mid = parseInt(start + (end - start) / 2);
    if (target == arr[mid]) {
      return mid;
    } else if (target > arr[mid]) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1;
}