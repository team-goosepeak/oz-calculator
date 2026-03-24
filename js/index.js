import calculateOperation from './operations.js';
import {
    resetDisplay, setDisplay,
    subDisplay as _subDisplay,
    appendNumber as _appendNumber,
    setOperator as _setOperator,
    VALID_NUMBERS, VALID_OPERATORS
} from './input.js';
import { showError, removeError } from './error.js';
import saveHistory, { displayHistory } from './history.js';

let history = []; // History for exponent operations and displaying records
let currentInput = "";
let firstNumber = null;
let operator = null;
let isError = false;

const appendNumber = (number) => {
    try {
        currentInput = _appendNumber(number, currentInput);
        removeError();
    } catch (error) {
        showError(error.message);
    }
};

const setOperator = (op) => {
    try {
        _setOperator(op, currentInput);
        firstNumber = Number(currentInput);
        if (isNaN(firstNumber)) throw new Error("유효한 숫자를 입력하세요.");
        operator = op;
        currentInput = resetDisplay();
    } catch (error) {
        showError(error.message);
    }
};

const subDisplay = () => {
    currentInput = _subDisplay();
};

const clearDisplay = () => {
    currentInput = resetDisplay();
    firstNumber = null;
    operator = null;
    document.getElementById("result").classList.add("d-none");
};

export default function calculate() {
    try {
        if (firstNumber === null || operator === null || !currentInput) {
            isError = true;
            throw new Error("계산에 필요한 값이 부족합니다.");
        }
        const secondNumber = Number(currentInput);
        if (isNaN(secondNumber)) {
            isError = true;
            throw new Error("유효한 숫자를 입력하세요.");
        }
        const result = calculateOperation(firstNumber, secondNumber, operator);
        saveHistory(firstNumber, operator, secondNumber, result, history);
        const resultElement = document.getElementById("result");
        resultElement.classList.remove("d-none", "alert-danger");
        resultElement.classList.add("alert-info");
        resultElement.textContent = `결과: ${result}`;
        currentInput = resetDisplay();
        firstNumber = null;
        operator = null;
    } catch (error) {
        showError(error.message);
    }
}

const functions = { calculateOperation, appendNumber, setOperator, showError, saveHistory, displayHistory };
for (const func in functions) {
    console.log(`Available function: ${func}`);
}

export {
    appendNumber, setOperator, subDisplay, clearDisplay,
    resetDisplay, setDisplay, showError, removeError,
    calculateOperation, saveHistory, displayHistory,
    VALID_NUMBERS, VALID_OPERATORS,
    history, currentInput, firstNumber, operator, isError
};
