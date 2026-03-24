import calculate, {
    appendNumber, setOperator, subDisplay, clearDisplay,
    displayHistory as showHistory,
    VALID_NUMBERS, VALID_OPERATORS, history
} from './index.js';

window.appendNumber = appendNumber;
window.setOperator = setOperator;
window.calculate = calculate;
window.clearDisplay = clearDisplay;
window.subDisplay = subDisplay;

window.displayHistory = () => {
    const historyElement = document.getElementById("history");
    historyElement.classList.remove("d-none");
    historyElement.textContent = showHistory(history);
};

document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (VALID_NUMBERS.includes(key)) appendNumber(key);
    if (VALID_OPERATORS.includes(key)) setOperator(key);
    if (key === "Enter") calculate();
    if (key === "Backspace") subDisplay();
});
