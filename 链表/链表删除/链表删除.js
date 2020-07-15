//真题描述：给定一个排序链表，删除所有含有重复数字的结点，只保留原始链表中 没有重复出现的数字。
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
  static deleteDuplicates(head) { //删除重复节点
    // 极端情况：0个或1个结点，则不会重复，直接返回
    if (!head || !head.next) {
      return
    }
    let dummy = new Node() // dummy 永远指向头结点
    dummy.next = head
    let cur = dummy
    while (cur.next && cur.next.next) { // 当 cur 的后面有至少两个结点时，第一个cur.next是头结点
      if (cur.next.value === cur.next.next.value) {
        let val = cur.next.value // 若值重复，则记下这个值
        while (cur.next && cur.next.value === val) { //开始遍历删除这个值
          cur.next = cur.next.next
        }
      } else {
        cur = cur.next //正常遍历
      }
    }
    return dummy.next;
  }
  static removeNthFromEnd(head, n) { //删除倒数第n个节点
    let dummy = new Node()
    dummy.next = head
    let fast = dummy
    let slow = dummy
    while (n !== 0) {
      fast = fast.next
      n--
    }
    while (fast.next) {
      fast = fast.next
      slow = slow.next
    }
    if (!fast.next) {
      slow.next = slow.next.next
    }
    return dummy.next
  }
}
let nodeList = new NodeList([1, 2, 2, 3, 4, 4, 5, 6])
// NodeList.deleteDuplicates(nodeList)
// NodeList.removeNthFromEnd(nodeList, 2)
console.log(nodeList)