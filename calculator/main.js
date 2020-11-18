const DEFAULT_VALUE = 0;
const ERROR = "Error";

class Calculator {

  constructor(previousOperandValue, currentOperandValue) {
    this.previousOperandValue = previousOperandValue;
    this.currentOperandValue = currentOperandValue;
    this.clear();
  }

  clear() {
    this.currentOperand = DEFAULT_VALUE;
    this.previousOperand = "";
    this.operation = undefined;
    this.resetInput = false;
    this.showError = false;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);

    if (this.currentOperand === "") {
      this.currentOperand = DEFAULT_VALUE;
    }
  }

  negative() {
    if (this.currentOperand !== "") {
      return this.currentOperand = String (-1 * this.currentOperand);
    }
  }

  sqrt () {
    if (this.currentOperand !== "" && this.currentOperand > 0) {
      return  this.currentOperand = Math.sqrt(this.currentOperand);
    } else {
      this.showError = true;
      this.resetInput = true;
    }
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.toString().includes(number)) return;

    if (number === "0" && this.currentOperand === DEFAULT_VALUE) return;

    if (number === "." && this.currentOperand === "") return;


    if (this.resetInput) {
      this.resetInput = false;
      this.currentOperand = number;
      return;
    }

    if (this.currentOperand === DEFAULT_VALUE && number !== ".") {
     this.currentOperand = number.toString();
    } else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  }

  getPrecision(number) {
    return (number.toString().split(".")[1] || "").length;
  }

  chooseOperation(operation) {

    if (this.previousOperand !== "" && this.currentOperand !== DEFAULT_VALUE) {
      this.compute();
    }

    if (this.previousOperand !== "" && this.operation && this.currentOperand === DEFAULT_VALUE) {
      this.operation = operation;
      return;
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = DEFAULT_VALUE;

  }

  compute() {
    let computation;
    let computationPrecision;

    let currentValue = Number.parseFloat(this.currentOperand);
    let previousValue = Number.parseFloat(this.previousOperand);

    let previousPrecision = this.getPrecision(previousValue);
    let currentPrecision = this.getPrecision(currentValue);

    if (!this.operation || isNaN(previousValue) || isNaN(currentValue)) return;
    switch (this.operation) {
      case "+":
        computation = previousValue + currentValue;
        computationPrecision = Math.max(previousPrecision, currentPrecision);
        break;
      case "-":
        computation = previousValue - currentValue;
        computationPrecision = Math.max(previousPrecision, currentPrecision);
        break;
      case "*":
        computation = previousValue * currentValue;
        computationPrecision = previousPrecision + currentPrecision;
        break;
      case "÷":
        computation = previousValue / currentValue;
        break;
      case "^":
        computation = Math.pow(previousValue, currentValue);
        computationPrecision = previousPrecision * currentPrecision;
        break;
      default:
        return;
    }

    if (computationPrecision) {
      computation = +computation.toFixed(computationPrecision);
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
    this.resetInput = true;
  }

  getDisplayNumber(number) {
    let integerDisplay;
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    if (isNaN(integerDigits)) {
      integerDisplay = DEFAULT_VAL;
    } else {
      integerDisplay = integerDigits.toLocaleString('ru', { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    if (this.showError){
      this.currentOperandValue.innerText = ERROR;
    } else {
      this.currentOperandValue.innerText = this.getDisplayNumber(this.currentOperand);
    }

    if (this.operation !== undefined && !this.showError){
      this.previousOperandValue.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandValue.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearAllButton = document.querySelector("[data-all-clear]");
const previousOperandValue = document.querySelector("[data-previous-value]");
const currentOperandValue = document.querySelector("[data-current-value]");
const negativeButton = document.querySelector("[data-operation]")

const calc = new Calculator(previousOperandValue, currentOperandValue);

calc.updateDisplay();

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calc.appendNumber(button.innerText);
    calc.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let operation = button.dataset.operation;

    if (operation === "^") {
      calc.chooseOperation(operation);
    } else if (operation === "sqrt") {
      calc.sqrt();
    } else if (operation === "+/-"){
      calc.negative()
    }
    else {
      calc.chooseOperation(button.innerText);
    }
    calc.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calc.compute();
  calc.updateDisplay();
});

clearAllButton.addEventListener("click", () => {
  calc.clear();
  calc.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calc.delete();
  calc.updateDisplay();
});
