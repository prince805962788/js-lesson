// 输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历结果。如果是则返回 true，否则返回 false。假设输入的数组的任意两个数字都互不相同。
// 参考以下这颗二叉搜索树：
//      5
//     / \
//    2   6
//   / \
//  1   3
// 示例 1：

// 输入: [1,6,3,2,5]
// 输出: false
// 示例 2：

// 输入: [1,3,2,6,5]
// 输出: true
let verifyPostorder = function (postorder) {
  // 获取长度
  const length = postorder.length
  // 二叉搜索树定义：一颗空树 或 只有一个节点的树
  if (length <= 1) return true
  // 根节点，根据规律可得最后一个元素为根节点
  const root = postorder[length - 1]
  // 找到当前迭代中的左子树 & 右子树分割下标
  const index = postorder.findIndex((item) => item > root)
  // 当前迭代 左子树
  const left = postorder.slice(0, index)
  // 当前迭代 右子树
  const right = postorder.slice(index, length - 1)
  // 当前迭代 左子树、右子树 是否同时满足二叉搜索树的规则：即左子树所有节点都小于根节点、右子树所有节点都大于根节点
  const isBothVerfied = left.every(item => item < root) && right.every(item => item >= root)
  // 满足规则则继续校验当前迭代的左子树节点和右子树节点
  return isBothVerfied && verifyPostorder(left) && verifyPostorder(right)
};