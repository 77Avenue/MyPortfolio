// clock.js

function updateClock() {
    const timezone = document.getElementById('timezone').value;
    const dateElement = document.getElementById('date');
    const clockElement = document.getElementById('clock');

    // Get current date and time in the selected timezone
    const now = new Date();
    const options = {
        timeZone: timezone,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    // Format date and time
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(now);

    // Separate the date and time parts
    const dateString = parts
        .filter(part => part.type !== 'hour' && 
                part.type !== 'minute' && part.type !== 'second' && 
                part.type !== 'dayPeriod')
        .map(part => part.value)
        .join('');
    const timeString = parts
        .filter(part => part.type === 'hour' || part.type 
            === 'minute' || part.type === 'second')
        .map(part => part.value)
        .join(':');

    // Display the date and time
    dateElement.textContent = dateString.trim();
    clockElement.textContent = timeString;
    

    
}