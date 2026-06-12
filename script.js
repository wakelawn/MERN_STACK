// Tasks:
//  Find the sum of first n numbers where n is a variable.
let n = 5;
let sum = 0;

for (let i = 0; i <= n; i++) {
  sum = sum + i;
}
console.log("The sum of first " + n + " number is: " + sum);

// Print table of n where n is a variable.

console.log("The table of " + n + "  is displayed below:");

for (let i = 1; i <= 10; i++) {
  console.log(n + "*" + i + "=" + i * n);
}

// Check if it is a prime number.

const num1 = 11;
let isPrime = true;

if (num1 <= 1) {
  isPrime = false;
} else {
  for (let i = 2; i <= Math.sqrt(num1); i++) {
    if (num1 % i === 0) {
      isPrime = false;
      break;
    }
  }
}

if (isPrime) {
  console.log(num1 + " is a prime number");
} else {
  console.log(num1 + " is not a prime number");
}

// Print all its factors.

const num2 = 30;

console.log("The factors of " + num2 + " are:");

for (let i = 1; i <= num2; i++) {
  if (num2 % i === 0) {
    console.log(i);
  }
}

// Find sum of all digits of a number (139 = 13 => 1+3+9 =13).

let num3 = 139;
let sum1 = 0;

console.log("The sum of all digit of the number " + num3);

while (num3 > 0) {
  let remainder = num3 % 10;
  sum1 += remainder;
  num3 = (num3 - remainder) / 10;
}

console.log(sum1);

// Check if it is an Armstrong number - An Armstrong number is one whose sum of digits raised to the power three equals the number ( ex 153 => 1^3 + 5^3 + 3^3 = 153 )

let num4 = 400;
let oNum = num4;
let temp = num4;
let digits = 0;
let sum2 = 0;

while (temp > 0) {
  digits++;
  let remainder = temp % 10;
  temp = (temp - remainder) / 10;
}

temp = num4;

while (temp > 0) {
  let remainder = temp % 10;
  sum2 += remainder ** digits;
  temp = (temp - remainder) / 10;
}

if (sum2 === oNum) {
  console.log(oNum + " is an Armstrong number");
} else {
  console.log(oNum + " is not an Armstrong number");
}