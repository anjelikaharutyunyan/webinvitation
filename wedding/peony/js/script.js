window.addEventListener("scroll", function () {
  const path = document.getElementById("wedding-path");
  const heart = document.getElementById("moving-heart");
  const mapContainer = document.querySelector(".max-w-\\[400px\\]");
  const section = document.getElementById("scroll-path-section");

  if (!path || !heart || !mapContainer || !section) return;

  const pathLength = path.getTotalLength();
  const sectionRect = section.getBoundingClientRect();
  const containerRect = mapContainer.getBoundingClientRect();

  const sectionTop = sectionRect.top;
  const sectionHeight = sectionRect.height;
  const windowHeight = window.innerHeight;

  // --- Calculate scroll progress (0 to 1) ---
  let scrollProgress =
    (windowHeight - sectionTop) / (sectionHeight + windowHeight);
  scrollProgress = Math.max(0, Math.min(1, scrollProgress));

  // --- Get point on path ---
  const point = path.getPointAtLength(scrollProgress * pathLength);

  // --- Scale coordinates to container size ---
  const relativeX = point.x * (containerRect.width / 400); // viewBox width
  const relativeY = point.y * (containerRect.height / 1400); // viewBox height

  heart.style.left = relativeX + "px";
  heart.style.top = relativeY + "px";

  // --- Handle heart scaling at key points ---
  const locations = [0.18, 0.42, 0.65, 0.85, 0.95]; // scroll progress of key points
  const tolerance = 0.02;

  const isNearLocation = locations.some(
    (loc) => Math.abs(scrollProgress - loc) < tolerance,
  );

  // Smoothly scale heart
  heart.style.transition = "transform 0.3s ease-out";
  heart.style.transform = isNearLocation
    ? "translate(-50%, -50%) scale(1.2)"
    : "translate(-50%, -50%) scale(1)";
});
// Initial trigger
window.dispatchEvent(new Event("scroll"));
window.addEventListener("resize", function () {
  window.dispatchEvent(new Event("scroll"));
});

function openEnvelope(body) {
  if (!body.classList.contains("open")) {
    body.classList.add("open");
    body.style.backgroundColor = "white";

    // --- ԵՐԱԺՇՏՈՒԹՅԱՆ ՄԱՍԸ ՍԿՍՎՈՒՄ Է ԱՅՍՏԵՂ ---
    const music = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicBtn");
    const playIcon = document.getElementById("play-icon");
    const pauseIcon = document.getElementById("pause-icon");

    // 1. Ցույց ենք տալիս կոճակը (հեռացնում ենք hidden, ավելացնում ենք flex)
    musicBtn.classList.remove("hidden");
    musicBtn.classList.add("flex");

    // 2. Միացնում ենք երգը և փոխում պատկերակը (icon)
    music
      .play()
      .then(() => {
        musicBtn.classList.add("music-playing");
        playIcon.classList.add("hidden");
        pauseIcon.classList.remove("hidden");
        pauseIcon.classList.add("flex");
      })
      .catch((err) => {
        console.log("Ավտոմատ միացումը արգելափակված է, սպասում ենք սեղմմանը");
      });
    // --- ԵՐԱԺՇՏՈՒԹՅԱՆ ՄԱՍԸ ԱՎԱՐՏՎՈՒՄ Է ---

    // Ծրարի բացվելու անիմացիաները
    document.getElementById("env-front").style.transform =
      "translate(-50%, -100%)";
    document.getElementById("env-front").style.opacity = "0";
    document.getElementById("env-back").style.transform =
      "translate(-50%, 100%)";
    document.getElementById("env-back").style.opacity = "0";
    document.getElementById("env-seal").style.transform =
      "translate(-50%, -50%) scale(0)";
    document.getElementById("env-seal").style.opacity = "0";

    setTimeout(() => {
      document.getElementById("envelope-container").style.display = "none";
      initScrollAnimations();
    }, 1000);
  }
}

// Սա էլ առանձին ֆունկցիա՝ հետո միացնել/անջատելու համար
function toggleMusic(event) {
  event.stopPropagation();
  const music = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicBtn");
  const playIcon = document.getElementById("play-icon");
  const pauseIcon = document.getElementById("pause-icon");

  if (music.paused) {
    music.play();
    musicBtn.classList.add("music-playing");
    playIcon.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
    pauseIcon.classList.add("flex");
  } else {
    music.pause();
    musicBtn.classList.remove("music-playing");
    playIcon.classList.remove("hidden");
    pauseIcon.classList.add("hidden");
    pauseIcon.classList.remove("flex");
  }
}

function initScrollAnimations() {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.1 },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((el) => revealObserver.observe(el));
}

// ============================================
// COUNTDOWN TIMER - ՀԱՇՎԻՉ ԺԱՄԱՑՈՒՅՑ
// ============================================
function startWeddingCountdown() {
  // Սահմանել հարսանիքի ամսաթիվը և ժամը
  const weddingDate = new Date("April 16, 2026 18:00:00").getTime();

  // Ստուգել, արդյոք կան countdown էլեմենտները
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  // Եթե էլեմենտները չկան, դուրս գալ
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
    console.log("Countdown էլեմենտները չեն գտնվել");
    return;
  }

  const x = setInterval(function () {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Եթե ժամանակը անցել է
    if (distance < 0) {
      clearInterval(x);
      daysEl.innerText = "00";
      hoursEl.innerText = "00";
      minutesEl.innerText = "00";
      secondsEl.innerText = "00";
      return;
    }

    // Հաշվել օրեր, ժամեր, րոպեներ, վայրկյաններ
    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    // Արդյունքը ցուցադրել երկնիշ ֆորմատով
    daysEl.innerText = d.toString().padStart(2, "0");
    hoursEl.innerText = h.toString().padStart(2, "0");
    minutesEl.innerText = m.toString().padStart(2, "0");
    secondsEl.innerText = s.toString().padStart(2, "0");
  }, 1000);
}

// Սկսել countdown-ը էջի բեռնումից հետո
document.addEventListener("DOMContentLoaded", function () {
  startWeddingCountdown();
});

// ============================================
// RSVP FORM - ՀԱՍՏԱՏՄԱՆ ՁԵՎ
// ============================================
const form = document.getElementById("rsvp-form");
let attendanceStatus = "Այո, կգամ"; // Default selection

// Initialize radio button styling
document.addEventListener("DOMContentLoaded", function () {
  // Set default attendance button (Yes)
  selectStatus("yes");

  // Handle radio button styling for Irina/Karen
  const radioButtons = document.querySelectorAll('input[name="invitedBy"]');

  radioButtons.forEach((radio) => {
    radio.addEventListener("change", function () {
      // Reset all labels to default style
      document.querySelectorAll('input[name="invitedBy"]').forEach((r) => {
        const label = r.closest("label");
        if (label) {
          label.style.backgroundColor = "transparent";
          label.style.borderColor = "#eeeeee";
          const span = label.querySelector("span");
          if (span) span.style.color = "#787C59";
        }
      });

      // Highlight selected label
      const selectedLabel = this.closest("label");
      if (selectedLabel) {
        selectedLabel.style.backgroundColor = "#787C59";
        selectedLabel.style.borderColor = "#787C59";
        const span = selectedLabel.querySelector("span");
        if (span) span.style.color = "white";
      }
    });
  });
});

function selectStatus(status) {
  const btnYes = document.getElementById("btn-yes");
  const btnNo = document.getElementById("btn-no");

  if (btnYes && btnNo) {
    if (status === "yes") {
      // Style Yes button as selected
      btnYes.style.backgroundColor = "#787C59";
      btnYes.style.color = "white";
      btnYes.style.borderColor = "#787C59";

      // Style No button as unselected
      btnNo.style.backgroundColor = "transparent";
      btnNo.style.color = "#787C59";
      btnNo.style.borderColor = "#eeeeee";

      attendanceStatus = "Այո, կգամ";
    } else {
      // Style No button as selected
      btnNo.style.backgroundColor = "#787C59";
      btnNo.style.color = "white";
      btnNo.style.borderColor = "#787C59";

      // Style Yes button as unselected
      btnYes.style.backgroundColor = "transparent";
      btnYes.style.color = "#787C59";
      btnYes.style.borderColor = "#eeeeee";

      attendanceStatus = "Ցավոք, ոչ";
    }

    // Store status in form dataset
    document.getElementById("rsvp-form").dataset.status = status;
  }
}

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("guest-name").value.trim();
    const count = document.getElementById("guest-count").value;

    // Validate name
    if (!name) {
      alert("Խնդրում ենք լրացնել Ձեր անունը և ազգանունը։");
      return;
    }

    // Get the inviter
    const invitedBy = form.querySelector('input[name="invitedBy"]:checked');
    if (!invitedBy) {
      alert("Խնդրում ենք նշել, ով է հրավիրել ձեզ։");
      return;
    }

    // Validate guest count
    if (!count || count < 1) {
      alert("Խնդրում ենք նշել հյուրերի քանակը։");
      return;
    }

    // Set phone number based on who invited
    let phone;
    if (invitedBy.value === "irina") {
      phone = "37497133029"; // Irina's number
    } else {
      phone = "37493800071"; // Karen's number
    }

    const message = `Հարսանիքի հաստատում

Անուն: ${name}
Հյուրերի քանակ: ${count}
Պատասխան: ${attendanceStatus}`;

    // Format phone number correctly for WhatsApp
    const formattedPhone = phone.replace(/[^0-9]/g, "");

    const whatsappURL = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(whatsappURL, "_blank");

    // Show success message
    alert("Շնորհակալություն! Ձեր պատասխանը ուղարկված է։");
  });
}

// Initialize the default styles when page loads
window.addEventListener("load", function () {
  selectStatus("yes");
  // Համոզվել, որ countdown-ը սկսվի նաև load-ից հետո
  startWeddingCountdown();
});
