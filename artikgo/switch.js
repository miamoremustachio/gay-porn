let browser = 'Edge';

switch (browser) {
  case 'Edge':
    console.log( "You've got the Edge!" );
    break;

  case 'Chrome':
  case 'Firefox':
  case 'Safari':
  case 'Opera':
    console.log( 'Okay we support these browsers too' );
    break;

  default:
    console.log( 'We hope that this page looks ok!' );
}


browser = 'opera';
    if (browser === 'Edge') {
        console.log ('You`ve goy the Edge');
}   else if (browser === 'Chrome') {
        console.log ('Okay we support these browser too');
}   else if (browser === 'Safari') {
        console.log ('Okay we support these browser too');
}   else if (browser === 'Firefox') {
        console.log ('Okay we support these browser too');
}   else if (browser === 'Opera') {
        console.log ('Okay we support these browser too');
}   else {
        console.log ('We hope that this page looks ok')
}

// 2 task

let number = 2;

if (number === 0) {
  console.log('Вы ввели число 0');
}

if (number === 1) {
    console.log('Вы ввели число 1');
}

if (number === 2 || number === 3) {
    console.log('Вы ввели число 2, а может и 3');
}


number = 3;
switch (number) {
    case 0:
        console.log ('Вы ввели число 0');
        break;
    case 1:
        console.log ('Вы ввели число 1');
            break
    case 2:
    case 3:
        console.log ('Вы ввели число 2, а может и 3');
        break;
}