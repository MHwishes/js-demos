// 解决异步调用的问题

function Promise(executor) {
  let self = this;
  this.status = 'pending';
  this.value = undefined;
  this.reason = undefined;

   // 保存成功回调
  this.onResolvedCallbacks = []
  // 保存失败回调
  this.onRejectedCallbacks = []

  if (typeof executor !== 'function') {
    throw new Error('传入的参数不是函数');
  }

  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'fulfilled';
      // 遍历执行成功回调
      self.onResolvedCallbacks.forEach(cb => cb(value))
      self.value = value;
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected';
      // 遍历执行失败回调
      self.onRejectedCallbacks.forEach(cb => cb(reason))
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
  if(self.status==='pending'){
    if(typeof onFulfilled==='function'){
      self.onResolvedCallbacks.push(onFulfilled);
    }
    if(typeof onRejected==='function'){
      self.onRejectedCallbacks.push(onRejected);
    }
  }
  if(self.status==='fulfilled'){
    if(typeof onFulfilled==='function'){
      onFulfilled(self.value)
    }
    
  }
  if(self.status === 'rejected'){
    if(typeof onFulfilled==='function'){
      onRejected(self.reason)
    }
  }
}
module.exports = Promise;
