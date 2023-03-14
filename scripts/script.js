const primaryOperand = document.querySelector("[data-primary-operand]");
const secondaryOperand = document.querySelector("[data-secondary-operand]");
const dataOperation = document.querySelector("[data-operation]");
const dataResult = document.querySelector("[data-result]");
const dataNumber = document.querySelector("[data-number]");
const INITIAL_VALUE = 0;

let primaryInput = "";

document.addEventListener("click", (event) => {
  event.preventDefault();
  const inputValue = event.target.innerText;

  if (!event.target.matches("button")) {
    return;
  }
  checkTypeOfButton(inputValue);
});

const checkTypeOfButton = (inputValue) => {
  switch (inputValue) {
    case "÷":
      handleDivision();
      break;
    case "*":
      handleMultiplication();
      break;
    case "+":
      handleSum();
      break;
    case "-":
      handleSubtraction();
      break;
    case "AC":
      resetAll();
      break;
    case "=":
      handleEquals(dataOperation.innerText);
      break;
    case "DEL":
      deleteDigit();
      break;
    default:
      getInputValue(inputValue);
  }
};

const checkTypeOfOperand = (dataOperand) => {
  let value = 0;
  switch (dataOperand) {
    case "+":
      value = doSum(primaryOperand.innerText, secondaryOperand.innerText);
      break;
    case "-":
      value = doSubtraction(
        primaryOperand.innerText,
        secondaryOperand.innerText
      );
      break;
    case "÷":
      value = doDivision(primaryOperand.innerText, secondaryOperand.innerText);

      break;
    case "*":
      value = doMultiplication(
        primaryOperand.innerText,
        secondaryOperand.innerText
      );
      break;
  }
  return value;
};

const getInputValue = (value) => {
  if (value === "." && primaryOperand.innerText.includes(".")) {
    return;
  }
  primaryInput += value;
  primaryOperand.innerText += value;
  primaryOperand.dataset.value = primaryInput;
};

const handleOperations = (symbol, val) => {
  if (!primaryOperand.innerText && !secondaryOperand.innerText) {
    primaryOperand.innerText = INITIAL_VALUE;
    dataOperation.innerText = symbol;
    secondaryOperand.innerText = INITIAL_VALUE;
  } else if (!primaryOperand.innerText && secondaryOperand.innerText) {
    dataOperation.innerText = symbol;
  } else if (primaryOperand.innerText && !secondaryOperand.innerText) {
    secondaryOperand.innerText += primaryOperand.innerText;
    primaryOperand.innerText = "";
    primaryOperand.dataset.value = "";
    dataOperation.innerText = symbol;
  } else {
    const value = val;
    primaryOperand.innerText = "";
    primaryOperand.dataset.value = "";
    dataOperation.innerText = "";
    secondaryOperand.innerText = value;
  }
};

const handleSum = () => {
  handleOperations(
    "+",
    doSum(primaryOperand.innerText, secondaryOperand.innerText)
  );
};

const handleSubtraction = () => {
  handleOperations(
    "-",
    doSubtraction(primaryOperand.innerText, secondaryOperand.innerText)
  );
};

const handleDivision = () => {
  handleOperations(
    "÷",
    doDivision(primaryOperand.innerText, secondaryOperand.innerText)
  );
};

const handleMultiplication = () => {
  handleOperations(
    "*",
    doMultiplication(primaryOperand.innerText, secondaryOperand.innerText)
  );
};

const deleteDigit = () => {
  const numberString = primaryOperand.innerText;
  if (numberString <= INITIAL_VALUE) {
    primaryOperand.innerText = "";
    return;
  }
  primaryOperand.innerText = numberString.substring(0, numberString.length - 1);
};

const resetAll = () => {
  primaryInput = "";
  primaryOperand.innerText = "";
  secondaryOperand.innerText = "";
  primaryOperand.dataset.value = "";
  dataOperation.innerText = "";
};

const doSum = (x, y) => {
  const value1 = x * 1;
  const value2 = y * 1;
  const result = value2 + value1;
  return result;
};

const doMultiplication = (x, y) => {
  const value1 = x * 1;
  const value2 = y * 1;
  const result = value2 * value1;
  return result;
};

const doSubtraction = (x, y) => {
  const value1 = x * 1;
  const value2 = y * 1;
  const result = value2 - value1;
  return result;
};

const doDivision = (x, y) => {
  const value1 = x * 1;
  const value2 = y * 1;
  const result = value2 / value1;
  return result;
};

const handleEquals = (dataOperand) => {
  if (!primaryOperand.innerText && !secondaryOperand.innerText) {
    return;
  } else if (!primaryOperand.innerText && secondaryOperand.innerText) {
    primaryOperand.innerText = secondaryOperand.innerText;
    primaryOperand.dataset.value = secondaryOperand.innerText;
    primaryInput = secondaryOperand.innerText * 1;
    dataOperation.innerText = "";
    secondaryOperand.innerText = "";
  } else if (primaryOperand.innerText && !secondaryOperand.innerText) {
    secondaryOperand.innerText += primaryOperand.innerText;
    primaryOperand.innerText = "";
    primaryOperand.dataset.value = "";
    dataOperation.innerText = "";
  } else {
    const value = checkTypeOfOperand(dataOperand)
    primaryOperand.innerText = "";
    primaryOperand.dataset.value = "";
    dataOperation.innerText = "";
    secondaryOperand.innerText = value;
    primaryInput = value * 1;
  }
};

