Promise.resolve(1)
.then((x)=> x+1)
.then(x=>{throw new Error("my error")})
.catch(()=>1)
.then((x)=> x+1)
.then((x)=> console.log(x)) 
.catch(console.error)

// 输出：2