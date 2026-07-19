import { useState, useEffect, useMemo } from "react";
import { fetchProducts } from "../services/api";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError("");
        const data = await fetchProducts();
        setProducts(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan sistem");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory ? product.category_id === activeCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, activeCategory]);

  return (
    <div>
      <Navbar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      
      <main className="container">
        {/* Header Sapaan Eksklusif Sesuai Gambar Referensi */}
        <div className="hero-header">
          <p className="hero-sub">Halo!</p>
          <h1 className="hero-title">Jelajahi Produk</h1>
        </div>

        {/* Baris Pencarian & Filter Horizontal */}
        <div className="browse-filter-bar">
          <span className="browse-label">Browse By</span>
          
          <input
            type="text"
            placeholder="Cari produk di Desoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input-modern"
          />
        </div>

        {/* Tangga Conditional UI dan Grid */}
        {isLoading && <LoadingState />}
        {!isLoading && error && <ErrorState message={error} onRetry={() => window.location.reload()} />}
        
        {!isLoading && !error && filteredProducts.length === 0 && (
          <div className="not-found-state">Produk tidak ditemukan.</div>
        )}

        {!isLoading && !error && filteredProducts.length > 0 && (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}