const BASE_URL = "https://sistech-ecommerce-api.leficullen.xyz/api";

// Mengambil semua daftar produk
export async function fetchProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error(`Gagal mengambil data. Status: ${response.status}`);
  }
  const result = await response.json();
  return result.data; 
}

// Mengambil detail satu produk berdasarkan ID
export async function fetchProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Gagal memuat detail produk. Status: ${response.status}`);
  }
  const result = await response.json();
  return result.data;
}