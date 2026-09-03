//main logic for the task
const callbackfn = (num1, num2) => {
  return new Promise((resolve, reject) => {
    if (num2 == 0) {
      reject("You have used 0 as a divisor");
    } else {
      let ans = num1 / num2;
      resolve(ans);
    }
  });
};

// test cases
console.log("Dividing 10 by 2...");
callbackfn(10, 2)
  .then((result) => console.log("Result:", result))
  .catch((error) => console.log("Error:", error));

console.log("Dividing 100 by 99...");
callbackfn(100, 99)
  .then((result) => console.log("Result:", result))
  .catch((error) => console.log("Error:", error));

console.log("Dividing 50 by 0...");
callbackfn(50, 0)
  .then((result) => console.log("Result:", result))
  .catch((error) => console.log("Error:", error));

console.log("Dividing 2 by 10...");
callbackfn(2, 10)
  .then((result) => console.log("Result:", result))
  .catch((error) => console.log("Error:", error));

console.log("Dividing 90 by 10...");
callbackfn(90, 10)
  .then((result) => console.log("Result:", result))
  .catch((error) => console.log("Error:", error));

const inputOne = document.getElementById("input1");
const inputTwo = document.getElementById("input2");

const addbtn = document.getElementById("btn");
const answer = document.getElementById("answer");

addbtn.addEventListener("click", () => {
  const num1 = Number(inputOne.value);
  const num2 = Number(inputTwo.value);

  callbackfn(num1, num2)
    .then((result) => {
      answer.textContent = result;
    })
    .catch((error) => {
      answer.textContent = error;
    });
});
