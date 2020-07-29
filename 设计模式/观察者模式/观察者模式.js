// 定义发布者类
class Publisher {
  constructor() {
    this.observers = []
  }
  add(observer) { // 增加订阅者
    this.observers.push(observer)
  }
  remove(observer) { // 移除订阅者
    this.observer.forEach((item, index) => {
      if (item === observer) {
        this.observers.splice(index, 1)
      }
    });
  }
  notify() { // 通知所有订阅者
    this.observers.forEach(observer => {
      observer.update(this)
    })
  }
}
// 定义订阅者类
class Observer {
  constructor() {
    console.log('Observer created')
  }
  update() {
    console.log('Observer.update invoked')
  }
}
// 定义一个具体的需求文档（prd）发布类
class PrdPublisher extends Publisher {
  constructor() {
    super()
    this.prdState = null // 初始化需求文档
    this.observers = [] // 韩梅梅还没有拉群，开发群目前为空
  }
  getState() {
    return this.prdState
  }
  setState(state) {
    this.prdState = state // prd的值发生改变
    this.notify() // 需求文档变更，立刻通知所有开发者
  }
}
class DeveloperObserver extends Observer {
  constructor() {
    super()
    this.prdState = {} // 需求文档一开始还不存在，prd初始为空对象
  }
  update(publisher) { // 重写一个具体的update方法
    this.prdState = publisher.getState() // 更新需求文档
    this.work() // 调用工作函数
  }
  work() {
    const prd = this.prdState // 获取需求文档
    console.log('996 begins...')
  }
}
// 创建订阅者：前端开发李雷
const liLei = new DeveloperObserver()
// 创建订阅者：服务端开发小A（sorry。。。起名字真的太难了）
const A = new DeveloperObserver()
// 创建订阅者：测试同学小B
const B = new DeveloperObserver()
// 韩梅梅出现了
const hanMeiMei = new PrdPublisher()
// 需求文档出现了
const prd = {
  // 具体的需求内容
}
// 韩梅梅开始拉群
hanMeiMei.add(liLei)
hanMeiMei.add(A)
hanMeiMei.add(B)
// 韩梅梅发送了需求文档，并@了所有人
hanMeiMei.setState(prd)