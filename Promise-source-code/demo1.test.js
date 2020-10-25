const demo1 = require('./demo1');

function fn1(){
  return new demo1((resolve,reject) => {
      let num = Math.ceil(Math.random()*10)
      if(num < 5){
        resolve(num)
      }else{
        reject('数字太大')
      }
  })
}

fn1().then((data) => {
    console.log(data)
},(err)=>{
  console.log(err)
})

