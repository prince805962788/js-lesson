async function fn(args) {
  // ...
}
// 等同于
function fn(args) {
  return spawn(function* () {
    // ...
  });
}

function spawn(genF) {
  return new Promise((resolve, reject) => {
    const gen = genF() // 先将Generator函数执行下，拿到遍历器对象
    function step(nextF) {
      let next
      try {
        next = nextF()
      } catch (e) {
        return reject(e)
      }
      if (next.done) {
        return resolve(next.value)
      }
      Promise.resolve(next.value).then((v) => {
        step(() => {
          return gen.next(v)
        })
      }, (e) => {
        step(() => {
          return gen.throw(e)
        })
      })
    }
    step(() => {
      return gen.next(undefined)
    })
  })
}