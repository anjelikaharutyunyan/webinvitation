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

  document.getElementById("resultdays").innerHTML = "օր";
  document.getElementById("resulthours").innerHTML = "ժամ";
  document.getElementById("resultminutes").innerHTML = "րոպե";
  document.getElementById("resultseconds").innerHTML = "վայրկյան";
}

// ================== INIT CLOCK ==================
function initializeClock(id) {
  // FIXED WEDDING DATE
  var dateStr = "2026-04-12";
  var time = "00:00"; // midnight

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
        timerTitle.textContent = "Այսօր մեր հատուկ օրն է 💍";
      } else {
        timerTitle.textContent = "Մենք ընտանիք կլինենք";
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

// ================== ARMENIAN LABELS ==================
function getTimeLabel(props) {
  const { days, hours, minutes, seconds } = props;

  document.getElementById("resultdays").innerHTML = "օր";
  document.getElementById("resulthours").innerHTML = "ժամ";
  document.getElementById("resultminutes").innerHTML = "րոպե";
  document.getElementById("resultseconds").innerHTML = "վայրկյան";
}

// ================== START ==================
window.addEventListener("load", function () {
  initializeClockAttempts = 0;
  initializeClock("clockdiv");
});
