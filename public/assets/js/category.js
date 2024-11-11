// category.js
import Header from "../../components/header.js";
import Footer from "../../components/footer.js";
import MobileMenu from "../../components/mobileMenu.js";
import { initSlider } from "./slider.js";
import { initMenuToggle } from "./menuToggle.js";
import { loadProducts, initLoadMoreButton } from "./loadProducts.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [headerContent, footerContent, mobileNav] = await Promise.all([
      Header(),
      Footer(),
      MobileMenu(),
    ]);

    document.querySelector("#header").innerHTML = headerContent;
    document.querySelector("#footer").innerHTML = footerContent;
    document.querySelector("#mobileMenu").innerHTML = mobileNav;

    initMenuToggle();
    initEventListeners();

    // Initial load of all products
    loadProducts("all-products", 1);
    initLoadMoreButton();

    setupCategoryFilters();
    setupSortOptions();
  } catch (error) {
    console.error("Error loading components:", error);
  }
});

function setupCategoryFilters() {
  document
    .getElementById("all-products-link")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      loadProducts("all-products", 1);
    });

  document
    .getElementById("best-sellers-link")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      loadProducts("best-sellers", 1);
    });

  document
    .getElementById("new-products-link")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      loadProducts("new-products", 1);
    });

  document.getElementById("sale-link")?.addEventListener("click", (e) => {
    e.preventDefault();
    loadProducts("sale-products", 1);
  });
}

function setupSortOptions() {
  // Low to high sorting
  document.querySelector(".low-to-hight")?.addEventListener("click", () => {
    loadProducts(currentFilter, 1, false, "low-to-high");
  });

  // High to low sorting
  document.querySelector(".hight-to-low")?.addEventListener("click", () => {
    loadProducts(currentFilter, 1, false, "high-to-low");
  });
}

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
