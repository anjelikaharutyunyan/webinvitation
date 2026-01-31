document.addEventListener("DOMContentLoaded", () => {
  // ========================
  // MOBILE MENU
  // ========================
  const toggle = document.getElementById("mobileMenuToggle");
  const menu = document.getElementById("mobileMenu");
  const yearEl = document.getElementById("year");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
      const isActive = menu.classList.contains("active");
      toggle.setAttribute("aria-expanded", String(isActive));
      toggle.setAttribute(
        "aria-label",
        isActive ? "Закрыть меню" : "Открыть меню",
      );
    });

    document.querySelectorAll(".mobile-nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Открыть меню");
      });
    });
  }

  // ========================
  // CATEGORY FILTER
  // ========================
  const categoryButtons = document.querySelectorAll(".category-btn");
  const templates = document.querySelectorAll(".template-card");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const category = button.dataset.category;
      templates.forEach((template) => {
        template.style.display =
          category === "all" || template.classList.contains(category)
            ? "block"
            : "none";
      });
    });
  });

  // ========================
  // TEMPLATE BUTTONS
  // ========================
  document.querySelectorAll(".template-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const href = button.dataset.href;
      if (href) window.open(href, "_blank");
    });
  });

  // ========================
  // FAQ TOGGLE
  // ========================
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const icon = item.querySelector(".icon");

    question.addEventListener("click", () => {
      // Close others
      faqItems.forEach((i) => {
        if (i !== item) {
          i.classList.remove("open");
          const ic = i.querySelector(".icon");
          if (ic) ic.textContent = "＋";
        }
      });

      const isOpen = item.classList.contains("open");
      item.classList.toggle("open");
      if (icon) icon.textContent = isOpen ? "＋" : "✕";
    });
  });

  // ========================
  // MODAL
  // ========================
  const openBtns = document.getElementsByClassName("openOrderModal");
  const modal = document.getElementById("orderModal");
  const closeBtn = document.querySelector(".close-modal");

  const chosenTemplate = document.getElementById("chosen-template");
  const chosenPrice = document.getElementById("chosen-price");
  const chosenImage = document.getElementById("chosenImage");

  const designInput = document.getElementById("designInput");
  const priceInput = document.getElementById("priceInput");

  if (openBtns && modal && closeBtn) {
    Array.from(openBtns).forEach((btn) => {
      btn.addEventListener("click", () => {
        const design = btn.getAttribute("data-design");
        const price = btn.getAttribute("data-price");
        const image = btn.getAttribute("data-image");

        // Show info only if they exist, otherwise hide that part
        if (design) {
          chosenTemplate.textContent = "Ընտրված դիզայն՝ " + design;
          chosenTemplate.style.display = "block";
          designInput.value = design;
        } else {
          chosenTemplate.style.display = "none";
          designInput.value = "";
        }

        if (price) {
          chosenPrice.textContent = "Գին՝ " + price;
          chosenPrice.style.display = "block";
          priceInput.value = price;
        } else {
          chosenPrice.style.display = "none";
          priceInput.value = "";
        }

        if (image) {
          chosenImage.src = image;
          chosenImage.style.display = "block";
        } else {
          chosenImage.style.display = "none";
        }

        modal.classList.add("open");
      });
    });

    closeBtn.addEventListener("click", () => {
      modal.classList.remove("open");
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("open");
      }
    });
  }

  // ========================
  // ORDER INVITATION
  // ========================

  const designSelect = document.getElementById("designSelect");
  document.querySelectorAll(".order-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const design = this.getAttribute("data-design");
      designSelect.value = design;
      modal.style.display = "block";
    });
  });

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // ========================
  // WORKFLOW CAROUSEL (MOBILE)
  // ========================
  document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".workflow-carousel");
    const track = carousel.querySelector(".workflow-grid");

    function enableMobileLayout() {
      carousel.classList.add("mobile-layout");

      // Force scroll to the first card after layout/render
      requestAnimationFrame(() => {
        track.scrollLeft = 0;
      });

      setTimeout(() => (track.scrollLeft = 0), 50);
      setTimeout(() => (track.scrollLeft = 0), 100);
    }

    function disableMobileLayout() {
      carousel.classList.remove("mobile-layout");
    }

    function updateLayout() {
      if (window.innerWidth <= 900) {
        enableMobileLayout();
      } else {
        disableMobileLayout();
      }
    }

    // Initial layout
    updateLayout();

    // On resize
    window.addEventListener("resize", updateLayout);

    // Drag / touch support for mobile
    let isDragging = false,
      startX,
      scrollLeft;

    track.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener("mouseup", () => (isDragging = false));
    track.addEventListener("mouseleave", () => (isDragging = false));

    track.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      track.scrollLeft = scrollLeft - (x - startX) * 2;
    });

    track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].pageX;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener("touchmove", (e) => {
      const x = e.touches[0].pageX;
      track.scrollLeft = scrollLeft + (startX - x);
    });
  });

  // ========================
  // ANIMATIONS ON VIEW
  // ========================
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("active");
      });
    },
    { threshold: 0.2 },
  );

  document
    .querySelectorAll(
      ".fade-in, .price-card, .workflow-card, .main-title, .subtitle, .lead, .section-title, .workflow-card-title, .template-title",
    )
    .forEach((el) => observer.observe(el));
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
