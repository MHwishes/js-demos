let count = 1;
const container = document.getElementById('container-debounce')

const getUserAction = (event) => {
    console.log(event, "event");
    container.innerHTML = count++;
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
container.onmousemove = debounce3(getUserAction, 1000);
