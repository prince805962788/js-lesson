class Subject {  // 被观察者：小宝宝
  constructor (name)  {
    this.name = name;
    this.state = "开心的";
    this.observer = [];
  }

  attach (o) {
    this.observer.push(o);
  }

  setState (newState) {
    this.state = newState;
    this.observer.forEach(o => o.update(this));
  }

}

class Observer { // 观察者：爸爸 妈妈
  constructor (name) {
    this.name = name;
  }

  update (baby) {
    console.log("当前" + this.name + "被通知了，当前小宝宝的状态是：" + baby.state);
  }
}

// 爸爸妈妈需要观察小宝宝的心理变化
let baby = new Subject("小宝宝");
let father = new Observer("爸爸");
let mother = new Observer("妈妈");

baby.attach(father);
baby.attach(mother);
baby.setState("我饿了");

