// 给定一个非空字符串 s 和一个包含非空单词列表的字典 wordDict， 判定 s 是否可以被空格拆分为一个或多个在字典中出现的单词。

// 说明：

// 拆分时可以重复使用字典中的单词。
// 你可以假设字典中没有重复的单词。
// 示例 1：

// 输入: s = "leetcode", wordDict = ["leet", "code"]
// 输出: true
// 解释: 返回 true 因为 "leetcode"
// 可以被拆分成 "leet code"。
// 示例 2：

// 输入: s = "applepenapple", wordDict = ["apple", "pen"]
// 输出: true
// 解释: 返回 true 因为 "applepenapple"
// 可以被拆分成 "apple pen apple"。
// 注意你可以重复使用字典中的单词。
// 示例 3：

// 输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
// 输出: false
const wordBreak = function (s, wordDict) {
  const wordSet = new Set(wordDict); // 转成Set 
  const check = (s, wordSet, start) => { // 检查从start开始的子串是否满足要求
    if (start > s.length - 1) return true; // 指针越界，结束递归
    for (let end = start + 1; end <= s.length; end++) { // 固定start 考察所有的end
      const word = s.slice(start, end); // 前缀单词
      if (wordSet.has(word) && check(s, wordSet, end)) { // 如果是单词表里的
        return true; // 且递归剩余子串的结果是true，则返回true
      }
    }
    return false; // end从start+1到末尾，都没返回true，则返回false
  };
  return check(s, wordSet, 0); // dfs入口
};