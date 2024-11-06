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

// Lấy sản phẩm theo ID
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}");/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
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

export const getRandomProducts = async () => {
  try {
    const response = await fetch(`${API_URL}`);
    const products = await response.json();

    // Shuffle the array and get the first 10 items
    const randomProducts = products
      .sort(() => Math.random() - 0.5) // Shuffle array
      .slice(0, 10); // Get first 10 products after shuffling

    return randomProducts;
  } catch (error) {
    console.error("Error fetching random products:", error);
  }
};
