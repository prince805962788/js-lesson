// 如果p和q分别是root的左右节点， 那么root就是我们要找的最近公共祖先
// 如果root是None， 说明我们在这条寻址线路没有找到， 我们返回None表示没找到
// 我们继续在左右子树执行相同的逻辑。
// 如果左子树没找到， 说明在右子树， 我们返回lowestCommonAncestor(root.right, p, q)
// 如果右子树没找到， 说明在左子树， 我们返回lowestCommonAncestor(root.left, p, q)
// 如果左子树和右子树分别找到一个， 我们返回root
//       3
//     /   \
//    5     1
//   / \   / \
//  6   2 0   8
//     / \
//    7   4
let lowestCommonAncestor = (root, p, q) => {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q); //在左子树中寻找这个节点
  const right = lowestCommonAncestor(root.right, p, q); //在右子树中寻找这个节点
  if (!left) return right; // 左子树找不到，返回右子树
  if (!right) return left; // 右子树找不到，返回左子树
  return root; //当左子树也存在目标节点，右子树也存在目标节点，返回这个节点
};