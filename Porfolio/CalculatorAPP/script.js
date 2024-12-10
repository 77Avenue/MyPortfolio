function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteLast() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function insertNumber(number) {
    let display = document.getElementById('display');
    display.value += number;
}

function insertOperator(operator) {
    let display = document.getElementById('display');
    display.value += operator;
}

function insertDecimal() {
    let display = document.getElementById('display');
    if (!display.value.includes('.')) {
        display.value += '.';
    }
}

function insertFunction(func) {
    let display = document.getElementById('display');
    let value = parseFloat(display.value);

    if (func === 'sqrt') {
        display.value = Math.sqrt(value);
    } else if (func === 'square') {
        display.value = Math.pow(value, 2);
    } else if (func === 'sin') {
        display.value = Math.sin(value * (Math.PI / 180)); // Convert to radians
    } else if (func === 'cos') {
        display.value = Math.cos(value * (Math.PI / 180)); // Convert to radians
    } else if (func === 'tan') {
        display.value = Math.tan(value * (Math.PI / 180)); // Convert to radians
    } else if (func === 'log') {
        display.value = Math.log10(value);
    }
}

function calculate() {
    let display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch (e) {
        display.value = 'Error';
    }
}