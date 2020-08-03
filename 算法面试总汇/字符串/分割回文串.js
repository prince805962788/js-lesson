// 给定一个字符串 s， 将 s 分割成一些子串， 使每个子串都是回文串。

// 返回 s 所有可能的分割方案。

// 示例:

// 输入: "aab"
// 输出: [
//   ["aa", "b"],
//   ["a", "a", "b"]
// ]

var partition = function (s) {
  // 定义是否为回文字符串
  const isPalidrome = (str) => {
    let left = 0
    let right = str.length - 1
    while (left < right) {
      if (str.charAt(left) !== str.charAt(right)) return false
      right--
      left++
    }
    return true
  }

  // 定义回溯算法
  const backTrack = (res, str, tempRes) => {
    // 需要注意，这里必须是 tempRes 的拷贝
    if (str.length === 0) {
      res.push([...tempRes])
    }
    for (let i = 1; i <= str.length; i++) {
      if (isPalidrome(str.substring(0, i))) { //如果到i这里是回文子串
        tempRes.push(str.substring(0, i))
        backTrack(res, str.substring(i, str.length), tempRes)
        // 返回上一次递归时，需要去除这次递归的回文子串
        tempRes.pop()
      }
    }
  }
  let res = []
  backTrack(res, s, [])
  return res
};
console.log(partition('aab'))