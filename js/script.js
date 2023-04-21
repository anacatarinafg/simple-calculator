const previousOperation = document.querySelector(
  ".calculator__operations--previous"
);
const currentOperation = document.querySelector(
  ".calculator__operations--current"
);
const allButtons = document.querySelectorAll("button");

class Calculator {
  constructor(previousOperation, currentOperation) {
    this.previousOperation = previousOperation; // this operation is what shows on the screen
    this.currentOperation = currentOperation; // this operation is what shows on the screen
    this.digitNumbers = ""; // this operation is what been writing (in real time)
  }

  // add digit to calculator screen
  addDigit(digit) {
    // check if digited numbers already has a dot
    if (digit === "." && this.currentOperation.innerText.includes(".")) {
      return; // if there is a dot on the current operation, then we can't write again the dot
    }
    this.digitNumbers = digit;
    this.updateScreen();
  }

  // process all calculator operations
  processOperations(operations) {
    // Check if current value is empty
    if (this.currentOperation.innerText === "" && operations !== "C") {
      // Change operation
      if (this.previousOperation.innerText !== "") {
        this.changeOperations(operations);
      }
      return;
    }

    // Get current and previous values
    let operationValue;
    const previous = +this.previousOperation.innerText.split(" ")[0];
    const current = +this.currentOperation.innerText;

    switch (operations) {
      case "+":
        operationValue = current + previous;
        this.updateScreen(operationValue, operations, current, previous);
        break;
      case "-":
        operationValue = current - previous;
        this.updateScreen(operationValue, operations, current, previous);
        break;
      case "/":
        operationValue = current / previous;
        this.updateScreen(operationValue, operations, current, previous);
        break;
      case "*":
        operationValue = current * previous;
        this.updateScreen(operationValue, operations, current, previous);
        break;
      case "DEL":
        this.DeleteOperator();
        break;
      case "CE":
        this.ceOperator();
        break;
      case "C":
        this.cOperator();
        break;
      case "=":
        this.equalOperator();
        break;
      default:
        return;
    }
  }

  // change values of the calculator screen
  updateScreen(
    operationValue = null,
    operations = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperation.innerText += this.digitNumbers; // The pressed numbers will show on screen
    } else {
      // if value is 0, if it is just add current value
      if (previous === 0) {
        operationValue = current;
      }

      // add current value to previous
      this.previousOperation.innerText = `${operationValue} ${operations}`;
      this.currentOperation.innerText = "";
    }
  }

  // Change math operation
  changeOperations(operations) {
    const mathOperations = ["+", "-", "/", "*"];

    if (!mathOperations.includes(operations)) {
      return;
    }
    this.previousOperation.innerText =
      this.previousOperation.innerText.slice(0, -1) + operations;
  }

  // Delete the last digit
  DeleteOperator() {
    this.currentOperation.innerText = this.currentOperation.innerText.slice(
      0,
      -1
    );
  }

  // Delete current operation
  ceOperator() {
    this.currentOperation.innerText = "";
  }

  // Delete curent and previous operation
  cOperator() {
    this.previousOperation.innerText = "";
    this.currentOperation.innerText = "";
  }

  // Equal operator
  equalOperator() {
    const operation = previousOperation.innerText.split(" ")[1];
    this.processOperations(operation);
  }
}

const myCalculator = new Calculator(previousOperation, currentOperation);

// Active the functionalities of the buttons
allButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const value = event.target.innerText;
    // console.log(value);
    // First we change the string (value) to number with the +. If the value is higher or equal to 0 || value is equal to ".", then { ... }
    if (+value >= 0 || value === ".") {
      myCalculator.addDigit(value);
    } else {
      myCalculator.processOperations(value);
    }
  });
});
