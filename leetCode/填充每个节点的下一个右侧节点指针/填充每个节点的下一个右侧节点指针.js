let connect = (root) => {
  if (!root) {
    return null
  }
  let arr = [root]
  while (arr.length > 0) {
    let n = arr.length //当前层的长度
    while (n > 0) {
      n--
      let node = arr.shift()
      if (n === 0) {
        node.next = null
      } else {
        node.next = arr[0]
      }
      if (node.left) {
        arr.push(node.left)
      }
      if (node.right) {
        arr.push(node.right)
      }
    }
  }
  return root
};