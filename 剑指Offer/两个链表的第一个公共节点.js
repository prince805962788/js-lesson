// 解题思路：
// 先判空，如果两个节点有null值则直接返回null。
// 使用双指针法解这种题，本质上就是两个节点齐头并进，在一个节点走到尽头后，
// 定位到另一个节点初，然后循环走下去，如果有交叉节点，最终总会走到同一个节点的，
// 可以理解成小学的时候学的追逐问题，只是时间的多少。但是如果没有交叉节点，
// 最终两个节点会同时走到null，然后将跳出循环，最后返回null即可。
let getIntersectionNode = function (headA, headB) {
  let h1 = headA;
  let h2 = headB;

  while(h1 !== h2) { // 如果相交、或者没有相交
    h1 = h1 === null ? headB : h1.next; // h1结束 接入对方
    console.log(h1)
    h2 = h2 === null ? headA : h2.next;  // h2结束 接入对方
    console.log(h2)
  }

  return h1;
};