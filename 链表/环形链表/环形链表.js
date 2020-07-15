//真题描述：给定一个链表，判断链表中是否有环。
class Node {
  constructor(data) {
    this.value = data
    this.next = undefined
  }
}
class NodeList {
  constructor(arr) {
    let head = new Node(arr.shift())
    let next = head
    arr.forEach(item => {
      next.next = new Node(item)
      next = next.next
    });
    return head
  }
  static isCircle(head) { //判断是否是环形链表
    while (head) {
      if (head.flag) {
        return head // 如果 flag 已经立过了，那么说明环存在,并返回环形链表所在的节点
      } else {
        head.flag = true // 如果 flag 没立过，就立一个 flag 再往
        head = head.next
      }
    }
    return false
  }
}
let list = new NodeList([3, 2, 1, 0, 4])