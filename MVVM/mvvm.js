// 创建一个Mvvm构造函数
function Mvvm(options = {}) {
  this.$options = options // vm.$options Vue上是将所有属性挂载到上面
  let data = this._data = this.$options.data
  //数据代理
  observe(data)
  //把当前data的值代理到this上，可以直接用mvvm.a.b的形式获取数据
  for (let key in data) {
    Object.defineProperty(this, key, {
      configurable: true,
      get() {
        return this._data[key]; // 访问返回data中的值
      },
      set(newVal) {
        this._data[key] = newVal;
      }
    })
  }
  Compile(options.el, this)//解析模板
}

//----------------------------------------------------------------------------------------------
//判断并数据劫持
function observe(data) {
  if (!data || typeof data !== 'object') return
  Observe(data)
}
// 创建一个Observe构造函数,写数据劫持的主要逻辑
function Observe(data) {
  let dep = new Dep()
  for (let key in data) {
    let val = data[key]
    observe(val) // 递归继续向下找，实现深度的数据劫持
    Object.defineProperty(data, key, {
      configurable: true,
      get() {
        Dep.Target && dep.addSub(Dep.Target)// Dep.Target不为null时，将watcher添加到订阅事件中 [watcher]
        return val
      },
      set(newVal) {
        if (newVal === val) {
          return
        }
        val = newVal //把新的值赋值给val
        observe(newVal) //对新的值重新数据劫持
        dep.notify()
      }
    })
  }
}

//----------------------------------------------------------------------------------------------
//数据编译
function Compile(el, vm) { //el为挂载的容器id，vm为mvvm当前的内容
  // 将el挂载到实例上方便调用
  vm.$el = document.querySelector(el)
  let fragment = document.createDocumentFragment()
  while (vm.$el.firstChild) {
    fragment.appendChild(vm.$el.firstChild);    // 循环将el中的内容放入内存中
  }
  //模板解析
  function replace(frag){
    Array.from(frag.childNodes).forEach(node=>{
      let txt = node.textContent
      let reg = /\{\{(.*?)\}\}/g;   // 正则匹配{{}}
      if(node.nodeType === 3 && reg.test(txt)){// 即是文本节点又有大括号的情况{{}}
        function replaceTxt() {
          node.textContent = txt.replace(reg, (matched, placeholder) => {   
              //console.log(placeholder);   // 匹配到的分组 如：song, album.name, singer...
              new Watcher(vm, placeholder, replaceTxt);   // 监听变化，进行匹配替换内容
              
              return placeholder.split('.').reduce((val, key) => {
                  return val[key]; 
              }, vm)
          })
        }
        // 替换
        replaceTxt()
      }
      // 如果还有子节点，继续递归replace
      if(node.childNodes && node.childNodes.length>0){
        replace(node)
      }
    })
  }
  replace(fragment);  // 替换内容
  vm.$el.appendChild(fragment)
}

//----------------------------------------------------------------------------------------------
// 发布订阅模式  订阅和发布 如[fn1, fn2, fn3]
class Dep {
  static Target = null//当前正在处理的目标
  constructor(){
    this.subs = []// 一个数组(存放函数的事件池)
  }
  addSub(sub){
    this.subs.push(sub)
  }
  notify(){ //通知队列，更新数据
    this.subs.forEach(sub=>{
      sub.update()
    })
  }
}
// 通过Watcher这个类创建的实例，都拥有update方法
class Watcher{
  constructor(vm,exp,fn){
    this.fn = fn// 将fn放到实例上
    this.vm = vm
    this.exp = exp
    // 添加一个事件
    // 这里我们先定义一个属性
    Dep.Target = this
    let arr = exp.split('.')
    let val = vm
    arr.forEach(key=>{ //例如a.b.c
      val = val[key] // 获取到this.a.b，默认就会调用get方法，这时候Dep.Target指向当前watcher
    })
    Dep.Target = null
  }
  update(){
    let arr = this.exp.split('.')
    let val = this.vm
    arr.forEach(key=>{
      val = val[key]// 通过get获取到新的值
    })
    this.fn(val)// 将每次拿到的新值去替换{{}}的内容即可
  }
}