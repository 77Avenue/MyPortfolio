let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let timerInterval;

const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');

// Start the stopwatch
startBtn.addEventListener('click', () => {
    clearInterval(timerInterval); 
    timerInterval = setInterval(updateTime, 10); // Update every 10ms (for milliseconds display)
});

// Stop the stopwatch
stopBtn.addEventListener('click', () => {
    clearInterval(timerInterval); // Pause the stopwatch
});

// Reset the stopwatch
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval); // Stop the stopwatch
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateTime(); // Update display to reset time
});

// Update the stopwatch display
function updateTime() {
    milliseconds += 10;

    if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;
    }

    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }

    if (minutes >= 60) {
        minutes = 0;
        hours++;
    }

    // Format the time as HH:MM:SS:MS
    const formattedTime = 
        (hours < 10 ? '0' + hours : hours) + ':' + 
        (minutes < 10 ? '0' + minutes : minutes) + ':' + 
        (seconds < 10 ? '0' + seconds : seconds) + ':' + 
        (milliseconds < 100 ? '0' + (milliseconds < 10 ? '0' + milliseconds : milliseconds) : milliseconds);

    timeDisplay.textContent = formattedTime;
}
