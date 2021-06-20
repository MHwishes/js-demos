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

// 快排 [2, 5, 1, 7, 3]
export const quickSort = (array, left = 0, right) => {
    right = typeof right != 'number' ? array.length - 1 : right;
    if (left < right) {
        let partitionIndex = partition(array, left, right);
        quickSort(array, left, partitionIndex - 1);
        quickSort(array, partitionIndex + 1, right);
    }
    return array;

}

const partition = (arr, left, right) => {
    const pivot = left;
    let index = pivot + 1;
    for (let i = index; i <= right; i++) {
        if (arr[i] < arr[pivot]) {
            swap(arr, i, index)
            index++;
        }
    }
    swap(arr, pivot, index - 1);
    return index - 1;

}
const swap = (arr, i, j) => {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}