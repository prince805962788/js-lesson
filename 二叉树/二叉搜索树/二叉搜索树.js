class Node {
  constructor (val) {
    this.value = val
    this.left = this.right = undefined
  }
}
class Tree {
  constructor (data) {
    let root = new Node(data.shift())
    //遍历所有的数据，逐渐插入到这课二叉搜索树中
    data.forEach(item => {
      Tree.insert(root, item)
    });
    return root
  }
  static insert (node, data) { //创建二叉搜索树
    if (node.value > data) { //父节点数据大于值
      if (node.left === undefined) { //父节点左子树空，插入
        node.left = new Node(data)
      } else { //左子树有值，向下递归左子树
        Tree.insert(node.left, data)
      }
    } else { //父节点数据小于等于值
      if (node.right === undefined) { //父节点右子树空，插入
        node.right = new Node(data)
      } else { //右子树有值，向下递归右子树
        Tree.insert(node.right, data)
      }
    }
  }
  static walk (root) { //判断是否是搜索二叉树
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
  static isBalanced (root) { //判断是否是平衡二叉树
    let flag = true // 立一个flag，只要有一个高度差绝对值大于1，这个flag就会被置为false
    let dfs = root => {
      // 如果是空树，高度记为0；如果flag已经false了，那么就没必要往下走了，直接return
      if (!root || !flag) {
        return 0
      }
      let left = dfs(root.left) // 计算左子树的高度
      let right = dfs(root.right) // 计算右子树的高度
      if (Math.abs(left - right) > 1) {
        flag = false
        return 0
      }
      return Math.max(left, right) + 1 // 返回当前子树的高度
    }
    dfs(root)
    return flag
  }
  //重点：二叉搜索树的中序遍历序列是有序的
  static balanceBST (root) { //返回一个平衡的搜索二叉树,前提是已经是一个搜索二叉树
    // 初始化中序遍历序列数组
    const nums = []
    // 定义中序遍历二叉树，得到有序数组
    let inorder = root => {
      if (!root) {
        return
      }
      inorder(root.left)
      nums.push(root.value)
      inorder(root.right)
    }
    let buildAVL = (low, high) => {
      if (low > high) {
        return null
      }
      // 取数组的中间值作为根结点值
      const mid = Math.floor(low + (high - low) / 2)
      // 创造当前树的根结点
      const cur = new Node(nums[mid])
      // 构建左子树
      cur.left = buildAVL(low, mid - 1)
      // 构建右子树
      cur.right = buildAVL(mid + 1, high)
      // 返回当前树的根结点 
      return cur
    }
    inorder(root)
    console.log(nums)
    return buildAVL(0, nums.length - 1)
  }
  static search (root, n) { //搜索某个值
    if (!root) {
      return
    }
    if (root.value === n) {
      console.log('目标节点是：', root)
    } else if (root.value > n) { //当前节点大于n,向小的左子树查找
      Tree.search(root.left, n)
    } else {
      Tree.search(root.right, n)
    }
  }
  static delete (root, n) {
    if (!root) {
      return
    }
    if (root.value === n) {
      if (!root.left && !root.right) { // 若是叶子结点，则不需要想太多，直接删除
        root = null
      } else if (root.left) {
        const maxLeft = Tree.findLeftMax(root.left) // 寻找左子树里值最大的结点
        root.value = maxLeft.value // 用这个 maxLeft 覆盖掉需要删除的当前结点  
        Tree.delete(root.left, maxLeft.value) // 覆盖动作会消耗掉原有的 maxLeft 结点
      } else {
        const minRight = Tree.findRightMin(root.right)
        root.value = minRight.value
        Tree.delete(root.right, minRight.value)
      }
    } else if (root.value > n) {
      Tree.delete(root.left, n)
    } else {
      Tree.delete(root.right, n)
    }
  }
  static findLeftMax (root) { //寻找左子树最大值
    while (root.right) {
      root = root.right
    }
    return root
  }
  static findRightMin (root) { //寻找右子树最小值
    while (root.left) {
      root = root.left
    }
    return root
  }
}
let root = new Tree([5, 2, 3, 7, 1, 4, 9, 8])
// console.log(root)
// let is = Tree.walk(root)
let newTree = Tree.balanceBST(root)
// Tree.delete(root, 12)
console.log(newTree)