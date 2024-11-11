// menuToggle.js

// Function to toggle visibility
function toggleMenuVisibility(isVisible, mobileMenu, overlay) {
  if (mobileMenu && overlay) {
    mobileMenu.classList.toggle("mp-mobile-menu-visible", isVisible);
    mobileMenu.classList.toggle("mp-mobile-menu-invisible", !isVisible);
    overlay.classList.toggle("mp-visible", isVisible);
    overlay.classList.toggle("mp-invisible", !isVisible);
  }
}

// Initialize menu toggle
export function initMenuToggle() {
  // Wait for DOM to load
  const barIcon = document.querySelector(".bar-icon");
  const mobileMenu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".overlay");

  // Check if all elements exist
  if (barIcon && mobileMenu && overlay) {
    barIcon.addEventListener("click", () => {
      const isVisible = !mobileMenu.classList.contains(
        "mp-mobile-menu-visible"
      );
      toggleMenuVisibility(isVisible, mobileMenu, overlay);
    });

    overlay.addEventListener("click", () => {
      toggleMenuVisibility(false, mobileMenu, overlay);
    });
  } else {
    console.error(
      "Menu elements not found: check class names and HTML structure."
    );
  }
}
