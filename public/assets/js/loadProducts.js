import { getAllProducts as fetchAllProducts } from "./fetchAPI.js";
// loadProducts.js

let allProducts = [];
let currentPage = 1;
const pageSize = 10;
let currentFilter = "all-products";
let currentSortOrder = "asc";
let selectedCategory = "";
let selectedBrands = [];
let selectedTags = [];
let priceRange = { min: 0, max: 1000 };

// Fetches products only once and stores in `allProducts`

// Filter products based on selected filters
function applyFilters(products) {
  return products.filter((product) => {
    // Category filter
    const categoryMatch =
      !selectedCategory || product.category === selectedCategory;
    // Brand filter
    const brandMatch =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    // Tag filter
    const tagMatch =
      selectedTags.length === 0 ||
      product.tags.some((tag) => selectedTags.includes(tag));
    // Price range filter
    const priceMatch =
      product.price >= priceRange.min && product.price <= priceRange.max;
    return categoryMatch && brandMatch && tagMatch && priceMatch;
  });
}

// Function to load products based on filters, sorting, and pagination
export function loadProducts(
  filterType = "all-products",
  page = 1,
  isLoadMore = false,
  sortOrder = "asc"
) {
  const urlParams = new URLSearchParams(window.location.search);
  selectedCategory = urlParams.get("category");

  fetchAllProducts().then((products) => {
    currentPage = page;
    currentFilter = filterType;
    currentSortOrder = sortOrder;

    // Filter products by selected filters
    let filteredProducts = applyFilters(products);

    // Apply additional filters for best-sellers, new, and sale products
    switch (filterType) {
      case "best-sellers":
        filteredProducts = filteredProducts.filter(
          (product) => product.sell > 99
        );
        break;
      case "new-products":
        filteredProducts = filteredProducts.filter(
          (product) => product.new === true
        );
        break;
      case "sale-products":
        filteredProducts = filteredProducts.filter(
          (product) => product.discountPercentage >= 10
        );
        break;
    }

    // Sort products by price
    filteredProducts = filteredProducts.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

    document.querySelector(
      ".product-count"
    ).textContent = `${filteredProducts.length} products`;

    // Paginate results
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedProducts = filteredProducts.slice(
      startIndex,
      startIndex + pageSize
    );

    renderProductList(paginatedProducts, isLoadMore);
  });
}

// Initializes the load more button
export function initLoadMoreButton() {
  document.querySelector(".load-more a").addEventListener("click", (e) => {
    e.preventDefault();
    currentPage += 1;
    loadProducts(currentFilter, currentPage, true, currentSortOrder);
  });
}

// Set up sorting functionality
export function setupSorting() {
  document.querySelector(".low-to-hight").addEventListener("click", () => {
    currentSortOrder = "asc";
    loadProducts(currentFilter, 1, false, currentSortOrder);
  });

  document.querySelector(".hight-to-low").addEventListener("click", () => {
    currentSortOrder = "desc";
    loadProducts(currentFilter, 1, false, currentSortOrder);
  });
}

// Event listeners for category, brand, tag, and price filters
function setupFilterButtons() {
  // Category filter
  document
    .querySelectorAll(".category-list input[type='checkbox']")
    .forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        selectedCategory = e.target.checked ? e.target.value : "";
        loadProducts(currentFilter, 1, false, currentSortOrder);
      });
    });

  // Brand filter
  document
    .querySelectorAll(".brand-list input[type='checkbox']")
    .forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        selectedBrands = Array.from(
          document.querySelectorAll(
            ".brand-list input[type='checkbox']:checked"
          )
        ).map((input) => input.value);
        loadProducts(currentFilter, 1, false, currentSortOrder);
      });
    });

  // Tag filter
  document
    .querySelectorAll(".tag-list input[type='checkbox']")
    .forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        selectedTags = Array.from(
          document.querySelectorAll(".tag-list input[type='checkbox']:checked")
        ).map((input) => input.value);
        loadProducts(currentFilter, 1, false, currentSortOrder);
      });
    });

  // Price range filter
  document.getElementById("min-price").addEventListener("input", (e) => {
    priceRange.min = parseInt(e.target.value, 10);
    loadProducts(currentFilter, 1, false, currentSortOrder);
  });

  document.getElementById("max-price").addEventListener("input", (e) => {
    priceRange.max = parseInt(e.target.value, 10);
    loadProducts(currentFilter, 1, false, currentSortOrder);
  });
}

function renderProductList(products, isLoadMore) {
  const productList = document.querySelector(".products");
  if (!productList) return;

  if (!isLoadMore) {
    productList.innerHTML = "";
  }

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
        ? `<span class="discount absolute top-5 right-3 py-1 bg-transparent  font-semibold px-3.5 text-[12px]">-${product.discountPercentage}%</span>`
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

// Populate filters dynamically from API data
export function populateFilters() {
  fetchAllProducts().then((products) => {
    const brands = new Set(products.map((product) => product.brand));
    const tags = new Set(products.flatMap((product) => product.tags));

    const brandContainer = document.querySelector(".brand-list");
    const tagContainer = document.querySelector(".tag-list");

    brandContainer.innerHTML = "";
    tagContainer.innerHTML = "";

    // Render category checkboxes

    // Render brand checkboxes
    brands.forEach((brand) => {
      const brandItem = document.createElement("li");
      brandItem.classList.add("flex", "items-center", "py-2");
      brandItem.innerHTML = `
        <label class="flex items-center cursor-pointer relative">
          <input type="checkbox" value="${brand}" id="${brand}" class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"/>
          <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
          </span>
        </label>
        <label for="${brand}" class="cursor-pointer ml-2 text-slate-600 text-sm">${brand}</label>
      `;
      brandContainer.appendChild(brandItem);
    });

    // Render tag checkboxes
    tags.forEach((tag) => {
      const tagItem = document.createElement("li");
      tagItem.classList.add("flex", "items-center", "py-2");
      tagItem.innerHTML = `
        <label class="flex items-center cursor-pointer relative">
          <input type="checkbox" value="${tag}" id="${tag}" class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"/>
          <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
          </span>
        </label>
        <label for="${tag}" class="cursor-pointer ml-2 text-slate-600 text-sm">${tag}</label>
      `;
      tagContainer.appendChild(tagItem);
    });

    // Attach filter event listeners after rendering
    setupFilterButtons();
  });
}

export function setupFilterButtonslink() {
  document
    .getElementById("all-products-link")
    .addEventListener("click", (e) => {
      e.preventDefault();
      loadProducts("all-products", 1, false, currentSortOrder);
    });

  document
    .getElementById("best-sellers-link")
    .addEventListener("click", (e) => {
      e.preventDefault();
      loadProducts("best-sellers", 1, false, currentSortOrder);
    });

  document
    .getElementById("new-products-link")
    .addEventListener("click", (e) => {
      e.preventDefault();
      loadProducts("new-products", 1, false, currentSortOrder);
    });

  document.getElementById("sale-link").addEventListener("click", (e) => {
    e.preventDefault();
    loadProducts("sale-products", 1, false, currentSortOrder);
  });
}

function setupPriceRangeSlider() {
  const minPriceInput = document.getElementById("min-price");
  const maxPriceInput = document.getElementById("max-price");
  const minPriceDisplay = document.querySelector(".min-price-display");
  const maxPriceDisplay = document.querySelector(".max-price-display");

  minPriceInput.addEventListener("input", (e) => {
    priceRange.min = parseInt(e.target.value, 10);
    minPriceDisplay.textContent = `$${priceRange.min}`;
    loadProducts(currentFilter, 1, false, currentSortOrder);
  });

  maxPriceInput.addEventListener("input", (e) => {
    priceRange.max = parseInt(e.target.value, 10);
    maxPriceDisplay.textContent = `$${priceRange.max}`;
    loadProducts(currentFilter, 1, false, currentSortOrder);
  });
}

setupPriceRangeSlider();
