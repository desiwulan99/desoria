import { useState, useEffect, useMemo } from "react";
import {
  Sparkles,
  Coffee,
  BookOpen,
  Smartphone,
  Shirt,
  ShoppingBasket,
  Home,
  Heart,
  Cookie,
  Dumbbell,
  Package,
} from "lucide-react";
import { fetchProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import SkeletonLoader from "../components/SkeletonLoader";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

const CATEGORY_ICONS = {
  beauty: { Icon: Sparkles, color: "#ec4899" },
  beverages: { Icon: Coffee, color: "#f59e0b" },
  "books-and-stationery": { Icon: BookOpen, color: "#3b82f6" },
  electronics: { Icon: Smartphone, color: "#8b5cf6" },
  fashion: { Icon: Shirt, color: "#ef4444" },
  groceries: { Icon: ShoppingBasket, color: "#10b981" },
  "home-appliances": { Icon: Home, color: "#6366f1" },
  "muslim-wear": { Icon: Heart, color: "#d946ef" },
  snacks: { Icon: Cookie, color: "#f97316" },
  sports: { Icon: Dumbbell, color: "#06b6d4" },
};

function CategoryIcon({ slug }) {
  const entry = CATEGORY_ICONS[slug] || { Icon: Package, color: "#64748b" };
  const { Icon, color } = entry;
  return <Icon size={28} strokeWidth={1.5} color={color} />;
}

export default function HomePage({
  searchTerm,
  activeCategory,
  setActiveCategory,
  categories,
  sortBy,
  setSortBy,
  activeStore,
  activeBrand,
  stores = [],
  brands = [],
}) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan sistem");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- pola fetch-saat-mount standar (lihat materi Fetch & APIs)
    loadProducts();
  }, []);

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = (product.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory = activeCategory
        ? product.category?.slug === activeCategory ||
          product.category?.id === activeCategory ||
          product.category_id === activeCategory
        : true;

      // Filter tambahan: toko & brand (mengikuti pola matchesCategory di atas).
      const matchesStore = activeStore
        ? product.store?.slug === activeStore ||
          product.store?.id === activeStore ||
          product.store_id === activeStore
        : true;

      const matchesBrand = activeBrand
        ? product.brand?.slug === activeBrand ||
          product.brand?.id === activeBrand ||
          product.brand_id === activeBrand
        : true;

      return matchesSearch && matchesCategory && matchesStore && matchesBrand;
    });

    const sorted = [...filtered];
    if (sortBy === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sortBy === "name-asc") sorted.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    else if (sortBy === "name-desc") sorted.sort((a, b) => (b.name || "").localeCompare(a.name || ""));

    return sorted;
  }, [products, searchTerm, activeCategory, sortBy, activeStore, activeBrand]);

  const resetFilters = () => {
    setActiveCategory(null);
    setSortBy("");
  };

  const activeStoreName = activeStore
    ? stores.find((s) => s.slug === activeStore)?.name
    : null;
  const activeBrandName = activeBrand
    ? brands.find((b) => b.slug === activeBrand)?.name
    : null;

  return (
    <main className="container flex">
      <div className="flex-1">
        <div className="hero-header">
          <h1 className="hero-title">Jelajahi Produk Terbaik</h1>
        </div>

        <div className="category-section-container">
          <div className="category-grid-menu">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className={`category-grid-item ${activeCategory === cat.slug ? "active-grid-cat" : ""}`}
                onClick={() => setActiveCategory(activeCategory === cat.slug ? null : cat.slug)}
              >
                <div className="category-icon-wrapper">
                  <CategoryIcon slug={cat.slug} />
                </div>
                <span>{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {(activeStoreName || activeBrandName) && (
          <div className="active-filter-chips">
            {activeStoreName && (
              <span className="filter-chip">
                Toko: {activeStoreName}
              </span>
            )}
            {activeBrandName && (
              <span className="filter-chip">
                Brand: {activeBrandName}
              </span>
            )}
          </div>
        )}

        {isLoading && <SkeletonLoader count={8} />}

        {!isLoading && error && <ErrorState message={error} onRetry={loadProducts} />}

        {!isLoading && !error && (
          <section className="home-container">
            <div className="category-title-wrapper">
              <span className="category-line"></span>
              <h2>
                {activeCategory
                  ? categories.find((c) => c.slug === activeCategory)?.name
                  : "Semua Produk"}
              </h2>
            </div>

            {visibleProducts.length === 0 ? (
              <EmptyState
                message="Produk tidak ditemukan."
                actionLabel="Reset Filter"
                onAction={resetFilters}
              />
            ) : (
              <div className="product-grid">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
