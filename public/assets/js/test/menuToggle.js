const barIcon = document.querySelector(".bar-icon");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".overlay");

export function toggleMenuVisibility(isVisible) {
  mobileMenu.classList.toggle("mp-mobile-menu-visible", isVisible);
  mobileMenu.classList.toggle("mp-mobile-menu-invisible", !isVisible);
  overlay.classList.toggle("mp-visible", isVisible);
  overlay.classList.toggle("mp-invisible", !isVisible);
}

barIcon.addEventListener("click", () => {
  const isVisible = !mobileMenu.classList.contains("mp-mobile-menu-visible");
  toggleMenuVisibility(isVisible);
});

overlay.addEventListener("click", () => {
  toggleMenuVisibility(false);
});
