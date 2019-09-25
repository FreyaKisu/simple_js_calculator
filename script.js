//main classes of the calculator:
const display = document.querySelector(".calculator__display");
const calculator = document.querySelector(".calculator");
const buttons = calculator.querySelector(".calculator__buttons");

//the calculating functionalities:
const calculate = (n1, operator, n2) => {
  //parsing the characters to numbers
  const firstNumber = parseFloat(n1);
  const secondNumber = parseFloat(n2);

  if (operator === "add") {
    return firstNumber + secondNumber;
  }
  if (operator === "subtract") {
    return firstNumber - secondNumber;
  }
  if (operator === "multiply") {
    return firstNumber * secondNumber;
  }
  if (operator === "divide") {
    return firstNumber / secondNumber;
  }
};

//adding onClick eventlisteners to the buttons
buttons.addEventListener("click", e => {
  if (e.target.matches("button")) {
    const button = e.target;
    const action = button.dataset.action;
    const buttonContent = button.textContent;
    const displayedNumber = display.textContent;

    // Remove the "is-depressed" class from all the buttons
    Array.from(button.parentNode.children).forEach(b =>
      b.classList.remove("is-depressed")
    );
    //
    if (!action) {
      const previousButtonType = calculator.dataset.previousButtonType;
      if (
        displayedNumber === "0" ||
        previousButtonType === "operator" ||
        previousButtonType === "calculate"
      ) {
        display.textContent = buttonContent;
      } else {
        display.textContent = displayedNumber + buttonContent;
      }
      calculator.dataset.previousButtonType = "Number";
    }

    if (action === "decimal") {
      if (!displayedNumber.includes(".")) {
        display.textContent = displayedNumber + ".";
      } else if (
        previousButtonType === "operator" ||
        previousButtonType === "calculate"
      ) {
        display.textContent = "0.";
      }
      calculator.dataset.previousButtonType = "decimal";
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const firstAmount = calculator.dataset.firstAmount;
      const operator = calculator.dataset.operator;
      const secondAmount = displayedNumber;
      const previousButtonType = calculator.dataset.previousButtonType;
      if (
        firstAmount &&
        operator &&
        previousButtonType !== "operator" &&
        previousButtonType !== "calculate"
      ) {
        const calcAmount = calculate(firstAmount, operator, secondAmount);
        display.textContent = calcAmount;
        // Update calculated Amount as firstAmount
        calculator.dataset.firstAmount = calcAmount;
      } else {
        // If there are no calculations, set displayedNumber as the firstAmount
        calculator.dataset.firstAmount = displayedNumber;
      }

      button.classList.add("is-depressed");
      // Add custom attribute
      calculator.dataset.previousButtonType = "operator";
      calculator.dataset.firstAmount = displayedNumber;
      calculator.dataset.operator = action;
    }

    if (action === "decimal") {
      if (!displayedNumber.includes(".")) {
        display.textContent = displayedNumber + ".";
      }
      if (calculator.dataset.previousButtonType === "operator") {
        display.textContent = "0.";
      }
      calculator.dataset.previousButtonType = "decimal";
    }

    if (action === "clear") {
      if (button.textContent === "AC") {
        calculator.dataset.firstAmount = "";
        calculator.dataset.newAmount = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousButtonType = "";
      } else {
        button.textContent = "AC";
      }
      display.textContent = 0;
      calculator.dataset.previousButtonType = "clear";
    }
    if (action !== "clear") {
      const clearButton = calculator.querySelector("[data-action=clear]");
      clearButton.textContent = "CE";
    }

    if (action === "calculate") {
      let firstAmount = calculator.dataset.firstAmount;
      const operator = calculator.dataset.operator;
      let secondAmount = displayedNumber;
      const previousButtonType = calculator.dataset.previousButtonType;
      if (firstAmount) {
        if (previousButtonType === "calculate") {
          firstAmount = displayedNumber;
          secondAmount = calculator.dataset.newAmount;
        }
        display.textContent = calculate(firstAmount, operator, secondAmount);
      }
      // Setting newAmount attribute
      calculator.dataset.newAmount = secondAmount;
      calculator.dataset.previousButtonType = "calculate";
    }
  }
});
