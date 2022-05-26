let displayValue = "";

formatButtons();

function add(firstNum, secondNum) {
  return firstNum + secondNum;
}
function subtract(firstNum, secondNum) {
  return firstNum - secondNum;
}
function multiply(firstNum, secondNum) {
  return firstNum * secondNum;
}
function divide(firstNum, secondNum) {
  return firstNum / secondNum;
}

function operate(operator, firstNum, secondNum) {
  return operator(firstNum, secondNum);
}

function formatButtons() {
  const btns = document.querySelectorAll("button");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      window[btn.className](btn.textContent);
    });
  });
}

function digitBtn(digit) {
  populateDisplay(digit);
}

function operatorBtn(operator) {
  let display = returnDisplayValue();
  const ops = ["+", "-", "÷", "*"];

  if (doesItContain(display, ops)) {
    if (doesItContain(display.charAt([display.length - 1]), ops)) {
      backspaceBtn();
      populateDisplay(operator);
      return -1;
    }
    return -1;
  }

  populateDisplay(operator);
}

//Adds the visible display for the user
function populateDisplay(entry) {
  addToDisplay(entry);
  const display = document.querySelector(".display");
  display.textContent = returnDisplayValue();
}

//Appends new digit to old digit/digits pressed.
function addToDisplay(entry) {
  if (entry == "backspace") {
    displayValue = displayValue.slice(0, -1);
    populateDisplay("");
    return -1;
  }
  if (entry == "clear") {
    displayValue = "";
    populateDisplay("");
    return -1;
  }

  displayValue = displayValue + entry;
  return displayValue;
}

function backspaceBtn() {
  addToDisplay("backspace");
}

function clearBtn() {
  addToDisplay("clear");
}

function returnDisplayValue() {
  return displayValue;
}

function doesItContain(str, arr) {
  const contains = arr.some((element) => {
    if (str.includes(element)) {
      return true;
    }

    return false;
  });
  return contains;
}
