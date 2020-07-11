class Node {
  constructor(val) {
    this.value = val
    this.left = this.right = undefined
  }
}
class Tree {
  constructor(data) {
    let root = new Node(data.shift())
    //遍历所有的数据，逐渐插入到这课二叉搜索树中
    data.forEach(item => {
      this.insert(root, item)
    });
    return root
  }
  insert(node, data) { //创建二叉搜索树
    if (node.value > data) { //父节点数据大于值
      if (node.left === undefined) { //父节点左子树空，插入
        node.left = new Node(data)
      } else { //左子树有值，向下递归左子树
        this.insert(node.left, data)
      }
    } else { //父节点数据小于等于值
      if (node.right === undefined) { //父节点右子树空，插入
        node.right = new Node(data)
      } else { //右子树有值，向下递归右子树
        this.insert(node.right, data)
      }
    }
  }
  static walk(root) { //判断是否是搜索二叉树
    if (!root) {
      return true
    }
    if (!root.left && !root.right) {
      return true
    } else if ((root.left && root.value < root.left.value) || (root.right && root.value > root.right.value)) {
      return false
    } else {
      return Tree.walk(root.left) && Tree.walk(root.right)
    }
  }
  static isBalanced(root) { //判断是否是平衡二叉树
    let flag = true // 立一个flag，只要有一个高度差绝对值大于1，这个flag就会被置为false
    let dfs = root => {
      // 如果是空树，高度记为0；如果flag已经false了，那么就没必要往下走了，直接return
      if (!root && !flag) {
        return 0
      }
      left = dfs(root.left) // 计算左子树的高度
      right = dfs(root.right) // 计算右子树的高度
      if (Math.abs(left - right) > 1) {
        flag = false
        return 0
      }
      return Math.max(left, right) + 1 // 返回当前子树的高度
    }
    dfs(root)
    return flag
  }
  static search(root, n) { //搜索某个值
    if (!root) {
      return
    }
    if (root.value === n) {
      console.log('目标节点是：', root)
    } else if (root.value > n) { //当前节点大于n,向小的左子树查找
      this.search(root.left, n)
    } else {
      this.search(root.right, n)
    }
  }
  static delete(root, n) {
    if (!root) {
      return
    }
    if (root.value === n) {
      if (!root.left && !root.right) { // 若是叶子结点，则不需要想太多，直接删除
        root = null
      } else if (root.left) {
        const maxLeft = this.findLeftMax(root) // 寻找左子树里值最大的结点
        root.value = maxLeft.value // 用这个 maxLeft 覆盖掉需要删除的当前结点  
        this.delete(root.left, maxLeft.value) // 覆盖动作会消耗掉原有的 maxLeft 结点
      } else {
        const minRight = this.findRightMin(root)
        root.value = minRight.value
        this.delete(root.right, minRight.value)
      }
    } else if (root.value > n) {
      this.delete(root.left, n)
    } else {
      this.delete(root.right, n)
    }
  }
  static findLeftMax(root) { //寻找左子树最大值
    while (root.right) {
      root = root.right
    }
    return root
  }
  static findRightMin(root) { //寻找右子树最小值
    while (root.left) {
      root = root.left
    }
    return root
  }
}
let root = new Tree([3, 5, 7, 2, 12, 4, 13, 8, 11, 9])
let is = Tree.walk(root)
Tree.delete(root, 12)
console.log(root)