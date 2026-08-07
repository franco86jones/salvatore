/**
 * main.js
 * Delicatessen Salvatore
 *
 * Initializes site-wide features.
 * Loaded last on every page.
 */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================
     FLOATING WHATSAPP BUTTON
     ===================== */

  const whatsappFloat = document.querySelector(".whatsapp-float");

  if (!whatsappFloat) {
    return;
  }

  /* Entrance animation - delay slightly for page load feel. */
  setTimeout(() => {
    whatsappFloat.classList.add("is-ready");
  }, 800);

  /* Hide button when footer is visible so it does not overlap footer content. */
  const footer = document.querySelector(".footer");

  if (!footer || !("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          whatsappFloat.classList.add("whatsapp-float--hidden");
        } else {
          whatsappFloat.classList.remove("whatsapp-float--hidden");
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(footer);
});
