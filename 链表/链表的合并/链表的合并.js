class Node { //声明链表的节点
  constructor (data) {
    this.value = data
    this.next = undefined
  }
}
class NodeList { //声明链表结构
  constructor (arr) {
    let head = new Node(arr.shift())
    let next = head
    arr.forEach(item => {
      next.next = new Node(item)
      next = next.next //next指针移到下一位
    });
    return head
  }
  static mergeTwoLists (l1, l2) { //合并两个有序链表
    if (!l1) return l2
    if (!l2) return l1
    let head = new Node()
    if (l1.value < l2.value) {
      head = l1
      l1.next = NodeList.mergeTwoLists(l1.next, l2)
    } else {
      head = l2
      l2.next = NodeList.mergeTwoLists(l1, l2.next)
    }
    return head
  }
}
let list1 = new NodeList([1, 3, 5, 7])
let list2 = new NodeList([2, 4, 6, 8])
let list3 = NodeList.mergeTwoLists(list1, list2)
console.log(list3)