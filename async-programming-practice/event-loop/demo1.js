// 第一题, 求输出顺序，并以注释的方式说明原因
const fs = require('fs');

setTimeout(() => {
    console.log(1) // 例：position1: 进入timers阶段后，该步骤是第一个宏命令
    setImmediate(() => {  //check 阶段会执行，宏任务
      console.log(2)
    })
    process.nextTick(() => { // 微任务，优先级高，异步任务里面最快执行的
      console.log(3)
      process.nextTick(() => {
        console.log(4)
      })
    })
    fs.readFile('test', () => { //poll 阶段，读文件有IO 操作，宏命令
      console.log(5)
    });
    new Promise((resolve) => {  // 微任务
      console.log(6) // 这个和resolve 同步执行
      resolve()
    }).then(() => {
      console.log(7) // 微任务异步执行
    })
  })

// 输出结果： 1-> 6 -> 3 -> 4 ->7 -> 5 -> 2
// notes:
// 1. 同步任务按序先执行 输出 1 6
// 2. nextTick 微任务优先级高 输出 3 4
// 3. 微任务 promise执行 7
// 4. 执行 fs.readFile 输出 5. 因为 poll 阶段的优先级高于 check 阶段，setImmediate是 check 阶段
// 5. 执行 setImmediate 输出 2