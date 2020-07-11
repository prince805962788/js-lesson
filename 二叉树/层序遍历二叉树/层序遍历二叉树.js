const tree = [3, 9, 20, null, null, 15, 7]
const levelOrder = function (root) {
  console.log(123)
  // 初始化结果数组
  const res = []
  // 处理边界条件
  if (!root) {
    return res
  }
  // 初始化队列
  const queue = []
  // 队列第一个元素是根结点
  queue.push(root)
  // 当队列不为空时，反复执行以下逻辑
  while (queue.length) {
    // level 用来存储当前层的结点
    const level = []
    // 缓存刚进入循环时的队列长度，这一步很关键，因为队列长度后面会发生改变
    const len = queue.length
    // 循环遍历当前层级的结点
    for (let i = 0; i < len; i++) {
      // 取出队列的头部元素
      const top = queue.shift()
      // 将头部元素的值推入 level 数组
      level.push(top.val)
      // 如果当前结点有左孩子，则推入下一层级
      if (top.left) {
        queue.push(top.left)
      }
      // 如果当前结点有右孩子，则推入下一层级
      if (top.right) {
        queue.push(top.right)
      }
    }
    // 将 level 推入结果数组
    res.push(level)
  }
  // 返回结果数组
  return res
};
levelOrder(tree)