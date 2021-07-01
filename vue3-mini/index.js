import { effectWatch,reactive } from "./reactive.js";
let a = reactive({
  count: 1,
})
let b
effectWatch(()=>{
  b = a.count + 10
  console.log(b)
})
a.count = 30