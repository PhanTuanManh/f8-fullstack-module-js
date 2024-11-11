// mainBase.js
// Author: https://github.com/PhanTuanManh/

import Header from "../../components/header.js";
import Footer from "../../components/footer.js";
import MobileMenu from "../../components/mobileMenu.js";
import { initSlider } from "./slider.js";
import { initMenuToggle } from "./menuToggle.js";
import { loadProducts, initLoadMoreButton } from "./loadProducts.js";
import {
  get10BestSellersProducts,
  get10NewProducts,
  get10DiscountedProducts,
  getAllProducts,
} from "./fetchAPI.js";

// Load header and footer content, then initialize required components
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Load header and footer content
    const [headerContent, footerContent, mobileNav] = await Promise.all([
      Header(),
      Footer(),
      MobileMenu(),
    ]);

    // Insert header and footer into the DOM
    document.querySelector("#header").innerHTML = headerContent;
    document.querySelector("#footer").innerHTML = footerContent;
    document.querySelector("#mobileMenu").innerHTML = mobileNav;

    // Initialize menu toggle after header loads
    initMenuToggle();

    initEventListeners();
    loadProducts();

    loadProducts(1); // Load the first page initially
    initLoadMoreButton(); // Set up the "Load More" button functionality
  } catch (error) {
    console.error("Error loading components:", error);
  }
});

// Define additional event listeners for scroll and button interactions
function initEventListeners() {
  let lastScrollY = window.scrollY;
  const header = document.querySelector(".header");
  const toTopButton = document.querySelector(".to-top");

  function handleScroll() {
    const currentScrollY = window.scrollY;

    if (header) {
      if (currentScrollY === 0) {
        header.classList.remove("bg-white");
        header.classList.add("bg-white/0");
      } else if (currentScrollY < lastScrollY) {
        header.classList.remove("bg-white/0");
        header.classList.add("bg-white");
        header.classList.remove("translate-y-[-100%]");
      } else if (currentScrollY > lastScrollY && currentScrollY > 0) {
        header.classList.add("bg-white");
        header.classList.add("translate-y-[-100%]");
      }
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", handleScroll);

  // Toggle to-top button visibility
  window.addEventListener("scroll", () => {
    if (toTopButton) {
      toTopButton.classList.toggle("hidden", window.scrollY <= 200);
    }
  });

  // Smooth scroll to top
  toTopButton?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Load random products for the product list

// Render products to the specified product list container

// Set up event listeners for product category links
