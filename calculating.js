const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const screen = document.querySelector('#displayScreen');
const dotBtn = document.querySelector('#dot');

let expression = '';
let operator = '';
let allOperators = '';

// this function displays a number or an operator on the screen
function displayOnScreen(btnClicked){
    screen.append(btnClicked);
}

// when u click AC, it will call this function to delete everything
function clearScreen(){
    screen.textContent = '';
    resetOperating();
}

// delete one thing each time u clicked on 'DEL'. BUT the problem here
// is that I don't know how to deal with the operator var
function deleteSingleText(){
    screen.textContent = screen.textContent.slice(0,-1);
    expression = expression.slice(0,-1);
    if(isLastCharAnOperator()){
        allOperators = allOperators.slice(0, -1);
    }
}

// as you see, its a function for adding two numbers
function adding(num1, num2){
    return num1 + num2;
}

// as you see, its a function for subtracting two numbers
function subtracting(num1, num2){
    return num1 - num2;
}

// as you see, its a function for multiplying two numbers
function multiplying(num1, num2){
    return num1 * num2;
}

// as you see, its a function for dividing two numbers
function dividing(num1, num2){
    return num1 / num2;
}

// when you click on the '=' button, it calls this function to check if the
// operator var matches one of the four cases. If it matches, it will call one 
// of the four fucntions above 
function operate(){ 
    let number;
    let result = document.createElement('div');
    result.style.marginLeft = 'auto';

    if(allOperators.length === 1){
        number = expression.split(allOperators.charAt(0)); 
        operator = allOperators.charAt(0);  
    }
    else if(allOperators.charAt(0) === '-' || allOperators.charAt(0) === '+'){
        if(expression.includes(allOperators.charAt(1))){
            number = expression.split(allOperators.charAt(1)); 
            operator = allOperators.charAt(1);
        }
        else{
            number = expression.split(allOperators.charAt(0)); 
            operator = allOperators.charAt(0); 
        }
    }
    else{
        number = expression.split(allOperators.charAt(0)); 
        operator = allOperators[0];
    }
      
    let num1 = parseFloat(number[0], 10);  
    let num2 = parseFloat(number[1], 10);  

    if(isLastCharAnOperator()){
        result.style.fontSize = '30px';
        result.innerHTML = 'Syntax Error' + "<br/>" + 'Click AC';
        screen.textContent = '';
    }
    else{
        switch(operator){ 
            case '+': 
                result.textContent = adding(num1, num2); 
                expression = result.textContent;  
                screen.textContent = '';
                break;
            case '-': 
                result.textContent = subtracting(num1, num2); 
                expression = result.textContent; 
                screen.textContent = '';
                break;
            case 'x':
                result.textContent = multiplying(num1, num2); 
                expression = result.textContent; 
                screen.textContent = '';
                break;
            case '/': 
                if(num1 === 0 && num2 === 0){
                    result.textContent = 0;
                    screen.textContent = '';
                }
                else if(num1 === 0){
                    result.textContent = 0;
                    screen.textContent = '';
                }
                else if(num2 === 0){
                    result.style.fontSize = '30px';
                    result.innerHTML = 'Math Error' + "<br/>" + 'Click AC';
                    screen.textContent = '';
                }   
                else{
                    result.textContent = dividing(num1, num2);
                    expression = result.textContent;
                    screen.textContent = '';
                }
                break;
        }
        operator = '';
        allOperators = allOperators.substring(1);
    }

    displayOnScreen(result);
    return result;
}

// basically when u click '.' button it will add '.' to the screen and to the 
// expression var. Unfortunately, I didn't know how to disable if the user wanted 
// to add another '.' on the same operand
function addDot(){
    expression += '.'; 
    screen.textContent += '.';
}

// this function for reseting everything
function resetOperating(){
    operator = '';
    expression = '';
    allOperators = '';
    dotBtn.disabled = false;
}

// chceks if the last element on the screen is an operator or not
function isLastCharAnOperator(){
    return isNaN(expression.charAt(expression.length - 1));
}

// checks if there is an operator before a number
function isTheCharBeforeTheNumberAnOperator(){
    return isNaN(expression.charAt(expression.length - 2)); 
}

// checks if there is a '.' on the screen
function isThereADotOnTheScreen(){
    return expression.charAt(expression.length - 2) === '.';
}

// whenever u click on a number it will go through series of conditions and at last
// it will print the number on the screen
function numberClicked(event){
    let btnClicked = event;

    expression += btnClicked;  

    if(isThereADotOnTheScreen()){
        displayOnScreen(btnClicked);
        return;
    }

    if(expression.includes(operator)){
        if(isTheCharBeforeTheNumberAnOperator()){
            screen.textContent = '';
        }
        displayOnScreen(btnClicked);
    }
    else{
        displayOnScreen(btnClicked);
    }
}

// whenever u click on an operator it will go through a series of conditions.
// as u see below
function operatorClicked(event){
    let arithmeticOperator = event;

    switch(arithmeticOperator){
        case '=':
            operate();
            break;
        case 'AC':
            clearScreen();
            break;
        case 'DEL':
            deleteSingleText();
            break;
        case '.':
            if(isTheCharBeforeTheNumberAnOperator()){
                addDot();
            }
            else if(expression.includes('.')){
                dotBtn.disabled = true;
            }
            else{
                addDot();
            }
            break;
        default:
            if(operator.length === 0){
                operator = arithmeticOperator;  
            } 
            
            allOperators += arithmeticOperator;      
            
            if(allOperators.length === 2){
                if(isTheCharBeforeTheNumberAnOperator()){
                    operate();
                }
            }
            expression += arithmeticOperator;  
            break;
    }
}

numbers.forEach(number => {
    number.addEventListener('click', ev => {
        numberClicked(ev.target.value);
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', ev => {
        operatorClicked(ev.target.value);
    });
});