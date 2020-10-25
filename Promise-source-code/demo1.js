// 最基础的版本
function Promise(executor) {
  let self = this;
  this.status = 'pending';
  this.value = undefined;
  this.reason = undefined;

  if (typeof executor !== 'function') {
    throw new Error('传入的参数不是函数');
  }

  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'fulfilled';
      self.value = value;
    }
  }

  function reject(reason) {
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
