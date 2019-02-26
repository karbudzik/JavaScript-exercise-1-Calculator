/*--------------------------VARIABLES-----------------------------*/

// number currently entered:
let currentNumber = "0";

// previously entered number:
let lastNumber = "0";

// have we already used the "." button?
let decimals = false;

// next operation we are about to perform:
let nextOperation = null;

// do we need to make a reset? (e.g. after using the "=" sign):
let isResetNeeded = false;


/*----------------------PROPERTIES RESETTING-----------------------*/

// REFRESH SCREEN FUNCTION 
// to show the current (or entered) number on the screen: 

function refreshScreen(newValue = currentNumber) {
    document.querySelector("#screen").innerHTML = newValue;
}

// HARD RESET FUNCTION 
// clearing the screen and all the variables:

function hardReset() {
    currentNumber = "0";
    lastNumber = "0";
    decimals = false;
    nextOperation = null;
    isResetNeeded = false;
    refreshScreen();
}

// CALLING THE HARD RESET FUNCTION 
// while pressing the "AC" button

document.querySelector("#clear").addEventListener("click", hardReset);

// EQUAL KEY PRESSED FUNCTION
// reseting the calculation after pressing the "=" sign

function equalKeyPressed() {
    maybeProcessNextOperation();
    isResetNeeded = true;
}
document.querySelector("#equals").addEventListener("click", equalKeyPressed);


/*----------------------PERFORMING OPERATIONS---------------------*/

// PROCESS OPERATION FUNCTION
// performing the previously remembered operation and returning its result (cut after 8 signs if needed):

function processOperation(operation) {
    let result = operation(parseFloat(lastNumber), parseFloat(currentNumber)).toString();
    if (result.length < 8) {
        return result;
    } else {
        return result.substr(0, 7);
    }
}

// MAYBE PROCESS NEXT OPERATION FUNCTION
// performing the previously remembered operation (if there was one). Otherwise it prepares the screen to enter new number:

function maybeProcessNextOperation() {
    if (nextOperation) {
        lastNumber = processOperation(nextOperation);
    } else {
        lastNumber = currentNumber.toString();
    }
    refreshScreen(lastNumber);
}

// SCHEDULE NEXT OPERATION FUNCTION
// remembering the next operation to perform:

function scheduleNextOperation(operation) {
    if (isResetNeeded) {
        lastNumber = lastNumber.toString();
        isResetNeeded = false;
    } else {
        maybeProcessNextOperation();
    }
    nextOperation = operation;
    currentNumber = "0";
}

// NUMBER KEY PRESSED FUNCTION
// adding new number to the current number:

function numberKeyPressed( number ) {
  if( isResetNeeded === true ) {
    hardReset();
  }
  if( currentNumber === 0 || currentNumber === "0" ) {
    currentNumber = number.toString();
  }
  else if ( currentNumber.length < 7 ) {
    currentNumber += number.toString();
  }
  refreshScreen();
}


/*----------------------------BUTTONS----------------------------*/

// NUMERICAL BUTTONS
// calling the numberKeyPressed function while pressing the numerical buttons:

for (let i = 0; i <= 9; i++) {
    document.querySelector("#number" + i).addEventListener("click", function () { numberKeyPressed(i) });
}

// "%" BUTTON 
// changing the number into percentage:

function percent() {
    currentNumber = parseFloat(currentNumber) / 100
    refreshScreen(currentNumber);
}
document.querySelector("#percent").addEventListener("click", percent);

// "." BUTTON
// showing the dot on the screen (unless it already is on the screen):

function dotClicked() {
    if (decimals === false || currentNumber.indexOf(".") === -1) {
        currentNumber += ".";
        decimals = true;
        refreshScreen();
    }
}
document.querySelector("#dot").addEventListener("click", dotClicked);


// "+" BUTTON
// adding two numbers:

function sum(x, y) {
    return x + y;
}
document.querySelector("#sum").addEventListener("click", function () { scheduleNextOperation (sum) });

// "-" BUTTON
// substracting one number from another:

function substract(x, y) {
    return x - y;
}
document.querySelector("#substract").addEventListener("click", function () { scheduleNextOperation (substract) });

// "*" BUTTON
// multiplying two numbers:

function multiply(x, y) {
    return x * y;
}
document.querySelector("#multiply").addEventListener("click", function () { scheduleNextOperation (multiply) });

// "/" BUTTON
// dividing two numbers:

function divide(x, y) {
    return x / y;
}
document.querySelector("#divide").addEventListener("click", function () { scheduleNextOperation (divide) });