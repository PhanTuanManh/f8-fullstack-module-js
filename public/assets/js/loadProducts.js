// loadProducts.js

import { getAllProducts } from "./fetchAPI.js"; // Adjust path as needed

let currentPage = 1;
const productsPerPage = 10;

export function loadProducts(page, containerSelector = ".products") {
  getAllProducts()
    .then((products) => {
      const paginatedProducts = products.slice(0, page * productsPerPage);
      renderProductList(paginatedProducts, containerSelector);
    })
    .catch((error) => console.error("Error loading products:", error));
}

function renderProductList(products, containerSelector) {
  const productList = document.querySelector(containerSelector);
  if (!productList) return;

  productList.innerHTML = ""; // Clear existing products
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
        ? `<span class="discount absolute top-5 right-0 text-[#FF6962] font-semibold px-3.5 text-[12px]">-${product.discountPercentage}%</span>`
        : "";

    const hot = product.hot
      ? `<span class="tag absolute top-5 left-0 text-white bg-[#FF6962] font-semibold px-3.5 text-[14px]">Hot</span>`
      : "";

    productCard.innerHTML = `
      <img loading="lazy" src="${productImage}" alt="${product.title}" class="w-full object-cover hover:scale-105 mp-transition-5" />
      <div class="item-text flex flex-col justify-center text-center mt-[20px] gap-2 mb-[30px]">
        <h5 class="truncate">${product.title}</h5>
        <span>$${product.price}</span>
      </div>
      ${hot}
      ${discount}
    `;

    productCard.addEventListener("click", () => {
      window.location.href = `detail.html?id=${product.id}`;
    });

    productList.appendChild(productCard);
  });
}

// Load more products on "Load More" button click
export function initLoadMoreButton() {
  const loadMoreButton = document.querySelector(".load-more a");
  loadMoreButton?.addEventListener("click", (event) => {
    event.preventDefault();
    currentPage++;
    loadProducts(currentPage);
  });
}
