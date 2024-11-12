// mainBase.js
// Author: https://github.com/PhanTuanManh/

import Header from "../../components/header.js";
import Footer from "../../components/footer.js";
import MobileMenu from "../../components/mobileMenu.js";
import { initSlider } from "./slider.js";
import "./categoryBreadcrumb.js";
import { initMenuToggle } from "./menuToggle.js";
import {
  loadProducts,
  initLoadMoreButton,
  setupSorting,
  setupFilterButtons,
} from "./loadProducts.js";
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

    document.querySelector("#header").innerHTML = headerContent;
    document.querySelector("#footer").innerHTML = footerContent;
    document.querySelector("#mobileMenu").innerHTML = mobileNav;

    // Initialize menu toggle after header loads
    initMenuToggle();

    initEventListeners();
    setupFilterButtons();
    setupSorting();
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category") || "all-products";
    loadProducts(category);
    initLoadMoreButton();
  } catch (error) {
    console.error("Error loading components:", error);
  }
});

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

  window.addEventListener("scroll", () => {
    if (toTopButton) {
      toTopButton.classList.toggle("hidden", window.scrollY <= 200);
    }
  });

  toTopButton?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
