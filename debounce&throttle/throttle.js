// 参考文档：https://github.com/mqyqingfeng/Blog/issues/26
let count = 1;
const container = document.getElementById('container-throttle')

const getUserAction = (event) => {
    console.log(event, "event");
    container.innerHTML = count++;
}

// 第一版 使用时间戳
function throttle1(func, time) {
    let context, args;
    let previous = 0;
    return function () {
        context = this;
        args = arguments;
        const now = new Date().getTime()

        if (now - previous > time) {
            func.apply(context, args);
            previous = now;
        }
    }
}
//当鼠标移入的时候，事件立刻执行，每过 1s 会执行一次，如果在 4.2s 停止触发，以后不会再执行事件。

// container.onmousemove = throttle1(getUserAction, 1000);

// 第二版使用setTimeout

function throttle2(func, time) {
    let context, args, timeout = null;
    return function () {
        context = this;
        args = arguments;

        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null
                func.apply(context, args);
            }, time)
        }
    }
}
// 当鼠标移入的时候，事件不会立刻执行，晃了 3s 后终于执行了一次，此后每 3s 执行一次，
// 当数字显示为 3 的时候，立刻移出鼠标，相当于大约 9.2s 的时候停止触发，但是依然会在第 12s 的时候执行一次事件
container.onmousemove = throttle2(getUserAction, 3000);
