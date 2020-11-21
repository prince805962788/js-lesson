// 地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。
// 一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），
// 也不能进入行坐标和列坐标的数位之和大于k的格子。例如，当k为18时，机器人能够进入方格 [35, 37] ，
// 因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。请问该机器人能够到达多少个格子？
// 输入：m = 2, n = 3, k = 1
// 输出：3

/**
 * 计算数字 n 的数位之和
 * @param {number} n
 * @return {number}
 */
let movingCount = function (m, n, k) {
  let count = 0 //计数
  let map = new Map()
  let dfs = (i, j) => {
    if(i < 0 || i >= m || j < 0 || j >= n) return false
    const sum = (i + '' + j).split('').reduce((pre, cur) => Number(pre) + Number(cur))
    // 当该点还没走过 和 满足 不大于k 时 继续执行
    if(sum <= k && !map.has(i + '-' + j)) {
      count++
      map.set(i + '-' + j, true) // 标识该点已经走过, 下次不进
      // 当前的继续 上下左右 走
      dfs(i + 1, j)
      dfs(i, j + 1)
      dfs(i - 1, j)
      dfs(i, j - 1)
    }
  }

  dfs(0, 0)
  return count
};
console.log(movingCount(38, 15, 9))