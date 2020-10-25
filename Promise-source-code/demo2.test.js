// setTimeout函数让resolve变成了异步执行，有延迟，
// 调用then方法的时候，此刻状态还是等待态(pending)，
// then方法即没有调用onFulfilled也没有调用onRejected

const demo2 = require('./demo2');

function fn1(){
  return new demo2((resolve,reject) => {
    setTimeout(function(){
      let num = Math.ceil(Math.random()*10)
      if(num < 5){
        resolve(num)
      }else{
        reject('数字太大')
      }
    },2000);
  })
}

fn1().then((data) => {
  console.log(data)
},(err)=>{
  console.log(err)
})
