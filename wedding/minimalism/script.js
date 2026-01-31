window.addEventListener("load", () => {
  document.querySelector(".image-left").classList.add("show");
  document.querySelector(".image-right").classList.add("show");
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
