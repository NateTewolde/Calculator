let displayValue = "";

formatButtons();

//Basic calclator functions
function add(firstNum, secondNum) {
  return +firstNum + +secondNum;
}
function subtract(firstNum, secondNum) {
  return firstNum - secondNum;
}
function multiply(firstNum, secondNum) {
  return firstNum * secondNum;
}
function divide(firstNum, secondNum) {
  if (secondNum === "0") {
    return "Crashing the matrix";
  }
  return firstNum / secondNum;
}

//Performs calculator function
function operate(operator, firstNum, secondNum) {
  if (firstNum.charAt(0) === "−") {
    firstNum = firstNum.replace("−", "-");
  }
  if (secondNum.charAt(0) === "−") {
    secondNum = secondNum.replace("−", "-");
  }
  let result = window[operator](firstNum, secondNum);
  if (result % 1 !== 0) {
    result = parseFloat(result.toFixed(5));
  }
  return result;
}

//Formats the calculator buttons to be clickable and sends them to their appropriate
//function to be appropriately used.
function formatButtons() {
  const btns = document.querySelectorAll("button");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (returnDisplayValue() == "Crashing the matrix") {
        clearBtn();
      }

      window[btn.className](btn.textContent);
    });
  });
}

//Sends a digit to be added to the display
function digitBtn(digit) {
  populateDisplay(digit);
}

//Checks if an operator is already on the display, if so then it doesnt let another
//operator be sent. If the operator in the display is the last character then the user
//may change their operation choice.
function operatorBtn(operator) {
  let display = returnDisplayValue();
  const ops = ["+", "-", "÷", "*"];

  if (display.charAt(0) === "" && operator === "-") {
    populateDisplay("−");
    return -1;
  }

  if (display.charAt(0) === "−" && display.charAt(1) === "") {
    if (operator === "-") {
      populateDisplay("-");
    }
    return -1;
  }

  if (doesItContain(display, ops)) {
    let opIndex = findOpIndex();

    if (display.charAt(opIndex + 1) === "" && operator === "-") {
      populateDisplay("−");
      return -1;
    }
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
  checkToDisableDecimal();
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
  if (
    entry === "-" &&
    displayValue.length === 1 &&
    displayValue.charAt(0) === "−"
  ) {
    clearBtn();
    populateDisplay("-−");
    return -1;
  }
  displayValue = displayValue + entry;
  return displayValue;
}

//Gets the appropriate calculation variables from the display and gets the calculation answer
function equalBtn() {
  const ops = ["+", "-", "÷", "*"];
  let display = returnDisplayValue();

  if (!doesItContain(display, ops)) {
    return -1;
  }
  let operator = getOperator();
  let opIndex = findOpIndex();

  if (display.charAt(display.length - 1) === display.charAt(opIndex)) {
    let onlyNum = display.slice(0, display.length - 1);
    clearBtn();
    populateDisplay(checkIfNegative(operate(operator, onlyNum, onlyNum)));
    return -1;
  }

  let firstNum = display.slice(0, opIndex);
  let secondNum = display.slice(opIndex + 1, display.length);

  clearBtn();
  populateDisplay(checkIfNegative(operate(operator, firstNum, secondNum)));
  return -1;
}

function decimalBtn(decimal) {
  populateDisplay(decimal);
}

function checkToDisableDecimal() {
  document.querySelector(".decimalBtn").disabled = false;
  let display = returnDisplayValue();
  let opIndex = findOpIndex();
  if (opIndex >= "0") {
    document.querySelector(".decimalBtn").disabled = false;
    let secondNum = display.slice(opIndex + 1, display.length);
    if (secondNum.includes(".")) {
      document.querySelector(".decimalBtn").disabled = true;
      return;
    }
    return;
  }
  let firstNum = display;

  if (firstNum.includes(".")) {
    document.querySelector(".decimalBtn").disabled = true;
    return;
  }
}

//tells addToDisplay to erase the last character in the display
function backspaceBtn() {
  addToDisplay("backspace");
}

//Tells addToDisplay to clear the display
function clearBtn() {
  addToDisplay("clear");
}

//returns the value to be displayed
function returnDisplayValue() {
  return displayValue;
}

//helper function for checking if a string contains a substring from an array
function doesItContain(str, arr) {
  const contains = arr.some((element) => {
    if (str.includes(element)) {
      return true;
    }

    return false;
  });
  return contains;
}

//helper function for finding the operator index
function findOpIndex() {
  const ops = ["+", "-", "÷", "*"];
  const displayValueArr = returnDisplayValue().split("");

  const opIndex = displayValueArr.findIndex((index) =>
    doesItContain(index, ops)
  );

  return opIndex;
}

function getOperator() {
  let display = returnDisplayValue();
  let operatorSymbol = display.charAt(findOpIndex());

  if (operatorSymbol == "+") {
    return "add";
  }
  if (operatorSymbol == "-") {
    return "subtract";
  }
  if (operatorSymbol == "*") {
    return "multiply";
  }
  if (operatorSymbol == "÷") {
    return "divide";
  }
}

function checkIfNegative(entry) {
  entry = entry.toString();
  if (entry.charAt(0) === "-") {
    entry = entry.replace("-", "−");
  }
  return entry;
}
