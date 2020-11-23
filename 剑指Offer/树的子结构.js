// 输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)

// B是A的子结构， 即 A中有出现和B相同的结构和节点值。

// 例如:
// 给定的树 A:

//      3
//     / \
//    4   5
//   / \
//  1   2
// 给定的树 B：

//    4 
//   /
//  1
// 返回 true，因为 B 与 A 的一个子树拥有相同的结构和节点值。
let isSubStructure = function (A, B) {
  if(!A || !B) return false
  return isSubTree(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B)
};
function isSubTree (a, b) {
  // B树遍历完了，说明B是A的子结构
  if(!b) return true
  // A遍历完了，但是B还没有遍历完，那么B肯定不是A的子结构
  if(!a) return false
  if(a.val !== b.val) {
    return false
  }else {
    return isSubTree(a.left, b.left) && isSubTree(a.right, b.right)
  }
}