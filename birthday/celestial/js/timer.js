// ================== GLOBALS ==================
var timerInterval = null;
var initializeClockAttempts = 0;
var maxInitializeAttempts = 5;

// ================== PLACEHOLDERS ==================
function displayTimerPlaceholders(clockId) {
  var clock = document.getElementById(clockId);
  if (!clock) return;

  clock.querySelector(".days").innerHTML = "--";
  clock.querySelector(".hours").innerHTML = "--";
  clock.querySelector(".minutes").innerHTML = "--";
  clock.querySelector(".seconds").innerHTML = "--";

  document.getElementById("resultdays").innerHTML = "days";
  document.getElementById("resulthours").innerHTML = "hours";
  document.getElementById("resultminutes").innerHTML = "minutes";
  document.getElementById("resultseconds").innerHTML = "seconds";
}

// ================== INIT CLOCK ==================
function initializeClock(id) {
  // FIXED WEDDING DATE
  var dateStr = "2026-06-25"; // 25 June 2026
  var time = "00:00"; // midnight
  var timezoneOffset = 0;

  var endtime = new Date(`${dateStr}T${time}:00`);

  if (isNaN(endtime.getTime())) {
    displayTimerPlaceholders(id);
    return;
  }

  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector(".days");
  var hoursSpan = clock.querySelector(".hours");
  var minutesSpan = clock.querySelector(".minutes");
  var secondsSpan = clock.querySelector(".seconds");
  const timerTitle = clock.closest(".timer")?.querySelector("p");

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = Math.abs(t.days);
    hoursSpan.innerHTML = ("0" + Math.abs(t.hours)).slice(-2);
    minutesSpan.innerHTML = ("0" + Math.abs(t.minutes)).slice(-2);
    secondsSpan.innerHTML = ("0" + Math.abs(t.seconds)).slice(-2);

    getTimeLabel(t);

    if (timerTitle) {
      if (t.total <= 0) {
        timerTitle.textContent = "It's my Special Day:";
      } else {
        timerTitle.textContent = "Getting closer to my special day!";
      }
    }
  }

  if (timerInterval) clearInterval(timerInterval);
  updateClock();
  timerInterval = setInterval(updateClock, 1000);
}

// ================== TIME CALC ==================
function getTimeRemaining(endtime) {
  var t = endtime.getTime() - new Date().getTime();
  return {
    total: t,
    days: Math.floor(t / (1000 * 60 * 60 * 24)),
    hours: Math.floor((t / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((t / (1000 * 60)) % 60),
    seconds: Math.floor((t / 1000) % 60),
  };
}

// ================== ENGLISH LABELS ==================
function getTimeLabel(props) {
  const { days, hours, minutes, seconds } = props;

  document.getElementById("resultdays").innerHTML = plural(Math.abs(days), [
    "day",
    "days",
  ]);
  document.getElementById("resulthours").innerHTML = plural(Math.abs(hours), [
    "hour",
    "hours",
  ]);
  document.getElementById("resultminutes").innerHTML = plural(
    Math.abs(minutes),
    ["minute", "minutes"]
  );
  document.getElementById("resultseconds").innerHTML = plural(
    Math.abs(seconds),
    ["second", "seconds"]
  );
}

function plural(n, forms) {
  return n === 1 ? forms[0] : forms[1];
}

// ================== START ==================
window.addEventListener("load", function () {
  initializeClockAttempts = 0;
  initializeClock("clockdiv");
});
