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
import ProductCard from "../components/ProductCard";
import SkeletonLoader from "../components/SkeletonLoader";
import EmptyState from "../components/EmptyState";
import { fetchProducts } from "../services/api.js";

export default function HomePage({
  searchTerm,
  activeCategory,
  setActiveCategory,
  categories,
  sortBy,
  setSortBy,
  selectedCity,
}) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProducts({
          category: activeCategory,
          city: selectedCity,
          search: searchTerm,
        });
        if (isMounted) {
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Gagal memuat produk:", err);
        if (isMounted) setProducts([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    loadProducts();
    return () => {
      isMounted = false;
    };
  }, [activeCategory, selectedCity, searchTerm]);

  const getCategoryIcon = (slug) => {
    const iconProps = { size: 28, strokeWidth: 1.5 };
    switch (slug) {
      case "beauty":
        return <Sparkles {...iconProps} color="#ec4899" />;
      case "beverages":
        return <Coffee {...iconProps} color="#f59e0b" />;
      case "books-and-stationery":
        return <BookOpen {...iconProps} color="#3b82f6" />;
      case "electronics":
        return <Smartphone {...iconProps} color="#8b5cf6" />;
      case "fashion":
        return <Shirt {...iconProps} color="#ef4444" />;
      case "groceries":
        return <ShoppingBasket {...iconProps} color="#10b981" />;
      case "home-appliances":
        return <Home {...iconProps} color="#6366f1" />;
      case "muslim-wear":
        return <Heart {...iconProps} color="#d946ef" />;
      case "snacks":
        return <Cookie {...iconProps} color="#f97316" />;
      case "sports":
        return <Dumbbell {...iconProps} color="#06b6d4" />;
      default:
        return <Package {...iconProps} color="#64748b" />;
    }
  };

  const groupedProducts = useMemo(() => {
    if (!products.length) return {};
    let sorted = [...products];
    if (sortBy === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sortBy === "name-asc")
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "name-desc")
      sorted.sort((a, b) => b.name.localeCompare(a.name));

    return sorted.reduce((acc, product) => {
      const catName = product.category?.name || "Lainnya";
      if (!acc[catName]) acc[catName] = [];
      acc[catName].push(product);
      return acc;
    }, {});
  }, [products, sortBy]);

  return (
    <main className="container flex">
      <div className="flex-1">
        <div className="hero-header" style={{ marginBottom: "2rem" }}>
          <h1 className="hero-title">Jelajahi Produk Terbaik</h1>
        </div>
        <div className="category-section-container">
          <div className="category-grid-menu">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className={`category-grid-item ${activeCategory === cat.slug ? "active-grid-cat" : ""}`}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === cat.slug ? null : cat.slug,
                  )
                }
              >
                <div className="category-icon-wrapper">
                  {getCategoryIcon(cat.slug)}
                </div>
                <span>{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="sort-section-container">
          <label htmlFor="sort-select">Urutkan Berdasarkan:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-dropdown"
          >
            <option value="">Default</option>
            <option value="price-asc">Harga: Rendah ke Tinggi</option>
            <option value="price-desc">Harga: Tinggi ke Rendah</option>
            <option value="name-asc">Nama: A-Z</option>
            <option value="name-desc">Nama: Z-A</option>
          </select>
        </div>
        {isLoading ? (
          <SkeletonLoader count={8} />
        ) : Object.keys(groupedProducts).length === 0 ? (
          <EmptyState message="Produk tidak ditemukan." />
        ) : (
          Object.keys(groupedProducts).map((catName) => (
            <section
              key={catName}
              className="home-container"
              style={{ marginBottom: "2rem" }}
            >
              <div className="category-title-wrapper">
                <span className="category-line"></span>
                <h2>{catName}</h2>
              </div>
              <div className="product-grid">
                {groupedProducts[catName].map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </main>
  );
}