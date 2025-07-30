document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const startPauseBtn = document.getElementById('startPause');
    const resetBtn = document.getElementById('reset');
    const lapBtn = document.getElementById('lap');
    const lapsList = document.getElementById('laps');

    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;
    let lapCount = 0;

    // Format time as HH:MM:SS.mm
    function formatTime(time) {
        const date = new Date(time);
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');
        const milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
        
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    function updateDisplay() {
        display.textContent = formatTime(elapsedTime);
    }

    function startTimer() {
        if (!isRunning) {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(function() {
                elapsedTime = Date.now() - startTime;
                updateDisplay();
            }, 10);
            isRunning = true;
            startPauseBtn.textContent = 'Pause';
            startPauseBtn.classList.add('running');
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            startPauseBtn.textContent = 'Start';
            startPauseBtn.classList.remove('running');
        }
    }

    function resetTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        elapsedTime = 0;
        updateDisplay();
        startPauseBtn.textContent = 'Start';
        startPauseBtn.classList.remove('running');
        lapsList.innerHTML = '';
        lapCount = 0;
    }

    function recordLap() {
        if (isRunning || elapsedTime > 0) {
            lapCount++;
            const lapTime = formatTime(elapsedTime);
            const lapItem = document.createElement('li');
            lapItem.innerHTML = `<span class="lap-number">Lap ${lapCount}</span><span>${lapTime}</span>`;
            lapsList.prepend(lapItem);
            
            // Scroll to top to see the new lap
            lapsList.scrollTop = 0;
        }
    }

    // Button event listeners
    startPauseBtn.addEventListener('click', startTimer);
    resetBtn.addEventListener('click', resetTimer);
    lapBtn.addEventListener('click', recordLap);

    // Keyboard controls
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            startTimer();
        } else if (e.code === 'KeyL') {
            recordLap();
        } else if (e.code === 'KeyR') {
            resetTimer();
        }
    });

    // Initialize display
    updateDisplay();
});