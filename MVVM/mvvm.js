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
  Compile(options.el, this)
}

//判断并数据劫持
function observe(data) {
  if (!data || typeof data !== 'object') return
  Observe(data)
}
// 创建一个Observe构造函数,写数据劫持的主要逻辑
function Observe(data) {
  for (let key in data) {
    let val = data[key]
    observe(val) // 递归继续向下找，实现深度的数据劫持
    Object.defineProperty(data, key, {
      configurable: true,
      get() {
        return val
      },
      set(newVal) {
        if (newVal === val) {
          return
        }
        val = newVal //把新的值赋值给val
        observe(data) //对新的值重新数据劫持
      }
    })
  }
}

//数据编译
function Compile(el, vm) { //el为挂载的容器id，vm为mvvm当前的内容
  // 将el挂载到实例上方便调用
  vm.$el = document.querySelector(el)
  let fragment = document.createDocumentFragment()
  while (child = vm.$el.firstChild) {
    fragment.appendChild(child)
  }
}