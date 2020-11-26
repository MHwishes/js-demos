// 课上拓展题
console.log('script start');

setTimeout(function () {
  console.log('setTimeout');
}, 0);  //setTimeout有个最小执行时间 4ms(minimum delay of 4ms )，并不是0s执行的。注：HTML5中已经将最小执行时间统一为4ms。

const promise = new Promise((resolve) => {
  console.log('Promise'); 
  resolve();
});

promise
  .then(function () {
    console.log('promise1');
  })
  .then(function () {
    console.log('promise2');
    throw new Error('error');
  })
  .catch((err) => {
    console.log(err);
  });

console.log('script end');
// 输出:
// script start 
// Promise
// script end
// promise1
// promise2'
// error
// setTimeout
// 同步代码(包括promise的构造函数) -> promise.then -> setTimeout
//  原因：
// 1. 首先，setTimeout 被推进到 宏任务 队列(将在下一个宏任务中执行)中。
// 2.会先执行 宏任务 中的第一个任务（整个 script中的同步代码 ），再加上promise 构造函数也是同步的（promise.then 回调被推进到 微任务 队列中），所以会先打印出script start 、 Promise 、script end
// 3. 此时，已经执行完了第一个 宏任务 , 所以接下来会顺序执行所有的 微任务, 也就是 promise.then 的回调函数，从而打印出promise1 promise2 error。
// 4. 此时，微任务队列中的任务已经执行完毕，所以执行剩下的 宏任务 队列中的任务，也就是 setTimeout, 所以打印出 setTimeout.


// 宏任务和微任务都是任务队列，常见API 如下：
// 宏任务：setTimeout, setInterval, setImmediate, I/O, UI rendering
// 微任务：process.nextTick, Promise, MutationObserver

// 1. 文档：https://juejin.cn/post/6844903607276437517
// 2. setTimeout 文档：https://laixiazheteng.com/article/page/id/H61NOVU0RZ9Y
