const audio = document.getElementById("backgroundAudio");
const playButton = document.getElementById("playButton");
const musicText = document.getElementById("music-text");

let isPlaying = false;

playButton.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    playButton.src = "./images/music-on.png";
    musicText.textContent = "Անջատել երաժշտությունը";
    isPlaying = true;
  } else {
    audio.pause();
    playButton.src = "./images/music-off.png";
    musicText.textContent = "Միացնել երաժշտությունը";
    isPlaying = false;
  }
});

////. Timer
// Wedding date: 17 June 2026
const weddingDate = new Date("June 17, 2026 00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = now - weddingDate; // already married? distance negative means future

  // Time calculations
  const days = Math.floor(Math.abs(distance) / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (Math.abs(distance) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (Math.abs(distance) % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((Math.abs(distance) % (1000 * 60)) / 1000);

  // Update HTML
  document.querySelector("#clockdiv .days").innerText = days;
  document.querySelector("#clockdiv .hours").innerText = String(hours).padStart(
    2,
    "0"
  );
  document.querySelector("#clockdiv .minutes").innerText = String(
    minutes
  ).padStart(2, "0");
  document.querySelector("#clockdiv .seconds").innerText = String(
    seconds
  ).padStart(2, "0");
}

// Initial call
updateCountdown();

// Update every 1 second
setInterval(updateCountdown, 1000);

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
