const music = document.getElementById("bgMusic");
const toggle = document.getElementById("musicToggle");

// Start visually ON
toggle.classList.add("playing");
let isPlaying = true;

// Try to autoplay immediately
const playPromise = music.play();

if (playPromise !== undefined) {
  playPromise
    .then(() => {
      // Autoplay started successfully
      console.log("Music started automatically");
      isPlaying = true;
      toggle.classList.add("playing");
      toggle.classList.remove("off");
    })
    .catch((error) => {
      // Autoplay blocked by browser
      console.log("Autoplay blocked:", error);
      isPlaying = false;
      toggle.classList.remove("playing");
      toggle.classList.add("off");

      // Optional: user can click toggle to start
      console.log("Click the music icon to start music");
    });
}

// Toggle on click
toggle.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    toggle.classList.remove("playing");
    toggle.classList.add("off");
    isPlaying = false;
  } else {
    const clickPlayPromise = music.play();
    if (clickPlayPromise !== undefined) {
      clickPlayPromise
        .then(() => {
          toggle.classList.add("playing");
          toggle.classList.remove("off");
          isPlaying = true;
        })
        .catch((error) => {
          console.log("Play failed:", error);
          // Keep as OFF if playback fails
          toggle.classList.remove("playing");
          toggle.classList.add("off");
        });
    }
  }
});

const eventDate = new Date("June 02, 2026 15:30:00").getTime();

setInterval(function () {
  const now = new Date().getTime();
  const distance = eventDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
}, 1000);

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
