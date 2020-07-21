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
  static levelOrder(root) { //层序遍历二叉树
    const res = []
    if (!root) {
      return
    }
    const queue = [root]
    while (queue.length > 0) {
      const top = queue.shift()
      res.push(top.val)
      if (top.left) {
        queue.push(top.left)
      }
      if (top.right) {
        queue.push(top.right)
      }
    }
    return res
  }
  static maxDepth(root) {
    if (!root) {
      return 0
    }
    const leftDepth = NodeList.maxDepth(root.left)
    const rightDepth = NodeList.maxDepth(root.right)
    return Math.max(leftDepth, rightDepth) + 1
  }
}
let tree = new NodeList([3, 9, 20, null, null, 15, 7])
console.log('tree', tree)
let depth = NodeList.maxDepth(tree)
console.log('depth', depth)
let arr = NodeList.levelOrder(tree)
console.log('arr', arr)