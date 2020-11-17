let lowestCommonAncestor = (root, p, q) => {
  if(!root || root.value === q || root.value === p) return root
  let left = lowestCommonAncestor(root.left)
  let right = lowestCommonAncestor(root.right)
  if(!left ) return right
  if(!right) return left
  return root
}