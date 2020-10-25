
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

fn1().then((data) => {
  console.log(data)
},(err)=>{
  console.log(err)
})
