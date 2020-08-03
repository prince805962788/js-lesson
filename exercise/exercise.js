class Node {
  constructor(data) {
    this.value = data
    this.next = undefined
  }
}
class NodeList {
  constructor(arr) {
    const head = new Node(arr.shift())
    let next = head
    arr.forEach(item => {
      next.next = new Node(item)
      next = next.next
    });
  }
}

function deleteDuplicates(head) {
  if (!head || !head.next) {
    return
  }
  const dummy = new Node()
  dummy.next = head
  const cur = head
  while (cur.next || cur.next.next) {
    if (cur.next.value = cur.next.next.value) {
      const val = cur.next.value
      while (cur.next && cur.next.value === val) {
        cur.next = cur.next.next
      }
    } else {
      cur = cur.next
    }
  }
  return dummy.next;
}
