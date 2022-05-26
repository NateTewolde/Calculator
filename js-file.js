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

//goal: when buttons are clicked they show up on the
//display and are saved
//steps: add click event listener to every button using a loop X
// text content of button needs to be appended as a
//string for the digits, saved and show up in the display
function formatButtons() {
  const btns = document.querySelectorAll("button");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      window[btn.className](btn.textContent);
      //if button clicked is a digit-btn send it to digitButton();
      //else if its a operator button send it to operatorButton();
      //else if its the = button send it to equalButton();
      //else if its the clear button send it to clearButton();
      //else if its the . button send it to the decimalButton();
      //optionally, if its the backspace button send it to backSpace();
    });
  });
}

//Appends new digit to old digit/digits pressed.
function digitBtn(digit) {
  populateDisplay(digit);
}

function operatorBtn(operator) {
  console.log(operator);
}

//Adds the visible display for the user
function populateDisplay(entry) {
  const display = document.querySelector(".display");
  display.textContent = addToDisplay(entry);
}

function addToDisplay(entry) {
  displayValue = displayValue + entry;
  return displayValue;
}
