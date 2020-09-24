class Calculator {
    constructor(previousOperandValue, currentOperandValue) {
        this.previousOperandValue = previousOperandValue;
        this.currentOperandValue = currentOperandValue;
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearAllButton = document.querySelector('[data-all-cleare]');
const previousOperandValue = document.querySelector('[data-previous-value]');
const currentOperandValue = document.querySelector('[data-current-value]');

const calc = new Calculator(previousOperandValue, currentOperandValue);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {

    })
})