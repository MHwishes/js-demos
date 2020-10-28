/**
 * 1. new Promise时，需要传递一个 executor 执行器，执行器立刻执行
 * 2. executor 接受两个参数，分别是 resolve 和 reject
 * 3. promise 只能从 pending 到 rejected, 或者从 pending 到 fulfilled
 * 4. promise 的状态一旦确认，就不会再改变
 * 5. promise 都有 then 方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled, 
 *      和 promise 失败的回调 onRejected
 * 6. 如果调用 then 时，promise已经成功，则执行 onFulfilled，并将promise的值作为参数传递进去。
 *      如果promise已经失败，那么执行 onRejected, 并将 promise 失败的原因作为参数传递进去。
 *      如果promise的状态是pending，需要将onFulfilled和onRejected函数存放起来，等待状态确定后，再依次将对应的函数执行(发布订阅)
 * 7. then 的参数 onFulfilled 和 onRejected 可以缺省
 * 8. promise 可以then多次，promise 的then 方法返回一个 promise
 * 9. 如果 then 返回的是一个结果，那么就会把这个结果作为参数，传递给下一个then的成功的回调(onFulfilled)
 * 10. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调(onRejected)
 * 11.如果 then 返回的是一个promise,那么需要等这个promise，那么会等这个promise执行完，promise如果成功，
 *   就走下一个then的成功，如果失败，就走下一个then的失败
 */

 // 解决promise的链式调用

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
function Promise(executor) {
    let self = this;
    self.status = PENDING;
    self.onFulfilled = [];//成功的回调
    self.onRejected = []; //失败的回调
    //PromiseA+ 2.1
    function resolve(value) {
        if (self.status === PENDING) {
            self.status = FULFILLED;
            self.value = value;
            self.onFulfilled.forEach(fn => fn());//PromiseA+ 2.2.6.1
        }
    }

    function reject(reason) {
        if (self.status === PENDING) {
            self.status = REJECTED;
            self.reason = reason;
            self.onRejected.forEach(fn => fn());//PromiseA+ 2.2.6.2
        }
    }

    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
    //PromiseA+ 2.2.1 / PromiseA+ 2.2.5 / PromiseA+ 2.2.7.3 / PromiseA+ 2.2.7.4
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
    let self = this;
    console.log('this', this)
    console.log('self', self)

    //PromiseA+ 2.2.7 then 方法一定返回一个 promise
    let promise2 = new Promise((resolve, reject) => {
        if (self.status === FULFILLED) {
            //PromiseA+ 2.2.2
            //PromiseA+ 2.2.4 --- setTimeout
            // onFulfilled 或 onRejected 只在执行环境堆栈只包含平台代码之后调用,这里的 “平台代码”是指引擎，环境，和 promise 实现代码。
            // 实际上，这个要求确保 onFulfilled 和 onRejected 都在下一轮的事件循环中（一个新的栈）被异步调用。可以用宏任务，例如：setTimeout，setImmediate 或者微任务，例如：MutationObsever 或 process.nextTick 实现。 
            // 由于 promise 的实现被当做平台代码，所以它本身可能包含一个任务队列或 “trampoline” 的处理程序
            setTimeout(() => {
                try {
                    //PromiseA+ 2.2.7.1
                    // 箭头函数，无论this一直是指向最外层的对象
                    let x = onFulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);  /* 这一步x只能处理普通值，但是x可能是一个函数对象，或者promise,所以要对x进行判断 */
                } catch (e) {
                    //PromiseA+ 2.2.7.2
                    reject(e);
                }
            });
        } else if (self.status === REJECTED) {
            //PromiseA+ 2.2.3
            setTimeout(() => {
                try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        } else if (self.status === PENDING) {  /*处理异步的情况 */
            self.onFulfilled.push(() => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            });
            self.onRejected.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(self.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            });
            console.log(self.onFulfilled,"onFulfilled");
            console.log(self.onRejected,"onRejected");
        }
    });
    return promise2;
}

// 用来判断x的值，如果x的值是一个普通的值，就直接返回x的值，如果x的值是一个promise，就要返回x.then() 执行的结果
function resolvePromise(promise2, x, resolve, reject) {
    let self = this;
    //PromiseA+ 2.3.1  循环引用报错   
    if (promise2 === x) {
        reject(new TypeError('Chaining cycle'));
    }
    // x不是null 且x是对象或者函数 
    if (x && typeof x === 'object' || typeof x === 'function') {
        let used; //PromiseA+2.3.3.3.3 只能调用一次
        console.log(x,"eee")
        try {
            let then = x.then;
            if (typeof then === 'function') {
                //PromiseA+2.3.3 
                then.call(x, (y) => {
                    //PromiseA+2.3.3.1 // 成功和失败只能调用一个    
                    if (used) return;
                    used = true;
                    // resolve的结果依旧是promise 那就继续解析          
                    resolvePromise(promise2, y, resolve, reject);
                }, (r) => {
                    //PromiseA+2.3.3.2
                    if (used) return;
                    used = true;
                    reject(r);
                });

            }else{
                //PromiseA+2.3.3.4
                if (used) return;
                used = true;
                //如果不是函数，是普通对象直接resolve
                resolve(x);
            }
        } catch (e) {
            //PromiseA+ 2.3.3.2
            if (used) return;
            used = true;
            reject(e);
        }
    } else {
        //PromiseA+ 2.3.3.4 x是一个普通值
        resolve(x);
    }
}

module.exports = Promise;