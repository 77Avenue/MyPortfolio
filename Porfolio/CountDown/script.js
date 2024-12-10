let countdownTime = 1440; // Initial countdown time in seconds (24 hour)
let intervalId;
let isRunning = false;

const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const continueBtn = document.getElementById('continue-btn');
const resetBtn = document.getElementById('reset-btn');

// Function to format time
function formatTime(seconds) {

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
}

// Start the countdown
startBtn.addEventListener('click', () => {
    if (!isRunning) {
        clearInterval(intervalId);
        intervalId = setInterval(decrementTime, 1000);
        isRunning = true;
    }
});

// Stop the countdown
stopBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    isRunning = false;
});

// Continue the countdown
continueBtn.addEventListener('click', () => {
    if (!isRunning) {
        intervalId = setInterval(decrementTime, 1000);
        isRunning = true;
    }
});

// Reset the countdown
resetBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    countdownTime = 1440; // Reset to initial time (24 hours)
    timeDisplay.textContent = formatTime(countdownTime);
    isRunning = false;
});

// Decrement the countdown time
function decrementTime() {
    countdownTime--;
    if (countdownTime < 0) {
        countdownTime = 1440 // Reset the countdown after it reaches 0 (infinite loop)
    }
    timeDisplay.textContent = formatTime(countdownTime);
}

// Initial display setup
timeDisplay.textContent = formatTime(countdownTime);
