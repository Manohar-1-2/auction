const EventEmitter = require('events');
const serverEventEmitter = new EventEmitter();
let countdownDuration = 60; // 30 seconds
let countdownInterval;


function startCountdown() {
  console.log(`Countdown started: ${countdownDuration} seconds`);
  countdownInterval = setInterval(() => {
    countdownDuration--;

    if (countdownDuration <= 0) {
      clearInterval(countdownInterval);
      serverEventEmitter.emit("timeRanOut")
      countdownDuration=60;
    }
  }, 1000);
}

function resetCountdown() {
  clearInterval(countdownInterval);
  countdownDuration = 60;
  startCountdown();
}

// Start the initial countdown
module.exports={startCountdown,serverEventEmitter,resetCountdown}

