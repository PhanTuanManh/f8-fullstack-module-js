// Author: https://github.com/PhanTuanManh/

import Header from "../../components/header.js";
import Footer from "../../components/footer.js";
import MobileMenu from "../../components/mobileMenu.js";
import { initMenuToggle } from "./menuToggle.js";
import { getProductById } from "./fetchAPI.js";
import "./quantityControl.js";

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

async function loadProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (!productId) return; // Exit if no product ID is provided

  try {
    const product = await getProductById(productId);
    renderProductDetails(product);
  } catch (error) {
    console.error("Error loading product details:", error);
  }
}

// Render product details on the page
function renderProductDetails(product) {
  if (!product) return;

  document
    .querySelector("#breadcrumb-category")
    .setAttribute("href", `category.html?category=${product.category}`);
  document.querySelector("#breadcrumb-category").innerText = product.category;

  document.querySelector("#breadcrumb-product").innerText = product.title;

  product.hot ? (document.querySelector(".hot").innerHTML = "Hot") : "";

  product.new ? (document.querySelector(".new").innerHTML = "New") : "";

  document.querySelector(".product-title").innerText = product.title;
  document.querySelector(".product-description").innerText =
    product.description;
  document.querySelector(".product-rating").innerText = product.rating;

  document.querySelector(".product-reviews").innerText = product.reviews.length;

  document.querySelector(".product-price").innerText = `$${product.price}`;
  document.querySelector(".category-detail span").innerText = product.category;

  const detailImg = document.querySelector("#detail-img img");
  const imgListContainer = document.querySelector(".list-img");

  if (product.images && product.images.length > 0) {
    detailImg.src = product.images[0];

    imgListContainer.innerHTML = product.images
      .map(
        (imgUrl, index) =>
          `<img src="${imgUrl}" class="thumbnail-img cursor-pointer" data-index="${index}" alt="Product thumbnail">`
      )
      .join("");

    imgListContainer.querySelectorAll(".thumbnail-img").forEach((thumbnail) => {
      thumbnail.addEventListener("click", (e) => {
        detailImg.src = e.target.src;
      });
    });
  }

  const backButton = document.getElementById("back-button");
  if (backButton) {
    backButton.addEventListener("click", () => {
      window.history.back();
    });
  }

  const nextButton = document.getElementById("next-button");
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      window.history.forward();
    });
  }
}

document.addEventListener("DOMContentLoaded", loadProductDetails);
