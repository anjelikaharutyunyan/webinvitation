const videoBtn = document.querySelector(".video-btn");
const icon = videoBtn.querySelector("ion-icon");
const audio = document.getElementById("wedding-music");

// Set start time in seconds
const START_TIME = 20;

videoBtn.addEventListener("click", () => {
  if (icon.getAttribute("name") === "play-circle-outline") {
    icon.setAttribute("name", "pause-circle-outline");

    audio.currentTime = START_TIME;

    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
      icon.setAttribute("name", "play-circle-outline");
    });
  } else {
    icon.setAttribute("name", "play-circle-outline");
    audio.pause();
  }
});

audio.addEventListener("ended", function () {
  audio.currentTime = START_TIME;
  if (icon.getAttribute("name") === "pause-circle-outline") {
    audio.play();
  }
});

////. Timer
const targetDate = new Date("2026-03-31T00:00:00");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    daysEl.textContent = 0;
    hoursEl.textContent = 0;
    minutesEl.textContent = 0;
    secondsEl.textContent = 0;
    clearInterval(interval);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

updateCountdown();
const interval = setInterval(updateCountdown, 1000);

const form = document.getElementById("invitation-form");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent actual form submission

  const guestName = document.getElementById("guest-name").value.trim();
  const selectedOption = document.querySelector(
    'input[name="attendance"]:checked'
  );

  if (!guestName) {
    alert("Խնդրում ենք մուտքագրել Ձեր անունը:");
    return;
  }

  if (!selectedOption) {
    alert("Խնդրում ենք ընտրել մասնակցության տարբերակ:");
    return;
  }

  const attendanceText =
    selectedOption.value === "yes" ? "կմասնակցեմ" : "չեմ կարող մասնակցել";

  // Build the WhatsApp message
  const message = `Ողջույն! \nՁեր անունը: ${guestName}\nՄասնակցություն: ${attendanceText}`;

  // WhatsApp number
  const phoneNumber = "37477260178";
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Open WhatsApp link
  window.open(whatsappURL, "_blank");

  // Reset form
  form.reset();
});

// Disable right click
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

// Disable key combinations
document.addEventListener("keydown", function (e) {
  // F12
  if (e.keyCode === 123) {
    e.preventDefault();
  }

  // Ctrl+Shift+I / Cmd+Opt+I
  if (
    (e.ctrlKey && e.shiftKey && e.keyCode === 73) ||
    (e.metaKey && e.altKey && e.keyCode === 73)
  ) {
    e.preventDefault();
  }

  // Ctrl+Shift+J / Cmd+Opt+J
  if (
    (e.ctrlKey && e.shiftKey && e.keyCode === 74) ||
    (e.metaKey && e.altKey && e.keyCode === 74)
  ) {
    e.preventDefault();
  }

  // Ctrl+U / Cmd+U
  if ((e.ctrlKey && e.keyCode === 85) || (e.metaKey && e.keyCode === 85)) {
    e.preventDefault();
  }
});
