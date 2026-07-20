import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../services/api";
import { CartContext } from "../context/CartContext";
import { formatRupiah } from "../utils/format";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";

export default function DetailPage() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [justAdded, setJustAdded] = useState(false);

  const loadDetail = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await fetchProductById(id);
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat detail produk.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- pola fetch-saat-mount standar (lihat materi Fetch & APIs)
    loadDetail();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  if (isLoading) {
    return (
      <div className="container detail-loading">
        <div className="skeleton-block detail-image-skeleton"></div>
        <div className="detail-info-skeleton">
          <div className="skeleton-block title-skeleton"></div>
          <div className="skeleton-block price-skeleton"></div>
          <div className="skeleton-block text-skeleton"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <Link to="/" className="btn-back">&lt; Kembali ke Beranda</Link>
        <ErrorState message={error} onRetry={loadDetail} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container">
        <Link to="/" className="btn-back">&lt; Kembali ke Beranda</Link>
        <EmptyState message="Detail produk tidak ditemukan atau ID tidak valid." />
      </div>
    );
  }

  const image = product.imageUrl || "https://placehold.co/600x600?text=No+Image";

  return (
    <main className="container detail-container">
      <Link to="/" className="btn-back">
        &lt; Kembali ke Beranda
      </Link>

      <div className="detail-layout">
        <div className="detail-image-wrapper">
          <img src={image} alt={product.name} className="detail-image" />
        </div>

        <div className="detail-info-section">
          {product.category?.name && (
            <p className="product-category-label">{product.category.name}</p>
          )}
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-price">{formatRupiah(product.price)}</p>
          <div className="detail-divider"></div>
          <h4 className="section-subtitle">Deskripsi Produk</h4>
          <p className="detail-description">
            {product.description || "Tidak ada deskripsi untuk produk ini."}
          </p>

          <div className="detail-action-wrapper">
            <Button variant={justAdded ? "success" : "primary"} onClick={handleAddToCart}>
              {justAdded ? "Ditambahkan ke Keranjang ✓" : "Masukkan ke Keranjang"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
