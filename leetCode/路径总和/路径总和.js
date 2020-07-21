//给定如下二叉树，以及目标和 sum = 22，
//       5
//      / \
//     4   8
//    /   / \
//   11  13  4
//  /  \      \
// 7    2      1
//返回 true, 因为存在目标和为 22 的根节点到叶子节点的路径 5->4->11->2。
class Node {
  constructor(data) {
    this.val = data
    this.left = this.right = undefined
  }
}
class NodeList {
  constructor(arr) { //层序构建二叉树
    if (!arr || arr.length === 0) {
      return
    }
    let root = new Node(arr.shift())
    let queue = [root] //保存已生成节点的队列
    while (arr.length > 0) {
      let node = queue.shift() //取出已经生成的节点队列的第一个，对他进行子节点赋值
      let leftVal = arr.shift()
      if (leftVal !== null) {
        node.left = new Node(leftVal)
        queue.push(node.left)
      }
      let rightVal = arr.shift()
      if (rightVal !== null) {
        node.right = new Node(rightVal)
        queue.push(node.right)
      }
    }
    return root
  }
  static hasPathSum = (root, sum) => {
    if (!root) return false //如果不存在，表示不是叶子节点
    if (!root.left && !root.right) return sum - root.val === 0
    return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val)
  };
}