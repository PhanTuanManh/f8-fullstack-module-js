// initCategoryBreadcrumb.js

// Function to get URL parameter
function getCategoryFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("category") || "Shop"; // Default to "Category" if no parameter
}

// Function to initialize and update the breadcrumb
function initCategoryBreadcrumb() {
  const category = getCategoryFromUrl(); // Retrieve the category from the URL
  const breadcrumbElement = document.getElementById("breadcrumb-category");

  // Update breadcrumb text and href link
  breadcrumbElement.textContent = category;
  breadcrumbElement.href = `category.html?category=${encodeURIComponent(
    category
  )}`;

  // Add event listener for back button
  const backButton = document.getElementById("back-button");
  if (backButton) {
    backButton.addEventListener("click", () => {
      window.history.back(); // Navigate to the previous page
    });
  }

  // Add event listener for next button
  const nextButton = document.getElementById("next-button");
  if (nextButton) {
    backButton.addEventListener("click", () => {
      window.history.next(); // Navigate to the previous page
    });
  }
}

// Initialize breadcrumb on page load
document.addEventListener("DOMContentLoaded", initCategoryBreadcrumb);
