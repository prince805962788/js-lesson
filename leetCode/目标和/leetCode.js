// 输入：nums: [1, 1, 1, 1, 1], S: 3
// 输出：5
// 解释：

// -1+1+1+1+1 = 3
// +1-1+1+1+1 = 3
// +1+1-1+1+1 = 3
// +1+1+1-1+1 = 3
// +1+1+1+1-1 = 3

// 一共有5种方法让最终目标和为3。
let findTargetSumWays = (nums, S) => {
  let n = 0
  const loop = (index, sum) => {
    if (nums.length > index) {
      loop(index + 1, sum + nums[index])
      loop(index + 1, sum - nums[index])
    } else {
      sum === S && n++
    }
  }
  loop(0, 0)
  return n
};

// 动态规划版本
//我们用 dp[i][j] 表示用数组中的前 i 个元素， 组成和为 j 的方案数。 考虑第 i 个数 nums[i]， 它可以被添加 + 或 - ，因此状态转移方程如下：
//状态转移方程：dp[i][j] = dp[i-1][j-nums[i]] + dp[i-1][j+nums[i]]
// dp[0][0 - num[0]] = dp[0][-1] = 1
// dp[0][0 + num[0]] = dp[0][1] =1
let findTargetSumWays = (nums, S) => {
  var len = nums.length
  var dp = new Array(len)
  for (let i = 0; i < len; i++) {
    dp[i] = new Array(2 * 1000 + 1)
    dp[i].fill(0)
  }
  dp[0][0 - nums[0] + 1000] = 1
  dp[0][0 + nums[0] + 1000] += 1


  for (let i = 1; i < len; i++) {
    for (let j = -1000; j <= 1000; j++) {

      dp[i][j + nums[i] + 1000] += dp[i - 1][j + 1000]
      dp[i][j - nums[i] + 1000] += dp[i - 1][j + 1000]

    }

  }
  return S > 1000 ? 0 : dp[len - 1][S + 1000]

};