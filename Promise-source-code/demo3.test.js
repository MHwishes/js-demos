
const demo3 = require('./demo3');

function fn1(){
  return new demo3((resolve,reject) => {
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

fn1()
.then((data) => {
  console.log('第一次result:'+data)
  return new Promise((resolve,reject)=>{ /*1. 新的Promise实例 */
    setTimeout(function(){
       resolve('第二次Promise',data+"test")
    },1000)
  })
},(err)=>{
  console.log('第一次err:'+err)
})
.then((data)=>{
  console.log('第二次result:'+data)
  return '这是普通值'  /*2. 普通值 */
},(err)=>{console.log('第二次err:'+err)})
.then(null,(err) => {
  console.log('第三次err:'+err) /* 3. 参数是null */
})

// 根据原生Promise 的then 用法，我们总结一下：
// 1. then方法如果返回一个普通的值，我们就将这个普通值传递给下一个then
// 2. then方法如果返回一个promise对象，我们就将这个promise对象执行结果返回到下一个then

