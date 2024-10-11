// 1.
let i = 1;

while (i <= 19) {
  console.log(i);
  i++;
}

// 2.
let j = 1;

while (true) {
  console.log(j++);
  if (j > 19) break;
}

// 3.
let k = 1;

do {
  console.log(k);
  k++;

} while (k <= 19);

// 4.
for (let l = 1; l <= 19; l++) {
  console.log(l);
}
