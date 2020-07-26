class Node {
  constructor(data) {
    this.value = data
    this.next = null
  }
}
class NodeList {
  constructor(arr) {
    const head = new Node(arr.shift())
    const next = head
    arr.map(item => {
      next.next = new Node(item)
      next = next.next
    })
  }
}