// 冒泡算法 从小到大排序
export const bubbleSort = (array) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) { // 相邻的元素比较
                let temp = array[j + 1]; // 元素交换
                array[j + 1] = array[j];
                array[j] = temp;
            }
        }
    }
    return array;
}
