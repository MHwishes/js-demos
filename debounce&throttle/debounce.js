let count = 1;
const container = document.getElementById('container-debounce')

const getUserAction = () => {
    container.innerHTML = count++;
}
// container.onmousemove = getUserAction;
// 第一版
const debounce = (func, time) => {
    let timeout;
    return () => {
        clearTimeout(timeout)
        timeout = setTimeout(func, time)
    }
}
container.onmousemove = debounce(getUserAction, 1000);