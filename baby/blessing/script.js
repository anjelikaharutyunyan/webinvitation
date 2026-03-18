(function () {
  // Music button functionality
  const musicBtn = document.getElementById("musicBtn");
  const bgMusic = document.getElementById("bgMusic");
  const musicIcon = document.getElementById("musicIcon");

  let isPlaying = false;

  if (musicBtn && bgMusic && musicIcon) {
    musicBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (isPlaying) {
        bgMusic.pause();
        musicIcon.src = "./images/play.svg";
        musicIcon.alt = "play";
      } else {
        bgMusic
          .play()
          .catch((err) => console.log("playback blocked until interaction"));
        musicIcon.src = "./images/pause.svg";
        musicIcon.alt = "pause";
      }
      isPlaying = !isPlaying;
    });
  }

  // hover effect on baby img
  const babyImg = document.querySelector(".photo-box img");
  if (babyImg) {
    babyImg.addEventListener("mouseenter", () => {
      babyImg.style.transform = "rotate(0deg) scale(1.02)";
    });
    babyImg.addEventListener("mouseleave", () => {
      babyImg.style.transform = "rotate(0deg)";
    });
  }

  // ========== COUNTDOWN TIMER ==========
  function updateTimer() {
    const targetDate = new Date(2026, 5, 1, 15, 0, 0);
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      document.getElementById("days").textContent = "00";
      document.getElementById("hours").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      document.getElementById("seconds").textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days < 10 ? "0" + days : days;
    document.getElementById("hours").textContent =
      hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").textContent =
      minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").textContent =
      seconds < 10 ? "0" + seconds : seconds;
  }

  updateTimer();
  setInterval(updateTimer, 1000);

  // ========== SCROLL ANIMATION WITH INTERSECTION OBSERVER ==========
  // This makes elements fade in when they come into view
  const fadeElements = document.querySelectorAll(".fade-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Optional: unobserve after animation to save resources
          // observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2, // Trigger when 20% of element is visible
      rootMargin: "0px 0px -50px 0px", // Slight offset for better timing
    },
  );

  fadeElements.forEach((element) => {
    observer.observe(element);
  });

  // Optional: Add smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
})();

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
