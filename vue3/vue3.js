const isObject = val => val !== null && typeof val === 'object'

function reactive (obj) {
  // Proxy只能接受一个对象
  if (!isObject(obj)) {
    return obj
  }
  // Proxy相当于在对象外层加拦截
  const observed = new Proxy(obj, {
    get (target, key, receiver) {
      // Reflect用于执行对象默认操作，更规范、更友好
      // Proxy和Object的方法Reflect都有对应
      const res = Reflect.get(target, key, receiver)
      track(target, key)
      console.log(`获取${key}:${res}`)
      // 在get取值的是否判断该值是否是一个对象，如果是则递归
      return isObject(res) ? reactive(res) : res
    },
    set (target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver)
      trigger(target, key)
      console.log(`设置${key}:${value}`)
      return res
    },
    deleteProperty (target, key) {
      const res = Reflect.deleteProperty(target, key)
      console.log(`删除${key}:${res}`)
      return res
    }
  })
  return observed
}
// 保存当前活动响应函数作为getter和effect之间桥梁 
const effectStack = []
// effect任务:执行fn并将其入栈 
function effect (fn) {
  const rxEffect = function () { // 1.捕获可能的异常
    try {
      // 2.入栈，用于后续依赖收集 
      effectStack.push(rxEffect)
      // 3.运行fn，触发依赖收集 
      return fn()
    } finally {
      // 4.执行结束，出栈
      effectStack.pop()
    }
  }
  // 默认执行一次响应函数 
  rxEffect()
  // 返回响应函数
  return rxEffect
}

// 映射关系表，结构大致如下:
// {target: {key: [fn1,fn2]}} 
let targetMap = new WeakMap()
function track (target, key) {
  // 从栈中取出响应函数
  const effect = effectStack[effectStack.length - 1]
  if (effect) {
    // 获取target对应依赖表
    let depsMap = targetMap.get(target)
    //如果没有对应的隐射，则创建一个并建立隐射
    if (!depsMap) {
      depsMap = new Map()
      targetMap.set(target, depsMap)
    }
    // 获取key对应的响应函数集
    let deps = depsMap.get(key)
    if (!deps) {
      deps = new Set()
      depsMap.set(key, deps)
    }
    if (!deps.has(effect)) {
      deps.add(effect)
    }
  }
}

// 触发target.key对应响应函数 
function trigger (target, key) {
  // 获取依赖表
  const depsMap = targetMap.get(target)
  if (depsMap) {
    // 获取响应函数集合
    const deps = depsMap.get(key)
    if (deps) {
      // 执行所有响应函数 
      deps.forEach(effect => {
        effect()
      })
    }
  }
}


// 测试代码
debugger
const state = reactive({ name: '张三' })
// 第一次取值打印出张三，当state.name修改之后，就打印出李四了
effect(() => console.log(state.name)) 
state.name = '李四'