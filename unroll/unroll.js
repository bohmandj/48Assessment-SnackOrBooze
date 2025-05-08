function unroll(squareArray) {
    /* 
    unroll() takes a square array (array of n arrays w/ n length) 
    and returns a single array containing the values in the square 
    obtained by traversing the square in a spiral: from the 
    top-left corner, move all the way to the right, then all the 
    way down, then all the way to the left, then all the way up, 
    and repeat. 
    
    example:
        const square = [
          [ 1,  2,  3,  4],
          [ 5,  6,  7,  8],
          [ 9, 10, 11, 12],
          [13, 14, 15, 16]
        ];

        unroll(square); 
        returns: [ 1,  2,  3,  4, 
                   8, 12, 16, 15, 
                  14, 13,  9,  5, 
                   6,  7, 11, 10]
    */
    const currSqArr = [...squareArray];
    const unrolledArr = [];

    const collectTop = () => {
        /* remove first arr from currSqArr & add the contents 
        ** to unrolledArr */
        unrolledArr.push(...currSqArr.shift());
    }
    const collectRight = () => {
        /* remove last element from each arr in currSqArr 
        ** & add to unrolledArr */
        for (let arr of currSqArr) {
            unrolledArr.push(arr.pop());
        };
    }
    const collectBottom = () => {
        /* remove last arr from currSqArr & add the contents 
        ** in reverse order to unrolledArr */
        const bottomArr = currSqArr.pop();
        for (let i = bottomArr.length - 1; i >= 0; i--) {
            unrolledArr.push(bottomArr[i]);
        };
    }
    const collectLeft = () => {
        /* remove first element from each arr in currSqArr 
        ** in reverse order & add to unrolledArr */
        for (let i = currSqArr.length - 1; i >= 0; i--) {
            unrolledArr.push(currSqArr[i].shift());
        };
    }

    const processArr = [collectTop, collectRight, collectBottom, collectLeft];

    let processIdx = 0;
    while (currSqArr.length > 0) {
        processArr[processIdx]();
        // increment processIdx for next loop
        processIdx < processArr.length - 1
            ? processIdx++
            : processIdx = 0;
    }
    return unrolledArr;
}

module.exports = unroll;
