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

//第二版 修改this 的指向,为什么使用apply 后this 依旧还是指window 对象？
const debounce2 = (func, time) => {
    let timeout;
    return () => {
        let context = this;
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            func.apply(context)
            console.log(context, '函数里context')
            console.log(context, "context2")
        }, time)
    }
}
// container.onmousemove = debounce2(getUserAction, 1000);

// 第二版的问题：如果我们不使用 debouce 函数，这里会打印 event 是MouseEvent 对象,
// 但是在我们实现的 debounce 函数中，却只会打印 undefined!

// 第三版
const debounce3 = (func, time) => {
    let timeout;
    return () => {
        let context = this;
        var args = arguments;
        console.log(args, "args")
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            func.apply(context, args)
            console.log(context, '函数里context')
            console.log(context, "context2")
            console.log(args, "args")
        }, time)
    }
}
container.onmousemove = debounce3(getUserAction, 1000);
