// Lấy tất cả sản phẩm

const API_URL = "http://localhost:5000/products";
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all products:", error);
  }
};

// Fetch product by ID
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`); // Correct URL format
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`); // Error handling for 404
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

// Tìm kiếm sản phẩm theo tên
export const searchProducts = async (keyword) => {
  try {
    const response = await fetch("${API_URL}");
    const products = await response.json();
    return products.filter((product) =>
      product.name.toLowerCase().includes(keyword.toLowerCase())
    );
  } catch (error) {
    console.error("Error searching products:", error);
  }
};

// Lọc sản phẩm theo danh mục
export const getProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_URL}");?category=${category}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
  }
};

// Sắp xếp sản phẩm theo trường (price, rating, v.v.)
export const sortProducts = async (field, order = "asc") => {
  try {
    const response = await fetch(
      `${API_URL}");?_sort=${field}&_order=${order}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sorting products:", error);
  }
};

// Lấy tất cả các danh mục
export const getAllCategories = async () => {
  try {
    const response = await fetch(`${API_URL}`);
    const products = await response.json();
    const categories = products.map((product) => product.category);
    return [...new Set(categories)];
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export const get10BestSellersProducts = async () => {
  const response = await fetch(`${API_URL}`); // Replace with actual endpoint
  const products = await response.json();

  // Filter and return the first 10 products with "new: true"
  return products.filter((product) => product.sell >= 99).slice(0, 10);
};

export const get10NewProducts = async () => {
  const response = await fetch(`${API_URL}`); // Replace with actual endpoint
  const products = await response.json();

  // Filter and return the first 10 products with "new: true"
  return products.filter((product) => product.new === true).slice(0, 10);
};

export const get10DiscountedProducts = async () => {
  const products = await getAllProducts(); // Assuming getAllProducts fetches all products

  // Filter products with discountPercentage > 10 and return the first 10
  return products
    .filter((product) => product.discountPercentage > 10)
    .slice(0, 10);
};
