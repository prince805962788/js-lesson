# js-lesson
## 目录
[手写代码](#手写代码)

[promise实现](#promise实现)

[网络基础](#网络基础)

[vue](#vue)

[webpack](#webpack)

[数据结构](#数据结构)
- [链表](#链表)
## 手写代码
### es5继承
```
function Parent(name) {
  this.name = name
}

function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child
```
### intanceof
```
function intanceof(l, r) {
  const left = l.__proto
  const right = r.prototype
  
  while (true) {
    if (left === null) return false
    if (left === right) return true
    left = left.__proto__
  }
}
```
### new的实现
```
function New(func) {
  const res = {}
  if (func.prototype !== null) { //如果构造函数不为空
    res.__proto__ = func.prototype //实力的原形对象指向构造函数的原形
  }
  
  const args = Array.prototype.slice.call(arguments, 1) //取出除去构造函数的剩余参数
  const funcRes = func.apply(res, args) //使用构造函数func在res作用域下执行
  
  //如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，那么new表达式中的函数调用会自动返回这个新的对象。
  if (typeof funcRes === 'object' || typeof funcRes === 'null' || typeof funcRes === 'function') {
    return funcRes
  } else {
    return res
  }
}
```
### call的实现
```
Function.prototype.myCall = function (context = window) {
  context.fn = this
  const args = [...arguments].slice(1)
  const result = context.fn(...args)
  delete context.fn
  return result
}
```
### apply的实现
```
Function.prototype.myApply = function (context = window) {
  context.fn = this
  let result
  if (arguments.length >= 1) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}
```
### bind的实现
```
Function.prototype.myBind = function (context = window) {
  if (typeof this != "function") {
    throw Error("not a function")
  }
  let fn = this
  const args = [...arguments].slice(1) // Array.prototype.slice.call(arguments, 1)
  let resFn = function () {
    return fn.apply(this instanceof resFn ? this : context, args.concat(...arguments))
  }
  resFn.prototype = this.prototype
  return resFn
}
```
### reduce的实现
```
Array.prototype.myReduce = function (func, initialValue) {
  const arr = this
  //累加的结果值，如果没有传入的初始值，那么取数组的第一个为初始值
  let res = initialValue === undefined ? arr[0] : initialValue
  //开始遍历的节点位置，如果没有传入的初始值，那么从数组的第一个开始
  const startPoint = initialValue === undefined ? 1 : 0
  arr.slice(startPoint).forEach((val, index) => {
    res = func(res, val, index + startPoint, arr)
  })
  return res
}
```
### 函数柯里化
```
function curry(fn, args) {
  const length = fn.length //函数fn的参数数量
  args = args || []
  return function () {
    const newArgs = args.concat(Array.prototype.slice.call(arguments))
    if (newArgs.length < length) {
      return curry.call(this, fn, newArgs)
    } else {
      return fn.apply(this, newArgs);
    }
  }
}
```
### 防抖
```
function debounce(fn, wait) {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments) //返回当前函数所属的作用域下执行
    }, wait)
  }
}
```
### 节流
```
function throttle(fn, wait) {
  let timer = null
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
        timer = null
      }, wait)
    }
  }
}
```

### 数组扁平化
```
function platArr(arr) {
  const res = []
  const plat = arr => {
    arr.map(item => {
      Array.isArray(item) ? plat(item) : res.push(item)
    })
  }
  plat(arr)
  return res
}
```

## promise实现
```
class myPromise {
  constructor(executor) {
    this.value = undefined
    this.reason = undefined
    this.status = 'pending'
    this.resolvedCallback = []
    this.rejectedCallback = []
    let resolve = value => {
      if (this.status === 'pending') {
        this.status = 'resolved'
        this.value = value
        this.resolvedCallback.forEach(fn => {
          fn()
        })
      }
    }
    let reject = value => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.reason = value
        this.rejectedCallback.forEach(fn => {
          fn()
        })
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onFulfilled : err => {
      throw err
    }
    const promise = new myPromise((resolve, reject) => {
      if (this.status === 'resolved') {
        try {
          const x = onFulfilled(this.value)
          resolve(x)
        } catch (error) {
          reject(error)
        }
      }
      if (this.status === 'rejected') {
        try {
          const x = onRejected(this.reason)
          resolve(x)
        } catch (error) {
          reject(error)
        }
      }
      if (this.status === 'pending') {
        try {
          this.resolvedCallback.push(() => {
            try {
              const x = onFulfilled(this.value)
              resolve(x)
            } catch (error) {
              reject(error)
            }
          })
          this.rejectedCallback.push(() => {
            try {
              const x = onRejected(this.reason)
              resolve(x)
            } catch (error) {
              reject(error)
            }
          })
        } catch (error) {
          reject(error)
        }
      }
    })
    return promise
  }
}
```
## promise限制并发
```
class Limit {
  constructor (n) {
    this.limit = n
    this.count = 0
    this.queue = []
  }

  enqueue (fn) {
    // 关键代码: fn, resolve, reject 统一管理
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject })
    })
  }

  dequeue () {
    if (this.count < this.limit && this.queue.length) {
      // 等到 Promise 计数器小于阈值时，则出队执行
      const { fn, resolve, reject } = this.queue.shift()
      this.run(fn).then(resolve).catch(reject)
    }
  }

  // async/await 简化错误处理
  async run (fn) {
    this.count++
    // 维护一个计数器
    const value = await fn()
    this.count--
    // 执行完，看看队列有东西没
    this.dequeue()
    return value
  }

  build (fn) {
    if (this.count < this.limit) {
      // 如果没有到达阈值，直接执行
      return this.run(fn)
    } else {
      // 如果超出阈值，则先扔到队列中，等待有空闲时执行
      return this.enqueue(fn)
    }
  }
}

Promise.map = function (list, fn, { concurrency }) {
  const limit = new Limit(concurrency)
  return Promise.all(list.map((...args) => {
    return limit.build(() => fn(...args))
  }))
}
```
## 网络基础
### TCP 和 UDP
TCP 和 UDP 是运输层的两种协议（运输层（Transport Layer）就是负责向两台主机进程之间的通信提供通用的数据传输服务，应用进程利用该服务传送应用层报文。“通用的”是指并不针对某一个特定的网络应用，而是多种应用可以使用同一个运输层服务。）

TCP（传输控制协议）是一种面向连接的、可靠的数据传输服务。通过 TCP 协议传送数据可以无差错、不丢失、不重复、并且按序到达
- TCP 提供全双工通信，也就是说双方在连接建立之后，都可以在任何时候进行数据发送
- TCP 两端连接都设有缓存，在发送和接收时都可以利用缓存临时存放数据
- TCP 是面向字节流的

UDP（用户数据协议）是一种无连接的、不保证数据传输的可靠性的运输层协议
- UDP 无连接
- UDP 不保证可靠性，因此不需要维持复杂的链接状态
- UDP 是面向报文的
- UDP 没有拥塞控制
- UDP 支持一对一、一对多、多对一和多对多的交互通信

因为 UDP 传输速度更快、效率更高，UDP 没有拥塞控制，所以网络出现拥塞不会使源主机的发送速率降低，且直播、实时视频会议丢失一两帧内容对于应用并没有体验性的影响，因此，UDP 对于直播、实时视频会议的场景会更加适合。

TCP 如何保证传输的可靠性
- 数据包校验：如果接收端校验出包有错，则进行丢弃且不进行相应。
- 对失序数据包重排序：TCP 协议会对失序数据包进行排序，然后再交给应用层。
- 丢弃重复数据。
- 应答机制：当接收端接收到数据之后，将发送确认信息。
- 超时重发：当发送端发出数据后，它启动一个定时器，如果超出计时器的时限，将重发这个报文段。
- 流量控制：前面提到过，TCP 连接的每一方都有固定大小的缓冲空间，可防止接收端缓冲区溢出，这就是流量控制。TCP 使用可变大小的滑动窗口协议来进行流量控制。

### HTTP 1.1 是划时代的，它解决了 HTTP 1.0 时代最重要的两个大问题：

- TCP 连接无法复用，每次请求都需要重新建立 TCP 通道，也就要重复三次握手和四次挥手的情况；就是说每个 TCP 连接只能发送一个请求。
- 队头阻塞，每个请求都要过“独木桥”，桥宽为一个请求的宽度；也就是说，即使多个请求并行发出，也只能一个接一个地进行请求排队。

HTTP 1.1 的改进点“对症下药”，它引入了：

- 长连接：HTTP 1.1 支持长连接（Persistent Connection），且默认就开启了 Connection：keep-alive，这样在一个 TCP 连接上可以传送多个 HTTP 请求和响应，减少了建立和关闭连接的消耗和延迟。业界的成熟方案，如 Google 的 protobuf。
- 管线化：在长连接的基础上，管线化（HTTP Pipelining）使得多个请求使用同一个 tcp 连接使请求并按照并行方式成为可能：多个请求同时发起，无需等待上一个请求的回包。但是需要注意，管线化只是让请求并行，但并没有从根本上解决队头阻塞问题，因为响应仍然要遵循先进先出的原则，第一个请求的回包发出之后，才会响应第二个请求。同时，浏览器供应商很难实现管道，而且大多数浏览器默认禁用该特性，有的甚至完全删除了它。

除此以外，HTTP 1.1 还有一些创造性的改进，比如：

- 缓存处理
- 带宽优化及网络连接的使用，比如，range 头，支持断点续传功能，这个内容我们已经在前面的内容中进行了介绍
- 错误通知的增强，响应码的增强
- Host 头处理，请求消息中如果没有 Host 头域会报告一个错误

这么看来，HTTP 1.1 简直不要太完美！当然他还是有一些缺陷和痛点的。比如：

- 队头堵塞问题没有真正解决
- 明文传输，安全性有隐患
- header 携带内容过多，增加了传输成本
- 默认开启 keep-alive 可能会给服务端造成更大的性能压力，比如对于一次性的请求（图片 CDN 服务），在文件被请求之后还保持了不必要的连接很长时间

### HTTP 2.0 未来已来

HTTP 2.0 目标是显著改善性能，同时做到迁移透明。我们先来理解几个 HTTP 2.0 的相关前置基础概念：

- 帧：HTTP 2.0 中，客户端与服务器通过交换帧来通信，帧是基于这个新协议通信的最小单位。
- 消息：是指逻辑上的 HTTP 消息，比如请求、响应等，由一或多个帧组成。
- 流：流是连接中的一个虚拟信道，可以承载双向的消息；每个流都有一个唯一的标识符

最主要的特性如下。

- 二进制分帧
HTTP 2.0 的协议解析决定采用二进制格式，而非 HTTP 1.x 的文本格式，二进制协议解析起来更高效，这可以说是性能增强的焦点。

重点：二进制协议将通信分解为帧的方式，这些帧交织在客户端与服务器之间的双向逻辑流中，这样就使得所有通信都在单个 TCP 连接上执行，而且该连接在整个对话期间一直处于打开状态。

## vue
### vue全局概览
1. new Vue()
2. _init(调用 _init 函数进行初始化，它会初始化生命周期、事件、 props、 methods、 data、 computed 与 watch 等)(通过 Object.defineProperty 设置 setter 与 getter 函数，用来实现「响应式」以及「依赖收集」)
3. $mount (挂载组件)
4. compile编译可以分成 parse、optimize 与 generate 三个阶段，最终需要得到 render function
     - parse 会用正则等方式解析 template 模板中的指令、class、style等数据，形成AST
     - optimize 的主要作用是标记 static 静态节点，patch的过程中， diff 算法会直接跳过静态节点，从而减少了比较的过程，优化了 patch 的性能
     - generate 是将 AST 转化成 render function 字符串的过程，得到结果是 render 的字符串以及 staticRenderFns 字符串
     - 经历过 parse、optimize 与 generate 这三个阶段以后，组件中就会存在渲染 VNode 所需的 render function
5. 响应式：
     - 当 render function 被渲染的时候，因为会读取所需对象的值，所以会触发 getter 函数进行「依赖收集」，「依赖收集」的目的是将观察者 Watcher 对象存放到当前闭包中的订阅者 Dep 的 subs 中
     - 在修改对象的值的时候，会触发对应的 setter， setter 通知之前「依赖收集」得到的 Dep 中的每一个 Watcher，告诉它们自己的值改变了，需要重新渲染视图。这时候这些 Watcher 就会开始调用 update 来更新视图

## webpack
### webpack插件的写法

在 webpack 下，它推荐的插件写法是这样：
```
class MyWebpackPlugin {
  apply(compiler) {
    // 定义一个 class，其中有一个 apply 方法，
    // apply 方法接收 webpack 的 compiler 对象
  }
}
```

在插件完成后，我们就可以在配置文件中调用插件：
```
{
  plugins: [
    new MyWebpackPlugin()
  ]
}
```
webpack 在运行时，会调用我们的插件定义的 apply 方法：
```
if (Array.isArray(options.plugins)) {
  for (const plugin of options.plugins) {
    if (typeof plugin === 'function') {
      plugin.call(compiler, compiler);
    } else {
      plugin.apply(compiler);
    }
  }
}
```

## 数据结构
### 链表
#### 链表生成
```
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
}
```
#### 删除倒数第n个节点
```
removeNthFromEnd(head, n) {
  let dummy = new Node()
  dummy.next = head
  let fast = dummy
  let slow = dummy
  while(n>0){
    fast = fast.next
    n--
  }
  while(fast.next){
    fast = fast.next
    slow = slow.next
  }
  if(!fast.next){
    slow.next = slow.next.next
  }
  return dummy.next
}
```
#### 删除重复节点
```
deleteDuplicates(head) {
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
```
#### 合并两个有序链表
```
mergeTwoLists(l1, l2) {
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
```
#### 判断链表是否有环
```
isCircle(head) {
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
```
#### 反转列表
```
reverseList(head) { //迭代反转链表
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
reverseList(head) { //递归反转链表
 if (!head || !head.next) { // 链表为空或只有一个节点时，不用反转
    return head;
  }
  let newHead = NodeList.reverseList2(head.next) //当前节点反转之前，先让后续节点反转
  head.next.next = head
  head.next = null
  return newHead //newHead为新的头结点，并依次向下传递
}
```
