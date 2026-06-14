// Find the maximum number in the array.

let arr = [2, 3, 6, 8, 1, 6, 99, 4, 6, 2, 1];
function maxNum(arr) {
  let max = arr[0];

  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

console.log("The maximum number is:", maxNum(arr));

// Calculate the sum of all elements in the array.

let arr2 = [24, 4, 3, 33, 6, 5, 7, 8, 10];
let temp = 0;

const sumAllElements = function(arr) {
  for (let i = 0; i < arr.length; i++) {
    temp += arr[i];
  }
  return temp;
};

console.log("The sum of all elements is:", sumAllElements(arr2));

// Count the number of odd numbers in the array.

let arr3 = [2, 4, 6, 8, 12, 14, 16, 18, 10, 3, 8, 7, 7, 9, 33, 7];
let temp1 = 0;

const oddNumbers = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 !== 0) {
      temp1++;
    }
  }
  return temp1;
};

console.log("Count of odd numbers:",oddNumbers(arr3));
