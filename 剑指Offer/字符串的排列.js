// 输入一个字符串，打印出该字符串中字符的所有排列。
// 你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。
// 示例:

// 输入：s = "abc"
// 输出：["abc","acb","bac","bca","cab","cba"]
let permutation = function (s) {
  const res = [];
  const visit = [];
  function dfs (path) {
    if (path.length === s.length) {
      res.push(path);
      console.log(visit)
    }
    for (let i = 0; i < s.length; i++) {
      if (visit[i]) continue; //当前这个元素已经被访问过
      visit[i] = true;
      dfs(path + s[i])
      visit[i] = false;
    }
  }
  dfs('');
  return [...new Set(res)]
};
permutation('abc')