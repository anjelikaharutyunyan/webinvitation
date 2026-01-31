document.addEventListener("DOMContentLoaded", function () {
  const dragSection = document.getElementById("dragSection");
  const dragBtn = document.getElementById("btn");
  const mainContent = document.getElementById("mainContent");
  const dragTarget = document.querySelector(".drag-target");

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let initialX = 0;
  let initialY = 0;
  let currentX = 0;
  let currentY = 0;
  let velocityX = 0;
  let velocityY = 0;
  let lastTime = 0;
  let lastX = 0;
  let lastY = 0;

  // Enable smoother dragging with CSS will-change
  dragBtn.style.willChange = "transform";
  dragBtn.style.touchAction = "none"; // Prevent default touch behavior

  // Mouse events
  dragBtn.addEventListener("mousedown", startDrag);
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", endDrag);

  // Touch events
  dragBtn.addEventListener("touchstart", startDrag, { passive: false });
  document.addEventListener("touchmove", drag, { passive: false });
  document.addEventListener("touchend", endDrag);

  function startDrag(e) {
    isDragging = true;
    lastTime = Date.now();

    const rect = dragBtn.getBoundingClientRect();
    initialX = currentX;
    initialY = currentY;

    if (e.type === "mousedown") {
      startX = e.clientX;
      startY = e.clientY;
    } else if (e.type === "touchstart") {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      e.preventDefault(); // Prevent scrolling on touch
    }

    lastX = startX;
    lastY = startY;

    // Add visual feedback with smooth transition
    dragBtn.style.transition = "transform 0.1s ease-out, box-shadow 0.2s ease";
    dragBtn.style.cursor = "grabbing";
    dragBtn.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
    dragBtn.classList.add("in-target");

    // Request animation frame for smoother movement
    requestAnimationFrame(animateDrag);
  }

  function drag(e) {
    if (!isDragging) return;

    let clientX, clientY;

    if (e.type === "mousemove") {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.type === "touchmove") {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      e.preventDefault(); // Prevent scrolling
    }

    // Calculate delta
    const deltaX = clientX - startX;
    const deltaY = clientY - startY;

    // Update current position
    currentX = initialX + deltaX;
    currentY = initialY + deltaY;

    // Calculate velocity for momentum (optional)
    const currentTime = Date.now();
    const timeDiff = currentTime - lastTime;

    if (timeDiff > 0) {
      velocityX = (clientX - lastX) / timeDiff;
      velocityY = (clientY - lastY) / timeDiff;
    }

    lastX = clientX;
    lastY = clientY;
    lastTime = currentTime;
  }

  function animateDrag() {
    if (!isDragging) return;

    // Apply the current position with transform3d for hardware acceleration
    dragBtn.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

    // Check if the drag button is over the target
    const btnRect = dragBtn.getBoundingClientRect();
    const targetRect = dragTarget.getBoundingClientRect();

    const isInTarget =
      btnRect.left < targetRect.right &&
      btnRect.right > targetRect.left &&
      btnRect.top < targetRect.bottom &&
      btnRect.bottom > targetRect.top;

    if (isInTarget) {
      // Visual feedback when over target
      dragBtn.style.boxShadow =
        "0 0 0 4px rgba(75, 192, 192, 0.5), 0 8px 25px rgba(0,0,0,0.2)";
      // Trigger opening after a brief moment in target
      setTimeout(() => {
        if (isInTarget) openInvitation();
      }, 300);
    } else {
      dragBtn.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
    }

    requestAnimationFrame(animateDrag);
  }

  function endDrag() {
    if (!isDragging) return;

    isDragging = false;

    // Apply momentum (optional - makes it feel more natural)
    if (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1) {
      // Add a little bounce-back effect
      currentX += velocityX * 50;
      currentY += velocityY * 50;

      // Animate back to original position with spring-like effect
      dragBtn.style.transition =
        "transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
      dragBtn.style.transform = `translate3d(0px, 0px, 0)`;
    } else {
      // Smooth return to original position
      dragBtn.style.transition =
        "transform 0.3s ease-out, box-shadow 0.2s ease";
      dragBtn.style.transform = `translate3d(0px, 0px, 0)`;
    }

    // Reset styles
    dragBtn.style.cursor = "grab";
    dragBtn.style.boxShadow = "";
    dragBtn.classList.remove("in-target");

    // Reset position tracking
    currentX = 0;
    currentY = 0;
    velocityX = 0;
    velocityY = 0;
  }

  function openInvitation() {
    if (dragSection.classList.contains("hidden")) return;

    // Add a smooth transition for the invitation opening
    dragSection.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    dragSection.classList.add("hidden");

    setTimeout(() => {
      mainContent.style.opacity = "0";
      mainContent.style.transform = "translateY(20px)";
      mainContent.classList.add("visible");

      // Trigger reflow for smooth animation
      mainContent.offsetHeight;

      mainContent.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      mainContent.style.opacity = "1";
      mainContent.style.transform = "translateY(0)";
    }, 300);
  }

  // Add some CSS improvements for smoother dragging
  const style = document.createElement("style");
  style.textContent = `
    #btn {
      cursor: grab;
      user-select: none;
      -webkit-user-select: none;
      -webkit-tap-highlight-color: transparent;
      will-change: transform;
      transition: transform 0.2s ease-out, box-shadow 0.2s ease;
    }
    
    #btn:active,
    #btn.in-target {
      cursor: grabbing;
      transition: transform 0.1s ease-out, box-shadow 0.2s ease;
    }
    
    .drag-target {
      transition: all 0.3s ease;
    }
    
    .drag-target:hover {
      transform: scale(1.05);
    }
  `;
  document.head.appendChild(style);

  /** ------------------------
   *  COUNTDOWN TIMER
   *  ------------------------ */
  function updateCountdown() {
    const weddingDate = new Date("2026-03-15T15:00:00").getTime();
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    if (timeLeft < 0) {
      daysEl.textContent =
        hoursEl.textContent =
        minutesEl.textContent =
        secondsEl.textContent =
          "00";
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    daysEl.textContent = days.toString().padStart(2, "0");
    hoursEl.textContent = hours.toString().padStart(2, "0");
    minutesEl.textContent = minutes.toString().padStart(2, "0");
    secondsEl.textContent = seconds.toString().padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /** ------------------------
   *  RSVP FORM HANDLING
   *  ------------------------ */
  const rsvpForm = document.getElementById("weddingRsvp");
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value || "Not provided";
      const email = document.getElementById("email").value || "Not provided";
      const guests = document.getElementById("guests").value || "Not provided";
      const attendance = document.getElementById("attendance").value;
      const message =
        document.getElementById("message").value || "No additional message";

      const attendanceText =
        attendance === "yes" ? "YES, I'LL BE THERE" : "SORRY, I CAN'T MAKE IT";

      const whatsappNumber = "37477260178";
      const whatsappMessage = `🎉 Wedding RSVP 🎉%0A%0A👤 Name: ${name}%0A📧 Email: ${email}%0A👥 Number of Guests: ${guests}%0A✅ Attendance: ${attendanceText}%0A💌 Message: ${message}%0A%0AThank you for your RSVP!`;
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
      window.open(whatsappURL, "_blank");

      alert(
        "Thank you for your RSVP! We're opening WhatsApp to send your confirmation."
      );
      this.reset();
    });
  }
});

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
