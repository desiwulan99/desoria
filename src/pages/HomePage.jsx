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

  // Handler retry untuk komponen ErrorState agar tetap bisa memicu fetch ulang
  const handleRetry = () => {
    window.location.reload();
  };

  useEffect(() => {
    // Deklarasi fungsi langsung di dalam useEffect agar dependensinya bersih
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
  }, []); // Kosong karena hanya berjalan sekali saat komponen pertama kali dimuat

  // Filter produk berdasarkan input pencarian (Search Feature)
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    <div>
      {/* Navbar Desoria */}
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <main className="container" style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ marginBottom: "20px" }}>Daftar Produk</h2>

        {/* Tangga Conditional UI */}
        {isLoading && <LoadingState />}

        {!isLoading && error && (
          <ErrorState message={error} onRetry={handleRetry} />
        )}

        {/* Kondisi Empty State (Data dari API memang kosong sejak awal) */}
        {!isLoading && !error && products.length === 0 && (
          <div className="empty-state" style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            Belum ada produk terdaftar di marketplace.
          </div>
        )}

        {/* Kondisi Not Found (Hasil pencarian kata kunci tidak ada) */}
        {!isLoading && !error && products.length > 0 && filteredProducts.length === 0 && (
          <div className="not-found-state" style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            Produk "{searchTerm}" tidak ditemukan.
          </div>
        )}

        {/* Render Produk Menggunakan .map() */}
        {!isLoading && !error && filteredProducts.length > 0 && (
          <div className="product-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}