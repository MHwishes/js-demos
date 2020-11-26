// 第一题
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');
async1();
console.log('script end');

// output: script start -> async1 start -> async2 -> script end -> async1 end
// Notes:
// 函数开始执行 console.log('script start'); 输出 script start
// 执行async1() console.log('async1 start'); 输出 async1 start
// 等待async2()结果返回 输出 async2
// async1() 返回promise 等待执行
// 执行console.log('script end'); 输出 script end
// async1() 结果返回 输出 async1 end
