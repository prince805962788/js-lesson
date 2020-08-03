// 给定一个字符串， 验证它是否是回文串， 只考虑字母和数字字符， 可以忽略字母的大小写。

// 说明： 本题中， 我们将空字符串定义为有效的回文串。

// 示例 1:

//   输入: "A man, a plan, a canal: Panama"
// 输出: true
// 示例 2:

//   输入: "race a car"
// 输出: false
const isPalindrome = function (s) {
  if (s.length === 0 || s.length === 1) return true
  const str = s.replace(/[^A-Za-z0-9]/g, '').toLowerCase() //正则匹配+转小写
  for (let i = 0; i < (str.length - 1) / 2; i++) {
    if (str[i] !== str[str.length - 1 - i]) return false
  }
  return true
};
let res = isPalindrome('"ab_a"')
console.log(res)