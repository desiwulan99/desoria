import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../services/api";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

export default function DetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Deklarasi fungsi async langsung di dalam useEffect agar dependensi bersih
    const loadDetail = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        setError("");
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat detail produk.");
      } finally {
        setIsLoading(false); // Memastikan loading berhenti baik sukses maupun gagal
      }
    };

    loadDetail();
  }, [id]); // Hanya memicu ulang jika ID produk di URL berubah

  // Tangga Conditional UI
  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => window.location.reload()} />;
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: "20px", textAlign: "center" }}>
        <p>Produk tidak ditemukan.</p>
        <Link to="/" style={{ color: "#db2777", textDecoration: "underline" }}>
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="container detail-page" style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      {/* Tombol Kembali */}
      <Link to="/" className="btn-back" style={{ display: "inline-block", marginBottom: "20px", color: "#db2777", textDecoration: "none", fontWeight: "bold" }}>
        ← Kembali ke Katalog
      </Link>
      
      {/* Konten Utama Detail Sesuai Wireframe */}
      <div className="detail-wrapper" style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        {/* Bagian Foto */}
        <div className="detail-image" style={{ flex: "1", minWidth: "280px" }}>
          <img 
            src={product.image_url || "https://via.placeholder.com/300"} 
            alt={product.name} 
            style={{ width: "100%", borderRadius: "8px", objectCover: "cover" }}
          />
        </div>
        
        {/* Bagian Informasi Text */}
        <div className="detail-info" style={{ flex: "1.5", minWidth: "280px" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>{product.name}</h1>
          <p className="price" style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#db2777", marginBottom: "20px" }}>
            Rp {product.price?.toLocaleString("id-ID")}
          </p>
          
          {/* Metadata Brand & Store (Gunakan optional chaining ?. agar tidak crash) */}
          <div className="meta-info" style={{ borderTop: "1px solid #eee", borderBottom: "1px solid #eee", padding: "15px 0", marginBottom: "20px" }}>
            <p style={{ margin: "5px 0" }}><strong>Brand:</strong> {product.brand?.name || "No Brand"}</p>
            <p style={{ margin: "5px 0" }}><strong>Store:</strong> {product.store?.name || "Official Store"}</p>
          </div>
          
          {/* Deskripsi */}
          <div className="description">
            <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>Deskripsi Produk</h3>
            <p style={{ color: "#555", lineHeight: "1.6" }}>
              {product.description || "Tidak ada deskripsi produk untuk item ini."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}