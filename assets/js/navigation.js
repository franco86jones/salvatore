/**
 * navigation.js
 * Delicatessen Salvatore
 *
 * Sticky header state, mobile navigation, and active page detection.
 */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("#site-header");
  const menuToggle = document.querySelector(".header__menu-toggle");
  const mobileMenu = document.querySelector("#mobile-menu");
  const mobileLinks = document.querySelectorAll(".header__mobile-link");
  const navLinks = document.querySelectorAll(".header__nav-link, .header__mobile-link");
  const scrollThreshold = 80;

  if (!header || !menuToggle || !mobileMenu) {
    return;
  }

  const closeMenu = () => {
    header.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    mobileMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const openMenu = () => {
    header.classList.add("is-open");
    menuToggle.classList.add("is-open");
    mobileMenu.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Cerrar menu");
    mobileMenu.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  /* Scroll Behavior */
  const updateHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > scrollThreshold);
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  /* Mobile Menu Toggle */
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("is-open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  /* Close On Navigation */
  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    const isOpen = mobileMenu.classList.contains("is-open");
    const clickedInsideHeader = header.contains(event.target);

    if (isOpen && !clickedInsideHeader) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    const isOpen = mobileMenu.classList.contains("is-open");

    if (event.key === "Escape" && isOpen) {
      closeMenu();
      menuToggle.focus();
    }
  });

  /* Active Page Detection */
  const currentPath = window.location.pathname.replace(/\/index\.html$/, "/");

  navLinks.forEach((link) => {
    const linkPath = new URL(link.href).pathname.replace(/\/index\.html$/, "/");
    const isActive = currentPath === linkPath;

    if (isActive) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("is-active");
      link.removeAttribute("aria-current");
    }
  });
});
