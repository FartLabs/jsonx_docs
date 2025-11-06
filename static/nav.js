// Navigation dialog wiring similar to playground script pattern
function setupNav() {
  const toggle = document.getElementById("navToggle");
  const dialog = document.getElementById("navDialog");

  if (!toggle || !dialog) return;

  function openNav() {
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "true");
    }
    // Prevent page scroll while dialog is open
    document.documentElement.classList.add("no-scroll");
    document.body.classList.add("no-scroll");
  }

  function closeNav() {
    if (typeof dialog.close === "function") {
      try {
        dialog.close();
      } catch (_) { /* noop */ }
    }
    // For non-modal fallback where `open` was set manually
    if (dialog.hasAttribute("open")) {
      dialog.removeAttribute("open");
    }
    // Restore page scroll
    document.documentElement.classList.remove("no-scroll");
    document.body.classList.remove("no-scroll");
  }

  toggle.addEventListener("click", openNav);

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) closeNav();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });

  // Ensure native cancel (Esc) also results in closed state
  dialog.addEventListener("cancel", () => {
    // Do not preventDefault; allow native close
    // Just ensure any manual `open` attribute is cleared
    if (dialog.hasAttribute("open")) {
      dialog.removeAttribute("open");
    }
    // Restore page scroll on cancel
    document.documentElement.classList.remove("no-scroll");
    document.body.classList.remove("no-scroll");
  });

  const closeBtn = dialog.querySelector(".nav-dialog-close");
  if (closeBtn) closeBtn.addEventListener("click", closeNav);

  // Close when clicking links inside dialog
  dialog.addEventListener("click", (e) => {
    const t = e.target;
    if (t instanceof Element) {
      const link = t.closest("a");
      if (link) closeNav();
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupNav);
} else {
  setupNav();
}
