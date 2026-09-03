const greetingArea = document.getElementById("greeting");
const inputName = document.getElementById("nameInput");
const greetBtn = document.getElementById("greet");
const boxes = document.querySelectorAll(".box-red, .box-blue, .box-green, .box-yellow");

//as the boxes are ina nodelist running a foreach loop to get through all the boxes and have predefined css properties for the color chnage 
boxes.forEach((box) => {
  box.addEventListener("click", () => {
      box.classList.toggle("active")
  });
});

// const l ="Bhaisahab";
// greetingArea.append(l)
// console.log(greetingArea.textContent);


//using the value att to get the input content and merging it into the greeting area 
greetBtn.addEventListener("click", () => {
    const name = inputName.value.trim();

    if (name) {
        greetingArea.textContent = `Hello, ${name}!`;
        inputName.value = "";
    }
});

