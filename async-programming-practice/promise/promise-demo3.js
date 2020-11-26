// 第一题
Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .catch(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  });

//outPut: 1 3 没有error, catch 是不会执行的
//Notes: then 按顺序执行，没有 throw error, 所以catch 是不会执行的
