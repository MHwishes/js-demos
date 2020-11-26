// 第二题
Promise.resolve()
  .then(() => {
    console.log(1);
    throw new Error('error1');
  })
  .catch(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  });

  //output: 1, 2, 3
  //Notes: 执行第一个then, 输出1； throw error, 执行catch 捕获，输出2； 最后再执行then, 输出 3
