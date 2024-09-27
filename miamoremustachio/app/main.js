{
  function printNumbers(from, to) {
    let i = from;

    const print = function() {
      if (i === to) {
        clearInterval(intervalId);
      }

      console.log(i++);
    }

    const intervalId = setInterval(print, 1000);
  }

  printNumbers(0, 3);
}

{
  function printNumbers(from, to) {
    let i = from;
 
    setTimeout(function print() {
      console.log(i++);
      
      if (i > to) return;
      
      setTimeout(print, 1000);
    }, 1000);
  }

  printNumbers(0, 3);
}