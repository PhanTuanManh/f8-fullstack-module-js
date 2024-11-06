import { ComponentLoader } from "./componentLoader.js";
import { toggleMenuVisibility } from "./menuToggle.js";
import { handleScroll } from "./headerScroll.js";
import { initSlideshow } from "./slideShow.js";
import "./toTopButton.js";

// Load components
ComponentLoader.loadComponents({
  header: "header.html",
  footer: "footer.html",
  "mobile-nav": "mobile-nav.html",
}).then(() => {
  // Initialize slide menu and other features
  initSlideshow();
});

// Initialize scroll and other UI effects
window.addEventListener("scroll", handleScroll);
