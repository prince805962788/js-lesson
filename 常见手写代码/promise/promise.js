class myPromise {
  constructor (executor) {
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
  then (onFulfilled, onRejected) {
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

const p = new myPromise((resolve, reject) => {
  console.log('start')
  setTimeout(() => {
    try {
      resolve('data1')
    } catch (error) {
      reject(error)
    }
  }, 2000)
})
p.then(
  (v) => {
    console.log('success： ' + v)
    return v
  },
  (v) => {
    console.log('error： ' + v)
  }
).then(
  (v) => {
    console.log('success2： ' + v)
  },
  (v) => {
    console.log('error2： ' + v)
  }
)
console.log('end')