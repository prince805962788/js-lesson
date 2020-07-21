//中序后序生成
// 前序遍历 preorder = [3, 9, 20, 15, 7]
// 中序遍历 inorder = [9, 3, 15, 20, 7]
// 后序遍历 postorder = [9, 15, 7, 20, 3]
// 返回如下
//   3
//  / \
// 9  20
//   /  \
//  15   7
class Node {
  constructor(data) {
    this.val = data
    this.left = this.right = undefined
  }
}
//中序后序生成
let buildTree = (inorder, postorder) => {
  if (inorder.length === 0 || postorder.length === 0) {
    return null
  }
  let root = new Node(postorder[postorder.length - 1]) //后序遍历中，从后向前依次是子节点和父节点
  let mid = inorder.indexOf(root.val) //在中序列表中找到根节点坐在的下标
  root.left = buildTree(inorder.slice(0, mid), postorder.slice(0, mid)) //中序遍历中，i之前的都是左边节点的列表，i之后不包括i都是右边的列表，并且i这个点已经用掉，所以也不参加后续
  root.right = buildTree(inorder.slice(mid + 1), postorder.slice(mid, postorder.length - 1)) //后续遍历中，i之前的都是左边的节点列表，i之后包括i都是右边的列表，并且后续遍历的最后一个已经去除不参加后续
  return root
};
let tree = buildTree([9, 3, 15, 20, 7], [9, 15, 7, 20, 3])
console.log(tree)

//前序中序生成
// 思路
// 前序遍历： 根 - 左 - 右
// 中序遍历： 左 - 根 - 右
// 因此
// 对于preorder， 每个首元素即为一个子树的根元素
// 对于inorder， 查找preorder中的根元素
// 左边为preorder当前根元素的左子树
// 右边为preorder当前根元素的右子树
let buildTree = (preorder, inorder) => {
  if (preorder.length === 0 || inorder.length === 0) {
    return null
  }
  let root = new Node(preorder[0])
  let mid = inorder.indexOf(root.val)
  root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid)) //1到mid+1是根元素的左边
  root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1)) //mid+1到结尾是根元素的右边
  return root
}