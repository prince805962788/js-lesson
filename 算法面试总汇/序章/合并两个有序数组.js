// 给你两个有序整数数组 nums1 和 nums2， 请你将 nums2 合并到 nums1 中， 使 nums1 成为一个有序数组。

// 说明:

//   初始化 nums1 和 nums2 的元素数量分别为 m 和 n。
// 你可以假设 nums1 有足够的空间（ 空间大小大于或等于 m + n） 来保存 nums2 中的元素。

// 示例:

//   输入:
//   nums1 = [1, 2, 3, 0, 0, 0], m = 3
// nums2 = [2, 5, 6], n = 3

// 输出: [1, 2, 2, 3, 5, 6]
const merge = function (nums1, m, nums2, n) {
  if (m === 0) return nums2
  if (n === 0) return nums1
  let count = m + n
  while (m > 0 && n > 0) {
    if (nums1[m - 1] > nums2[n - 1]) {
      nums1[count - 1] = nums1[m - 1]
      m--
    } else {
      nums1[count - 1] = nums2[n - 1]
      n--
    }
    count--
  }
  return nums1
};
const nums1 = [0]
const nums2 = [1]
let res = merge(nums1, 0, nums2, 1)
console.log(res)