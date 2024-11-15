// mainBase.js
// Author: https://github.com/PhanTuanManh/

import Header from "../../components/header.js";
import Footer from "../../components/footer.js";
import MobileMenu from "../../components/mobileMenu.js";
import { initSlider } from "./slider.js";
import { initMenuToggle } from "./menuToggle.js";
import { initCountdown } from "./countdown.js";
import {
  get10BestSellersProducts,
  get10NewProducts,
  get10DiscountedProducts,
} from "./fetchAPI.js";

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
    initSlider();
    initEventListeners();
    initCountdown();
    setupFilterButtons();
    load10BestProducts();
    setupProductLinks();
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

function load10BestProducts() {
  get10BestSellersProducts().then((products) => renderProductList(products));
}

function renderProductList(products) {
  const productList = document.querySelector(".hot-sale-product");
  if (!productList) return;

  productList.innerHTML = "";
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add(
      "hot-sale-product-item",
      "relative",
      "cursor-pointer",
      "group"
    );

    const productImage =
      product.images?.[0] ?? "./assets/images/default-product.jpg";
    const discount =
      product.discountPercentage > 0
        ? `<span class="discount absolute top-5 right-0 text-primary font-semibold px-3.5 text-[12px]">-${product.discountPercentage}%</span>`
        : "";

    const hot = product.hot
      ? `<span class="tag absolute top-[25px] left-0 text-white bg-[#FF6962] font-semibold px-3.5 text-[14px]">Hot</span>`
      : "";

    const newTag = product.new
      ? `<span class="tag absolute top-0 left-0 text-white bg-[#6cff62] font-semibold px-3.5 text-[14px]">New</span>`
      : "";
    productCard.innerHTML = `
      <img loading="lazy" src="${productImage}" alt="${product.title}" class="w-full object-cover hover:scale-105 mp-transition-5" />
      <div class="item-text flex flex-col justify-center text-center mt-[20px] gap-2 mb-[30px]">
        <h5 class="truncate">${product.title}</h5>
        <span>$${product.price}</span>
      </div>
      ${hot}
      ${newTag}
      ${discount}
    `;

    productCard.addEventListener("click", () => {
      window.location.href = `detail.html?id=${product.id}`;
    });

    productList.appendChild(productCard);
  });
}

function setupProductLinks() {
  document
    .getElementById("best-sellers-link")
    ?.addEventListener("click", (event) => {
      event.preventDefault();
      load10BestProducts();
    });

  document
    .getElementById("new-products-link")
    ?.addEventListener("click", (event) => {
      event.preventDefault();
      get10NewProducts().then((products) => {
        const newProducts = products.filter((product) => product.new === true);
        renderProductList(newProducts);
      });
    });

  document.getElementById("sale-link")?.addEventListener("click", (event) => {
    event.preventDefault();
    get10DiscountedProducts().then((products) => renderProductList(products));
  });
}

let hasScrolled = false;

window.addEventListener("scroll", function () {
  if (window.scrollY > 0 && !hasScrolled) {
    document.querySelectorAll(".new-item").forEach((div, i) => {
      div.classList.add(
        "motion",
        "motion-preset-slide-left",
        `motion-delay-[${300 * i}ms]`
      );
    });

    hasScrolled = true;
  }

  if (window.scrollY > 400) {
    document.querySelectorAll(".mp-hot-sale-text ").forEach((div, i) => {
      div.classList.add("motion-preset-focus", "motion-duration-700");
    });
  }
});

function setupFilterButtons() {
  const filterLinks = document.querySelectorAll(".mp-hot-sale-text");

  filterLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      filterLinks.forEach((item) => {
        item.classList.remove("mp-hot-sale-text-active");
      });

      e.currentTarget.classList.add("mp-hot-sale-text-active");
    });
  });
}
