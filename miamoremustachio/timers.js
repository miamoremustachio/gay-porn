// task 1
function printNumbers(from, to) {
    let i = from;

    const timerId = setInterval(() => { 
        console.log(i++);
        if (i > to) { clearInterval(timerId) };
    }, 1_000);
}

printNumbers(1, 7); // 1, 2, 3, 4, 5, 6, 7


// task 2
function printNumbersRecursive(from, to) {
    let i = from;

    setTimeout(function count() {
        console.log(i++);
        if (i > to) { return };
        
        setTimeout(count, 1_000);
    }, 1_000);
}

printNumbersRecursive(0, 5); // 0, 1, 2, 3, 4, 5


// bonus
function infiniteBackAndForthCount(from, to) {
    let i = from;
    let countForward = true;

    setTimeout(function count() {
        if (countForward) {
            console.log(i++);
        } else {
            console.log(i--);
        };

        switch (i) {
            case to:
                countForward = false;
                break;
            case from:
                countForward = true;
                break;
        };
        setTimeout(count, 500);
    }, 500);
}

infiniteBackAndForthCount(0, 10);
// count from 0 to 10, then from 10 to 0, then from 0 to 10 again etc. (ad infinitum)