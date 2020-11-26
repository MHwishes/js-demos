// 第二题, 求输出顺序，并以注释的方式说明原因
new Promise((resolve) => {
    console.log(2) // 同步执行
    setTimeout(() => { // 宏任务
      console.log(1)
    })
    new Promise((resolve) => { // 微任务
      console.log(3)
      resolve()
    }).then(() => {
      console.log(4)
    })
    resolve()
  }).then(() => {
    console.log(5)
  })
  
  process.nextTick(() => {
    console.log(6)
  })
  
  setImmediate(() => {
    console.log(7)
    process.nextTick(() => {
      console.log(6)
    })
})

// Output: 2 -> 3 -> 6 -> 4 -> 5 -> 1 -> 7 -> 6

// Notes:
// 1. 进入timers阶段后，同步执行，输出2 和3
// 2. 执行微命令 6， nextTick 优先级高
// 3. 执行 promise then 的微命令 ，输出 4和5
// 4. 再执行下一轮的宏命令 setTimeOut,输出1
// 5. 执行check 阶段的 宏命令，输出 7. 执行微命令输出6