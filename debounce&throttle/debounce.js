let count = 1;
const container = document.getElementById('container-debounce')

const getUserAction = (event) => {
  console.log(event, "event");
  container.innerHTML = count++;
  return 7;
}
// container.onmousemove = getUserAction;

// 第一版
const debounce1 = (func, time) => {
    let timeout;
    return () => {
        clearTimeout(timeout)
        timeout = setTimeout(func, time)
    }
}
// container.onmousemove = debounce1(getUserAction, 1000);

//第二版 修改this 的指向,使用apply 后this 指向 <div id="container-debounce"/>
const debounce2 = (func, time) => {
    let timeout;
    return function () {
        let context = this;
        clearTimeout(timeout)
        timeout = setTimeout(function () {
            func.apply(context)
        }, time)
    }
}
// container.onmousemove = debounce2(getUserAction, 1000);

// 第二版的问题：如果我们不使用 debouce 函数，这里会打印 event 是MouseEvent 对象,
// 但是在我们实现的 debounce 函数中，却只会打印 undefined!

// 第三版 修改event对象的指向
function debounce3(func, time) {
    let timeout;
    return () => {
        let context = this;
        let args = arguments;
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            func.apply(context, args)
        }, time)
    }
}
// container.onmousemove = debounce3(getUserAction, 1000);

//第四版 新需求，我不希望非要等到事件停止触发后才执行，我希望立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行。
function debounce4(func, time,immediate) {
  let timeout, result;
  return () => {
    let context = this;
    let args = arguments;
    if (timeout) {
      clearTimeout(timeout) 
    }
    if (immediate) {
      // 如果已经执行过，不再执行
      let callNow = !timeout;
      if (callNow) {
        // result 是getUserAction的返回值
        result=func.apply(context, args)
      }
      timeout = setTimeout(function(){
        timeout = null;
      }, time)
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args)
      }, time)
    }
    // 我们只在 immediate 为 true 的时候返回函数的执行结果,immediate 为 false 是 返回 undefined
    console.log('%c 🥩 result: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', result);
    return result
  }
}
// container.onmousemove = debounce4(getUserAction, 1000, true);

// 第五版 我希望能取消 debounce 函数，比如说我 debounce 的时间间隔是 10 秒钟，immediate 为 true
// 这样的话，我只有等 10 秒后才能重新触发事件，现在我希望有一个按钮，点击后，取消防抖，这样我再去触发，就可以又立刻执行啦

function debounce5(func, time,immediate) {
  let timeout, result;

  let debounce= () => {
    let context = this;
    let args = arguments;
    if (timeout) {
      clearTimeout(timeout) 
    }
    if (immediate) {
      // 如果已经执行过，不再执行
      let callNow = !timeout;
      if (callNow) {
        // result 是getUserAction的返回值
        result=func.apply(context, args)
      }
      timeout = setTimeout(function(){
        timeout = null;
      }, time)
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args)
      }, time)
    }
    // 我们只在 immediate 为 true 的时候返回函数的执行结果,immediate 为 false 是 返回 undefined
    return result
  }

  debounce.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounce;
}


let setUseAction = debounce5(getUserAction, 1000, true);

container.onmousemove = setUseAction;

document.getElementById("cancel-button").addEventListener('click', function(){
    setUseAction.cancel();
})
