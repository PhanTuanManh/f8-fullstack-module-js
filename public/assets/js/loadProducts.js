// loadProducts.js
let allProducts = [];
let currentPage = 1;
const pageSize = 10;
let currentFilter = "all-products";
let currentSortOrder = "asc";
let selectedCategory = "";

// Fetches products only once and stores in `allProducts`
function fetchAllProducts() {
  if (allProducts.length === 0) {
    return fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
        allProducts = data;
        return allProducts;
      });
  }
  return Promise.resolve(allProducts);
}

// Function to load products based on category, filter, and sort order
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

    // Filter products by selected category
    let filteredProducts = products;
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Apply additional filters
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

    // Update product count display
    document.querySelector(
      ".product-count"
    ).textContent = `${filteredProducts.length} products`;

    // Paginate results
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedProducts = filteredProducts.slice(
      startIndex,
      startIndex + pageSize
    );

    // Render the paginated product list
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

function renderProductList(products, isLoadMore) {
  const productList = document.querySelector(".products");
  if (!productList) return;

  if (!isLoadMore) {
    productList.innerHTML = ""; // Clear existing products only on initial load
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
        ? `<span class="discount absolute top-5 right-0 text-[#FF6962] font-semibold px-3.5 text-[12px]">-${product.discountPercentage}%</span>`
        : "";

    const hot = product.hot
      ? `<span class="tag absolute top-5 left-0 text-white bg-[#FF6962] font-semibold px-3.5 text-[14px]">Hot</span>`
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

export function setupFilterButtons() {
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
