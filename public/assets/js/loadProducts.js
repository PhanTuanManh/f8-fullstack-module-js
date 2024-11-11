let allProducts = []; // Store all products once fetched
let currentPage = 1; // Track current page
const pageSize = 10; // Number of products per page
let currentFilter = "all-products";
let currentSortOrder = "asc"; // Default sort order

async function fetchAllProducts() {
  if (allProducts.length === 0) {
    const response = await fetch("http://localhost:5000/products");
    allProducts = await response.json();
  }
  return allProducts;
}

export async function loadProducts(
  filterType = "all-products",
  page = 1,
  isLoadMore = false,
  sortOrder = "asc"
) {
  const products = await fetchAllProducts();
  currentPage = page;
  currentFilter = filterType;
  currentSortOrder = sortOrder;

  let filteredProducts;
  switch (filterType) {
    case "best-sellers":
      filteredProducts = products.filter((product) => product.sell > 99);
      break;
    case "new-products":
      filteredProducts = products.filter((product) => product.new === true);
      break;
    case "sale-products":
      filteredProducts = products.filter(
        (product) => product.discountPercentage >= 10
      );
      break;
    default:
      filteredProducts = products;
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

export function initLoadMoreButton() {
  const loadMoreButton = document.querySelector(".load-more a");
  loadMoreButton.addEventListener("click", (e) => {
    e.preventDefault();
    currentPage += 1;
    loadProducts(currentFilter, currentPage, true, currentSortOrder);
  });
}
