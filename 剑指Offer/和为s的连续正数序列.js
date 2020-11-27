// 输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）。
// 序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。

// 输入：target = 9
// 输出：[[2,3,4],[4,5]]
// 示例 2：
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 大体思路是定义范围边界：左边界left和右边界right:，
// 如果当前的和sum小于target，则右移右边界--增大，
// 如果当前的和sum大于target，则右移左边界--收缩。

// 如示例target = 9
// 第一轮：left:1, right:1
// 数组[1]
// sum:0 < target
// 增大右边界：right++

// 第二轮：left:1, right:2
// 数组[1,2]
// sum:3 < target
// 增大右边界：right++
// ...
// 第四轮：left:1, right:4
// 数组[1,2,3,4]
// sum:10 > target
// 收缩左边界：left++

// 这样第五轮left:2, right:4
// 数组[2,3,4]
// sum:9 === target
// 找到正确的数组，记录下来，再收缩左边界，寻找下一个数组。

let findContinuousSequence = function (target) {
  let res = []
  let left = 1
  let right = 1
  let sum = 0
  while(left < target / 2) {
    if(sum < target) {
      sum = sum + right
      right++
    }else if(sum > target) {
      sum = sum - left
      left++
    }else {
      let arr = []
      for(let i = left; i < right; i++) {
        arr.push(i)
      }
      res.push(arr)
      sum = sum - left
      left++
    }
  }
  return res
};