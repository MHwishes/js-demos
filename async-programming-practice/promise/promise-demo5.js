// 第三题
Promise.resolve()
  .then(() => {
    console.log(1);
    throw new Error('error1');
  })
  .catch(() => {
    console.log(2);
  })
  .catch(() => {
    console.log(3);
  });

//   output: 1,2 
//Notes: 执行第一个then, 输出1； throw error, 执行catch 捕获，输出2； 输出2 之后 无异常再抛出，所以最后一个catch 不会执行
// 只有第一个会执行, 除非第一个catch 执行之后又抛出错误，或者catch 后面又then，抛出错误，后面的catch 才会执行
