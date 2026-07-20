const BASE_URL = "https://sistech-ecommerce-api.leficullen.xyz/api";

function extractArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.products)) return payload.data.products;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  if (Array.isArray(payload?.products)) return payload.products;
  console.warn("[api.js] Bentuk respons tidak dikenali, cek /api/docs:", payload);
  return [];
}

function normalizeProduct(product) {
  if (!product) return product;
  const category = product.category || null;
  return {
    ...product,
    price: Number(product.price ?? product.harga ?? 0),
    imageUrl:
      product.imageUrl ||
      product.image_url ||
      product.image ||
      product.thumbnail ||
      null,
    category: category
      ? { ...category, slug: category.slug || category.id }
      : null,
    category_id: product.category_id ?? category?.id ?? null,
  };
}

function normalizeCategory(cat) {
  if (!cat) return cat;
  return { ...cat, slug: cat.slug || cat.id };
}

async function getJson(path, fallbackMessage) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`);
  } catch {
    throw new Error(`${fallbackMessage} (tidak bisa menghubungi server)`);
  }
  if (!response.ok) {
    throw new Error(`${fallbackMessage} (Status: ${response.status})`);
  }
  return response.json();
}

export async function fetchProducts() {
  const payload = await getJson("/products", "Gagal mengambil data produk");
  return extractArray(payload).map(normalizeProduct);
}

export async function fetchProductById(id) {
  const payload = await getJson(`/products/${id}`, "Gagal memuat detail produk");
  const data = payload?.data ?? payload;
  return normalizeProduct(data);
}

export async function fetchCategories() {
  const payload = await getJson("/categories", "Gagal memuat kategori");
  return extractArray(payload).map(normalizeCategory);
}
