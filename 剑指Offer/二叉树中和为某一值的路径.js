// 输入一棵二叉树和一个整数，打印出二叉树中节点值的和为输入整数的所有路径。从树的根节点开始往下一直到叶节点所经过的节点形成一条路径。
// 示例:
// 给定如下二叉树，以及目标和 sum = 22，

//               5
//              / \
//             4   8
//            /   / \
//           11  13  4
//          /  \    / \
//         7    2  5   1
// 返回:
// [
//    [5,4,11,2],
//    [5,8,4,5]
// ]
let pathSum = function (root, sum) {
  // 对于每个结点都要看选不选 然后在根据结果去回溯
  let res = []
  let path = []
  if(!root) return []
  let dfs = (root, tar) => {
    // 判断结点是否为空
    if(!root) return
    path.push(root.val) 
    tar = tar - root.val
    // 对于每一个节点都要判断，如果target减为0并且为叶子节点（左右子树均为空）的时候满足要求，就存入结果数组中
    if(tar === 0 && !root.left && !root.right) {
      // 这里存放的是path的拷贝，否则path会随着元素的变化而变化
      res.push([...path]) //注意
    }
    dfs(root.left, tar)
    dfs(root.right, tar)
    path.pop()
  }
  dfs(root, sum)
  return res
};