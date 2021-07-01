// 响应式库

// 依赖
let currentEffect
class Dep {
  constructor(val){
    this.effects = new Set()
    this._val = val
  }
  get value(){
    this.depend()
    return this._val
  }
  set value(newVal){
    this._val = newVal
  }
  // 派发依赖
  depend(){
    if(currentEffect){
      this.effects.add(currentEffect)
    }
  }
  // 触发依赖
  notice(){
    // 触发之前收集的依赖
    this.effects.forEach(effect=>{
      effect()
    })
  }
}
export function effectWatch(effect){
    // 收集依赖
    currentEffect = effect
    effect()
    currentEffect = null
}
// proxy代理
const targetMap = new Map()

function getDep(target,key){
  console.log(target,key)
  let depsMap = targetMap.get(target)
  if(!depsMap){
    depsMap = new Map()
    targetMap.set(target,depsMap)
  }
  let dep = depsMap.get(key) 
  if(!dep){
    dep = new Dep()
    depsMap.set(key,dep)
  }
  console.log(dep)
  return dep
}

export function reactive(raw){
  return new Proxy(raw,{
    get(target,key){
      // 依赖收集
      const dep = getDep(target,key)
      dep.depend()
      return Reflect.get(target,key)
    },
    set(target,key,value){
      // 触发依赖，获取dep
      const dep = getDep(target,key)
      const result = Reflect.set(target,key,value)
      dep.notice()
      return result
    }
  })
}