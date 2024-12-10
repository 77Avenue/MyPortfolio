let account = {
    pin: "1234",
    balance: 1000,
    dailyLimit: 250,
    transactionHistory: [],
};

let dailyWithdrawn = 0;

function enterPin() {
    const pinInput = document.getElementById("pin-input").value;
    const display = document.getElementById("display");

    if (pinInput === account.pin) {
        display.textContent = "Access Granted.\nWelcome to your account!";
        document.getElementById("controls").classList.remove("hidden");
        document.getElementById("input-section").classList.add("hidden");
    } else {
        display.textContent = "Error: Invalid PIN";
    }

    document.getElementById("pin-input").value = "";
}

function checkBalance() {
    const display = document.getElementById("display");
    display.textContent = `Account Balance: £${account.balance}`;
}

function depositMoney() {
    const amountInput = document.getElementById("amount-input");
    const amount = parseFloat(amountInput.value);
    const display = document.getElementById("display");

    if (isNaN(amount) || amount <= 0) {
        display.textContent = "Error: Invalid amount!";
        return;
    }

    account.balance += amount;
    account.transactionHistory.push(`Deposited: £${amount}`);
    display.textContent = `Deposited £${amount} successfully.\nNew Balance: £${account.balance}`;
    amountInput.value = "";
}

function withdrawMoney() {
    const amountInput = document.getElementById("amount-input");
    const amount = parseFloat(amountInput.value);
    const display = document.getElementById("display");

    if (isNaN(amount) || amount <= 0) {
        display.textContent = "Error: Invalid amount!";
        return;
    }

    if (amount > account.balance) {
        display.textContent = "Error: Insufficient funds!";
    } else if (dailyWithdrawn + amount > account.dailyLimit) {
        display.textContent = "Error: Daily withdrawal limit exceeded!";
    } else {
        account.balance -= amount;
        dailyWithdrawn += amount;
        account.transactionHistory.push(`Withdrew: £${amount}`);
        display.textContent = `Withdrew £${amount} successfully.\nNew Balance: £${account.balance}`;
    }

    amountInput.value = "";
}

function changePin() {
    const newPinInput = document.getElementById("new-pin-input").value;
    const display = document.getElementById("display");

    if (newPinInput.length === 4 && !isNaN(newPinInput)) {
        account.pin = newPinInput;
        display.textContent = "PIN changed successfully!";
    } else {
        display.textContent = "Error: Invalid PIN. Must be 4 digits.";
    }

    document.getElementById("new-pin-input").value = "";
}

function showHistory() {
    const display = document.getElementById("display");
    display.textContent = "Transaction History:\n" + (account.transactionHistory.join("\n") || "No transactions yet.");
}

function logout() {
    document.getElementById("controls").classList.add("hidden");
    document.getElementById("input-section").classList.remove("hidden");
    document.getElementById("display").textContent = "Please Enter Your PIN";
}
