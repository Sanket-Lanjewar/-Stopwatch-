let startTime, updatedTime, difference, tInterval, savedTime = 0, running = false;
let lapTimes = [];
const display = document.getElementById('display');
const lapTimesList = document.getElementById('lapTimes');

// Start or Stop the stopwatch
document.getElementById('startStopBtn').addEventListener('click', function() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(updateTime, 1000); // Update every second
        running = true;
        this.textContent = "Stop";
    } else {
        clearInterval(tInterval);
        savedTime = difference;
        running = false;
        this.textContent = "Start";
    }
});

// Reset the stopwatch
document.getElementById('resetBtn').addEventListener('click', function() {
    clearInterval(tInterval);
    savedTime = 0;
    running = false;
    display.textContent = "00:00:00";
    document.getElementById('startStopBtn').textContent = "Start";
    lapTimes = [];
    lapTimesList.innerHTML = '';
});

// Record a lap time
document.getElementById('lapBtn').addEventListener('click', function() {
    if (running) {
        lapTimes.push(display.textContent);
        renderLapTimes();
    }
});

// Update the time displayed
function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    display.textContent = hours + ":" + minutes + ":" + seconds;
}

function renderLapTimes() {
    lapTimesList.innerHTML = lapTimes.map(time => `<li>${time}</li>`).join('');
}
