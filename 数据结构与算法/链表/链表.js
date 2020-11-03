class Node {
	constructor(element){
		this.element = element
		this.next = null
	}
}
class LinkedList {
	constructor(){
		this.head = new Node('head')
	}
	//根据value查找节点
	findByValue(value){
		let currentNode = this.head
		while(currentNode && currentNode.element !== value){ //当前节点存在并且不等于查找的value，那么向下查找
			currentNode = currentNode.next
		}
		return currentNode ? currentNode : -1
	}
	//根据index查找节点
	findByIndex(index){
		let currentNode = this.head
		let pos = 0
		while(currentNode && index !== pos ){
			currentNode = currentNode.next
			pos++
		}
		return currentNode ? currentNode : -1
	}
	// 向链表末尾追加节点
	append(newElement) {
		const newNode = new Node(newElement)
		let currentNode = this.head
		while(currentNode.next) {
			currentNode = currentNode.next
		}
		currentNode.next = newNode
	}
	// 指定元素向后插入
	insert(newElement, element){
		const currentNode = this.findByValue(element)
		if(currentNode < 0){
			console.log('未找到')
			return
		}
		const newNode = new Node(newElement)
		newNode.next = currentNode.next
		currentNode.next = newNode
	}
	//查找前一个
	findPrev(value){
		let currentNode = this.head
		while(currentNode.next && currentNode.next.element !== value){
			currentNode = currentNode.next
		}
		return currentNode.next ? currentNode : -1
	}
	//根据值去删除
	remove(value){
		const desNode = this.findByIndex(value) //找到删除的点
		if(desNode < 0){
			console.log('未找到')
			return
		}
		const preNode = this.findPrev(value) //找到要删除点的前驱节点
		preNode.next = preNode.next.next
	}
	// 遍历显示所有节点
	display() {
		//先检查是否为环
		if(this.checkCircle()) return false
		let currentNode = this.head
		while (currentNode !== null) {
			console.log(currentNode.element)
			currentNode = currentNode.next
		}
	}
	//反转单链表(迭代的方式)
	reverseList(){
		if(!this.head || !this.head.next){ //为空或者只有一个
			return
		}
		let pre = null // 初始化前驱结点为 null
		let cur = this.head // 初始化目标结点为头结点
		while (cur) {
			let next = cur.next // 记录一下 next 结点
			cur.next = pre // 反转指针
			pre = cur // pre 往前走一步
			cur = next // cur往前走一步
		}
		this.head = pre
	}
	//反转单链表(递归的方式)
	reverseList2(){
		function reverse() {
			if(!this.head || !this.head.next){ //为空或者只有一个
				return
			}
			let newHead = reverse(this.head.next)
			this.head.next.next = this.head
			this.head.next = null
			return newHead
		}
		reverse(this.head)
	}
	// 环验证
	checkCircle() {
		let cur = this.head
		while(cur){
			if(cur.flag){
				return true // 如果 flag 已经立过了，那么说明环存在
			}else {
				cur.flag = true // 如果 flag 没立过，就立一个 flag
				cur = cur.next
			}
		}
		return false
	}
	// 删除倒数第k个节点
	removeByIndexFromEnd(index){
		if(this.checkCircle) return false //先判断是否是环形链表
		const dummy = new Node() //设置一个dummy节点，永远指向head头节点
		dummy.next = this.head
		let fast = dummy //快慢指针都从头节点开始
		let slow = dummy
		while(index>0){
			fast = fast.next
			index--
		}
		while(fast.next){
			fast = fast.next
			slow = slow.next
		}
		slow.next = slow.next.next
	}
	//合并两个有序链表(迭代的方式)
	static mergeSortedLists(listA,listB){
		if(!listA) return listA
		if(!listB) return listB
		let a = listA
		let b = listB
		let resultHead = null //结果链表的头结点
		if(a.element < b.element){
			resultHead = a
			a = a.next
		}else {
			resultHead = b
			b = b.next
		}
		let currentNode = resultHead//设置当前节点
		while(a && b){
			if(a.element < b.element){
				currentNode.next = a //当前节点的下一个节点指向a
				a = a.next
			}else {
				currentNode.next = b//当前节点的下一个节点指向b
				b = b.next
			}
			currentNode = currentNode.next //当前节点向下走
		}
		//如果a或者b还有剩余节点
		if(a){ 
			currentNode.next = a
		}else {
			currentNode.next = b
		}
		return resultHead
	}
	//合并两个有序链表(递归的方式)
	static mergeSortedLists2(listA,listB){
		if(!listA) return listB
		if(!listB) return listA
		let head = new Node()
		if(listA.element < listB.element){
			head = listA
			listA.next = LinkedList.mergeSortedLists2(listA.next,listB)
		}else {
			head = listB
			listB.next = LinkedList.mergeSortedLists2(listA,listB.next)
		}
		return head
	}
}

// Test
const LList = new LinkedList()
LList.insert('chen', 'head')
LList.insert('curry', 'chen')
LList.insert('sang', 'curry')
LList.insert('zhao', 'sang')
console.log('-------------start reverse------------')
LList.reverseList()
LList.display()
console.log('-------------check circle------------')
console.log(LList.checkCircle())
console.log('-------------remove the one before last ------------')
LList.removeByIndexFromEnd(2)
LList.display()

const sortedList1 = new LinkedList()
sortedList1.insert(9, 'head')
sortedList1.insert(8, 'head')
sortedList1.insert(7, 'head')
sortedList1.insert(6, 'head')
const sortedList2 = new LinkedList()
sortedList2.insert(21, 'head')
sortedList2.insert(20, 'head')
sortedList2.insert(19, 'head')
sortedList2.insert(18, 'head')
console.log('-------------sort two list ------------')
let sortedList = LinkedList.mergeSortedLists2(sortedList1.head.next, sortedList2.head.next)
while (sortedList !== null) {
	console.log(sortedList.element)
	sortedList = sortedList.next
}