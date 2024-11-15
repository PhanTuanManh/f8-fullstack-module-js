// categoryBreadcrumb.js
function getCategoryFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("category") || "Shop";
}

function initCategoryBreadcrumb() {
  const category = getCategoryFromUrl();
  const breadcrumbElement = document.getElementById("breadcrumb-category");

  breadcrumbElement.textContent = category;
  breadcrumbElement.href = `category.html?category=${encodeURIComponent(
    category
  )}`;

  document.getElementById("back-button")?.addEventListener("click", () => {
    window.history.back();
  });
  document.getElementById("next-button")?.addEventListener("click", () => {
    window.history.forward();
  });
}
document.addEventListener("DOMContentLoaded", initCategoryBreadcrumb);
