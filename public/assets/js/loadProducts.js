import { getAllProducts as fetchAllProducts } from "./fetchAPI.js";

let allProducts = [];
let currentPage = 1;
const pageSize = 10;
let currentFilter = "all-products";
let currentSortOrder = "asc";
let selectedCategory = "";
let selectedBrands = [];
let selectedTags = [];
let priceRange = { min: 0, max: 1000 };
let currentSearchQuery = "";

function applyFilters(products) {
  return products.filter((product) => {
    const categoryMatch =
      !selectedCategory || product.category === selectedCategory;
    const brandMatch =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const tagMatch =
      selectedTags.length === 0 ||
      product.tags.some((tag) => selectedTags.includes(tag));
    const priceMatch =
      product.price >= priceRange.min && product.price <= priceRange.max;
    const searchMatch =
      !currentSearchQuery ||
      product.title.toLowerCase().includes(currentSearchQuery.toLowerCase());

    return categoryMatch && brandMatch && tagMatch && priceMatch && searchMatch;
  });
}

// Loads products with filtering, sorting, pagination, and search query
export function loadProducts(
  filterType = "all-products",
  page = 1,
  isLoadMore = false,
  sortOrder = "asc",
  searchQuery = ""
) {
  const urlParams = new URLSearchParams(window.location.search);
  selectedCategory = urlParams.get("category");
  currentSearchQuery = searchQuery;

  fetchAllProducts().then((products) => {
    currentPage = page;
    currentFilter = filterType;
    currentSortOrder = sortOrder;

    let filteredProducts = applyFilters(products);

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

    filteredProducts = filteredProducts.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

    document.querySelector(
      ".product-count"
    ).textContent = `${filteredProducts.length} products`;

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedProducts = filteredProducts.slice(
      startIndex,
      startIndex + pageSize
    );

    renderProductList(paginatedProducts, isLoadMore);
  });
}

// Load more button initialization
export function initLoadMoreButton() {
  document.querySelector(".load-more a").addEventListener("click", (e) => {
    e.preventDefault();
    currentPage += 1;
    loadProducts(
      currentFilter,
      currentPage,
      true,
      currentSortOrder,
      currentSearchQuery
    );
  });
}

// Setup sorting functionality
export function setupSorting() {
  const lowToHigh = document.querySelector(".low-to-hight");
  const highToLow = document.querySelector(".hight-to-low");

  lowToHigh.addEventListener("click", () => {
    currentSortOrder = "asc";

    // Apply the active class to the clicked element and remove from the other
    lowToHigh.classList.add("text-primary");
    highToLow.classList.remove("text-primary");

    loadProducts(currentFilter, 1, false, currentSortOrder, currentSearchQuery);
  });

  highToLow.addEventListener("click", () => {
    currentSortOrder = "desc";

    // Apply the active class to the clicked element and remove from the other
    highToLow.classList.add("text-primary");
    lowToHigh.classList.remove("text-primary");

    loadProducts(currentFilter, 1, false, currentSortOrder, currentSearchQuery);
  });
}

// Setup filter buttons and sliders for filtering
function setupFilterButtons() {
  document
    .querySelectorAll(".category-list input[type='checkbox']")
    .forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        selectedCategory = e.target.checked ? e.target.value : "";
        loadProducts(
          currentFilter,
          1,
          false,
          currentSortOrder,
          currentSearchQuery
        );
      });
    });

  document
    .querySelectorAll(".brand-list input[type='checkbox']")
    .forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        selectedBrands = Array.from(
          document.querySelectorAll(
            ".brand-list input[type='checkbox']:checked"
          )
        ).map((input) => input.value);
        loadProducts(
          currentFilter,
          1,
          false,
          currentSortOrder,
          currentSearchQuery
        );
      });
    });

  document
    .querySelectorAll(".tag-list input[type='checkbox']")
    .forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        selectedTags = Array.from(
          document.querySelectorAll(".tag-list input[type='checkbox']:checked")
        ).map((input) => input.value);
        loadProducts(
          currentFilter,
          1,
          false,
          currentSortOrder,
          currentSearchQuery
        );
      });
    });

  // Price range filter with display update
  document.getElementById("min-price").addEventListener("input", (e) => {
    priceRange.min = parseInt(e.target.value, 10);
    document.querySelector(
      ".min-price-display"
    ).textContent = `$${priceRange.min}`;
    loadProducts(currentFilter, 1, false, currentSortOrder, currentSearchQuery);
  });

  document.getElementById("max-price").addEventListener("input", (e) => {
    priceRange.max = parseInt(e.target.value, 10);
    document.querySelector(
      ".max-price-display"
    ).textContent = `$${priceRange.max}`;
    loadProducts(currentFilter, 1, false, currentSortOrder, currentSearchQuery);
  });
}

// Render filtered products list
function renderProductList(products, isLoadMore) {
  const productList = document.querySelector(".products");
  if (!productList) return;

  if (!isLoadMore) {
    productList.innerHTML = "";
  }

  if (products.length === 0) {
    productList.classList.remove(
      "grid",
      "grid-cols-2",
      "md:grid-cols-3",
      "xl:grid-cols-4",
      "3xl:grid-cols-5",
      "gap-[30px]"
    );
    productList.classList.add("flex", "flex-col", "items-center");
    productList.innerHTML = `<div class="text-lg font-semibold">No products found.</div>`;
    return;
  } else {
    productList.classList.add(
      "grid",
      "grid-cols-2",
      "md:grid-cols-3",
      "xl:grid-cols-4",
      "3xl:grid-cols-5",
      "gap-[30px]"
    );
    productList.classList.remove("flex", "flex-col", "items-center");

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
          ? `<span class="discount absolute top-5 right-3 py-1 bg-transparent font-semibold px-3.5 text-[12px]">-${product.discountPercentage}%</span>`
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
}

// Populate filter options from API data
export function populateFilters() {
  fetchAllProducts().then((products) => {
    const brands = new Set(products.map((product) => product.brand));
    const tags = new Set(products.flatMap((product) => product.tags));

    const brandContainer = document.querySelector(".brand-list");
    const tagContainer = document.querySelector(".tag-list");

    brandContainer.innerHTML = "";
    tagContainer.innerHTML = "";

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
        <label for="${brand}" class="cursor-pointer ml-2 text-slate-600 text-sm select-none capitalize">${brand}</label>
      `;
      brandContainer.appendChild(brandItem);
    });

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
        <label for="${tag}" class="cursor-pointer ml-2 text-slate-600 text-sm select-none capitalize">${tag}</label>
      `;
      tagContainer.appendChild(tagItem);
    });

    setupFilterButtons();
  });
}

// Setup filter link buttons
export function setupFilterButtonslink() {
  const filterLinks = [
    { id: "all-products-link", filter: "all-products" },
    { id: "best-sellers-link", filter: "best-sellers" },
    { id: "new-products-link", filter: "new-products" },
    { id: "sale-link", filter: "sale-products" },
  ];

  filterLinks.forEach((link) => {
    const element = document.getElementById(link.id);
    element.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active class from all links
      filterLinks.forEach((item) => {
        const liElement = document.getElementById(item.id).parentElement;
        liElement.classList.remove("mp-hot-sale-text-active");
      });

      // Add active class to the clicked link's parent <li>
      element.parentElement.classList.add("mp-hot-sale-text-active");

      // Call loadProducts with the specific filter
      loadProducts(link.filter, 1, false, currentSortOrder, currentSearchQuery);
    });
  });
}
