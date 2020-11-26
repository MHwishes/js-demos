// 第二题
async function async3() {
  console.log('async3 start');
  await async4();

  console.log('async3 end');
  await async5();
  console.log('async4 and async5 end ');
}

async function async4() {
  console.log('async4');
}

async function async5() {
  console.log('async5');
}

console.log('script start');
async3();
console.log('script end');

//output: script start -> async3 start -> async4 -> async3 end -> async5 -> script end -> async4 and async5 end

// ✅ 
//output: script start -> async3 start -> async4 -> script end -> async3 end -> async5 -> async4 and async5 end
// Notes:
// 函数开始执行 输出 script start
// 执行async3() console.log('async3 start'); 输出 async3 start
// 执行并且等待async4()结果返回 输出 async4
// async3() 返回promise
// 同步执行console.log('script end'); 输出 script end
//  async3() 继续执行 输出 async3 end
//  等待async5()结果返回 输出 async5
//  async3() 继续执行 输出 async4 and async5 end 