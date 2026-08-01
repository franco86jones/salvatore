/**
 * animations.js
 * Delicatessen Salvatore
 *
 * Scroll-triggered entrance animations using IntersectionObserver.
 * Adds .is-visible to .animate-* elements when they enter viewport.
 */

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll('[class*="animate-"]');

  if (!animatedElements.length) {
    return;
  }

  /* Graceful fallback for browsers without IntersectionObserver. */
  if (!("IntersectionObserver" in window)) {
    animatedElements.forEach((element) => {
      element.classList.add("is-visible");
    });
    return;
  }

  /* Reveal each animated element once it enters the viewport. */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
});
