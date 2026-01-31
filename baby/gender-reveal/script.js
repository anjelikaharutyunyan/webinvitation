const form = document.getElementById("invitation-form");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission

  const guestName = document.getElementById("guest-name").value.trim();
  const partnerName = document.getElementById("partner-name").value.trim();
  const childName = document.getElementById("child-name").value.trim();
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
    selectedOption.value === "yes"
      ? "կմասնակցեմ"
      : selectedOption.value === "no"
      ? "չեմ կարող մասնակցել"
      : "կտեղեկացնեմ ավելի ուշ";

  let message = `Ողջույն! \nՁեր անունը: ${guestName}\nՄասնակցություն: ${attendanceText}`;

  if (partnerName) {
    message += `\nԶուգընկերը: ${partnerName}`;
  }

  if (childName) {
    message += `\nԵրեխա: ${childName}`;
  }

  const phoneNumber = "37477260178"; // WhatsApp number
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");

  // Clear form
  form.reset();
});
