// 从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。

//  

// 例如:
// 给定二叉树: [3,9,20,null,null,15,7],

//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回其层次遍历结果：

// [
//   [3],
//   [9,20],
//   [15,7]
// ]
let levelOrder = function (root) {
  if(!root) return []
  const res = []
  const queue = [root]
  let depth = 0 //深度
  while(queue.length > 0) {
    let levelNum = queue.length
    res[depth] = []
    while(levelNum > 0) {
      const item = queue.shift()
      res[depth].push(item.val)
      if(item.left) queue.push(item.left)
      if(item.right) queue.push(item.right)
      levelNum--
    }
    depth++
  }
  return res
};