let currentNum = "";
let previousNum = "";
let operator = null;

const dataClear = document.querySelector("[data-clear]");
const operandDis = document.querySelectorAll("[data-operand]");
const number = document.querySelectorAll("[data-number]");
const equal = document.querySelector("[data-equal]");
const previousDis = document.querySelector("[data-previous]");
const currentDis = document.querySelector("[data-current]");
const decimal = document.querySelector("[data-decimal]");

dataClear.addEventListener("click", clearData);

function clearData() {
  currentNum = "";
  previousNum = "";
  operator = null;
  previousDis.textContent = "";
  currentDis.textContent = 0;
}

number.forEach((button) => {
  button.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  });
});

function handleNumber(num) {
  currentNum += num;
  currentDis.textContent = currentNum;
}

operandDis.forEach((button) => {
  button.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
  });
});

function handleOperator(op) {
  if (previousNum == "") {
    previousNum = currentNum;
    operatorCheck(op);
  } else if (currentNum == "") {
    operatorCheck(op);
  } else {
    handleEqual();
    operator = op;
    currentNum = "";
    currentDis.textContent = "";
    previousDis.textContent = previousNum + " " + operator;
  }
}

function operatorCheck(op) {
  operator = op;
  previousDis.textContent = previousNum + " " + op;
  currentNum = "";
  currentDis.textContent = "";
}

equal.addEventListener("click", () => {
  if (currentNum !== "" && previousNum !== "" && operator !== null) {
    handleEqual();
  }
});

decimal.addEventListener("click", () => {
  addDecimal();
});

function addDecimal() {
  if (!currentNum.includes(".")) {
    currentNum += ".";
    currentDis.textContent = currentNum;
  }
}

function handleEqual() {
  previousNum = Number(previousNum);
  currentNum = Number(currentNum);

  previousDis.textContent =
    previousNum + " " + operator + " " + currentNum + " " + "=";

  switch (operator) {
    case "+":
      previousNum = add(previousNum, currentNum);
      currentDis.textContent = previousNum;
      currentNum = "";
      break;
    case "-":
      previousNum = minus(previousNum, currentNum);
      currentDis.textContent = previousNum;
      currentNum = "";
      break;
    case "*":
      previousNum = multiply(previousNum, currentNum);
      currentDis.textContent = previousNum;
      currentNum = "";
      break;
    case "/":
      previousNum = divide(previousNum, currentNum);
      currentDis.textContent = previousNum;
      currentNum = "";
      break;
  }
  operator = null;
}

function add(num1, num2) {
  return num1 + num2;
}
function minus(num1, num2) {
  return num1 - num2;
}
function multiply(num1, num2) {
  return num1 * num2;
}
function divide(num1, num2) {
  if (num2 == 0) {
    alert("Please don't divide by zero...");
    clearData();
  } else return num1 / num2;
}
