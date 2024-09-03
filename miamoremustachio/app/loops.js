// 1.
let i = 1;

while (i <= 19) {
  console.log(i);
  i++;
}

// 2.
let l = 1;

while (true) {
  console.log(l++);
  if (l > 19) break;
}

// 3.
let j = 1;

do {
  console.log(j);
  j++;

} while (j <= 19);

// 4.
for (let k = 1; k <= 19; k++) {
  console.log(k);
}
