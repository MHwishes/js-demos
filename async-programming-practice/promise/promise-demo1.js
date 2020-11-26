Promise.resolve(1)
.then((res)=>{
    console.log(res); 
    return 2
 })
.catch(err=>3)
.then(res=>console.log(res))

// output:1, 2, 
// 没有error, catch 是不会执行的.resolve 的返回值值1 赋给了第一个then 的参数res. 
// 第一个then 的返回值2 赋给了第二个then 的res