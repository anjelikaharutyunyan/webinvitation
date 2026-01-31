function sendToWhatsApp() {
  const selectedOption = document.querySelector(
    'input[name="attendance"]:checked'
  );
  const guestName = document.getElementById("guest-name").value.trim();

  if (!selectedOption) {
    alert("Խնդրում ենք ընտրել տարբերակ նախքան ուղարկելը:");
    return;
  }

  if (!guestName) {
    alert("Խնդրում ենք մուտքագրել Ձեր անունը:");
    return;
  }

  const phoneNumber = "37477260178"; // Replace with actual WhatsApp number

  const response =
    selectedOption.value === "yes" ? "կմասնակցեմ" : "չեմ կարող մասնակցել";
  const message = `Ողջույն! Ցանկանում եմ հաստատել, որ ${response} մանուկ Սամվելի մկրտության արարողությանը:`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappURL, "_blank");

  document.querySelectorAll('input[name="attendance"]').forEach((input) => {
    input.checked = false;
  });
  document.getElementById("guest-name").value = "";
}

// Music Toggle - Simple version
document.addEventListener("DOMContentLoaded", function () {
  const musicToggle = document.getElementById("musicToggle");
  const audio = new Audio("./rington/Hallelujah.mp3");
  audio.loop = true;
  let isPlaying = false;

  // Only start playing when user clicks the toggle first time
  musicToggle.addEventListener("click", function () {
    if (!isPlaying) {
      audio
        .play()
        .then(() => {
          isPlaying = true;
          musicToggle.classList.add("playing");
        })
        .catch((error) => {
          console.error("Audio play failed:", error);
          alert(
            "Ձեր բրաուզերը արգելափակում է ավտոմատ աուդիոն: Խնդրում ենք թույլատրել աուդիո կամ սեղմել կրկին:"
          );
        });
    } else {
      audio.pause();
      isPlaying = false;
      musicToggle.classList.remove("playing");
    }
  });
});
