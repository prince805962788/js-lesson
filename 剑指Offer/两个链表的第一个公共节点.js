let getIntersectionNode = function (headA, headB) {
  let h1 = headA;
  let h2 = headB;

  while(h1 !== h2) { // 如果相交、或者没有相交
    h1 = h1 === null ? headB : h1.next; // h1结束 接入对方
    h2 = h2 === null ? headA : h2.next;  // h2结束 接入对方
  }

  return h1;
};