// 最基础的版本
function Promise(executor) {
  let self = this;  /* node 中全局中的this默认是一个空对象，浏览器中是window */ 
  this.status = 'pending';
  this.value = undefined;
  this.reason = undefined;

  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'fulfilled';
      self.value = value;
    }
  }

  function reject(reason) { /* 这是的this 是 global 对象 */
    if (self.status === 'pending') {
      self.status = 'rejected';
      self.reason = reason;
    }
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }

}

Promise.prototype.then= function(onFulfilled, onRejected){
  let self=this;

  if(self.status==='fulfilled'){
    onFulfilled(self.value)
  }
  if(self.status === 'rejected'){
    onRejected(self.reason)
}
}
module.exports = Promise;
