const root = {
  val: 'A',
  left: {
    val: 'B',
    left: {
      val: 'D'
    },
    right: {
      val: 'E'
    }
  },
  right: {
    val: 'C',
    right: {
      val: 'F'
    }
  }
}
// 先序遍历
const preorder = (root) => {
  if(!root) {
    return 
  }
  console.log('先序', root.val)
  preorder(root.left)
  preorder(root.right)
}
preorder(root)
//中序遍历
const inorder = (root) => {
  if(!root) {
    return
  }
  inorder(root.left)
  console.log('中序', root.val)
  inorder(root.right)
}
inorder(root)
//后序遍历
const postorder = (root) => {
  if(!root) {
    return 
  }
  postorder(root.left)  
  postorder(root.right)
  console.log('后序', root.val)  
}
postorder(root)
