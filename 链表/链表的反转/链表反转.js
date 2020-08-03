class Node { //声明链表的节点
  constructor(data) {
    this.value = data
    this.next = undefined
  }
}
class NodeList { //声明链表结构
  constructor(arr) {
    let head = new Node(arr.shift())
    let next = head
    arr.forEach(item => {
      next.next = new Node(item)
      next = next.next //next指针移到下一位
    });
    return head
  }
  static reverseList(head) { //迭代反转链表
    if (head === null || head.next === null) { // 链表为空或只有一个节点时，不用反转
      return head;
    }
    let pre = null // 初始化前驱结点为 null
    let cur = head // 初始化目标结点为头结点
    while (cur) {
      let next = cur.next // 记录一下 next 结点
      cur.next = pre // 反转指针
      pre = cur // pre 往前走一步
      cur = next // cur往前走一步
    }
    return pre
  }
  static reverseList2(head) { //递归反转链表
    if (!head || !head.next) { // 链表为空或只有一个节点时，不用反转
      return head;
    }
    let newHead = NodeList.reverseList2(head.next) //当前节点反转之前，先让后续节点反转
    head.next.next = head
    head.next = null
    return newHead //newHead为新的头结点，并依次向下传递
  }
}
let list1 = new NodeList([1, 3, 5, 7])
// let list2 = NodeList.reverseList(list1)
let list3 = NodeList.reverseList2(list1)
console.log(list3)