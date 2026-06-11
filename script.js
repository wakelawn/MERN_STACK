//A=P(1+(r/n))^nt
// Where:
// . A = amount
// . P = principal
// . r = rate of interest
// . n = number of times interest is compounded per year
// . t = time (in years)

let p = 50000;
let r = 0.03;
let n = 1;
let t = 3;


a = p * ((1 + r / n) ** (n * t))

console.log("The Compound interest after 3 years will be", a);
