import { bubbleSort } from './sort'

describe('bubbleSort', () => {
    it('should be sorted in asc order', () => {
        const res = bubbleSort([2, 5, 1, 7, 3]);
        expect(res).toEqual([1, 2, 3, 5, 7])
    })
})