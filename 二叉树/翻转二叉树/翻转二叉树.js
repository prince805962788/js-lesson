class Node {
  constructor(data) {
    this.value = data
    this.left = this.right = undefined
  }
}
class Tree { //生成一个二叉搜索树做实验
  constructor(data) {
    let root = new Node(data.shift())
    data.forEach(item => {
      this.insert(root, item)
    });
    return root
  }
  insert(node, data) {
    if (data < node.value) {
      if (node.left === undefined) {
        node.left = new Node(data)
      } else {
        this.insert(node.left, data)
      }
    } else {
      if (node.right === undefined) {
        node.right = new Node(data)
      } else {
        this.insert(node.right, data)
      }
    }
  }
  static invertTree(root) {
    if (!root) {
      return
    }
    let right = this.invertTree(root.right)
    let left = this.invertTree(root.left)
    root.left = right
    root.right = left
    return root
  }
}
const tree = new Tree([6, 3, 5, 2, 8, 1, 7, 9])
const newTree = Tree.invertTree(tree)
console.log(newTree)