// 输入： s = "3[a]2[bc]"
// 输出： "aaabcbc"
// 输入： s = "abc3[cd]xyz"
// 输出： "abccdcdcdxyz"
const decodeString = (s) => {
  let str = "",
    k = "";
  let stack = [];
  for (let char of s) {
    if (char >= 0) {
      k += char;
    } else if (char === "[") {
      stack.push({
        str: str,
        k: k
      });
      str = "", k = "";
    } else if (char === "]") {
      let data = stack.pop();
      str = data.str + str.repeat(data.k);
    } else {
      str += char;
    }
  }
  return str;
};
let res = decodeString('abc3[cde]xyz')
console.log(res)