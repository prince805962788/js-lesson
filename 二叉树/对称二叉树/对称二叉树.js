//二叉树的节点定义
class Node {
  constructor(val) {
    this.value = val
    this.left = this.right = undefined
  }
}
class Tree {
  constructor(data) {
    //临时存储所有节点，方便寻找父子节点
    let nodeList = []
    //顶节点
    let root
    for (let i = 0; i < data.length; i++) {
      let node = new Node(data[i])
      nodeList.push(node)
      if (i > 0) {
        //计算当前节点属于那一层
        let n = Math.floor(Math.log2(i + 1)) //2的n次方+1就是当前层第二个节点，所以当前层是当前位置的2的对数
        //当前层的起始节点
        let start = Math.pow(2, n) - 1 //2的n次方-1就是当前层的第一个节点，n是层数
        //找到当前节点的父节点，Math.pow(2, n - 1) - 1为上一次起始节点
        //当前层节点数是上一层的2倍，所以当前节点和当前层顶点的距离是上一层父节点到顶点距离的2倍
        let parentIndex = Math.floor((i - start) / 2) + Math.pow(2, n - 1) - 1
        let parent = nodeList[parentIndex]
        //将当前节点与上一层父节点做关联
        if (parent.left) {
          parent.right = node
        } else {
          parent.left = node
        }
      }
    }
    root = nodeList.shift()
    nodeList = []
    return root
  }
  static isSummetry(root) { //镜像对比
    if (!root) {
      return true
    }
    let walk = (left, right) => {
      if (!left || !right) { //终止条件
        return true
      }
      if ((!left && right) || (left && !right) || (left.val !== right.val)) {
        return false
      }
      return walk(left.left, right.right) && walk(left.right, right.left)
    }
  }
}
const root = new Tree([1, 2, 2, 3, 4, 4, 3])
console.log(root)