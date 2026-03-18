function toggleMusic() {
  const music = document.getElementById("music");
  const icon = document.getElementById("musicIcon");

  if (music.paused) {
    music.play();
    icon.classList.replace("fa-music", "fa-pause");
  } else {
    music.pause();
    icon.classList.replace("fa-pause", "fa-music");
  }
}

// RSVP → WhatsApp

document.getElementById("rsvpForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const rsvp = document.querySelector('input[name="rsvp"]:checked').value;
  const guests = document.getElementById("guests").value;
  const message = document.getElementById("message").value;

  const text = `Մկրտության RSVP%0A
Անուն: ${name}%0A
Մասնակցություն: ${rsvp}%0A
Հյուրերի թիվ: ${guests}%0A`;

  const phone = "374XXXXXXXX";

  window.open(`https://wa.me/${phone}?text=${text}`);
});

