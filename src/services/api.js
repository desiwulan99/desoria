const BASE_URL = "https://sistech-ecommerce-api.leficullen.xyz/api";

export async function fetchProducts(params = {}) {
  const url = new URL(`${BASE_URL}/products`);
  
  if (params.category && params.category !== "null" && params.category !== "undefined") {
    url.searchParams.append("category", params.category);
  }
  if (params.city && params.city !== "null" && params.city !== "undefined") {
    url.searchParams.append("city", params.city);
  }
  if (params.search && params.search.trim() !== "") {
    url.searchParams.append("search", params.search);
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Gagal mengambil data. Status: ${response.status}`);
  }
  const result = await response.json();
  return result.data || result; 
}

export async function fetchProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Gagal memuat detail produk. Status: ${response.status}`);
  }
  const result = await response.json();
  return result.data;
}

export async function fetchCategories() {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error(`Gagal memuat kategori. Status: ${response.status}`);
  }
  const result = await response.json();
  return result.data || result;
}