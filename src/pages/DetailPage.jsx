import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";

export default function DetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://sistech-ecommerce-api.leficullen.xyz/api/products")
      .then((res) => res.json())
      .then((result) => {
        if (result.data) {
          const found = result.data.find((p) => String(p.id) === String(id));
          setProduct(found || null);
        }
      })
      .catch((err) => console.error("Error fetching product detail:", err))
      .finally(() => setIsLoading(false));
  }, [id]);

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

  if (!product) {
    return (
      <div className="container">
        <Link to="/" className="btn-back">Kembali ke Beranda</Link>
        <EmptyState message="Detail produk tidak ditemukan atau ID tidak valid." />
      </div>
    );
  }

  const title = product.name || product.nama || "Produk Tanpa Nama";
  const price = product.price || product.harga || 0;
  const image = product.image_url || product.imageUrl || product.image || "https://via.placeholder.com/150";
  const description = product.description || product.deskripsi || "Tidak ada deskripsi untuk produk ini.";

  return (
    <main className="container detail-container">
      <Link to="/" className="btn-back">
        &lt; Kembali ke Beranda
      </Link>
      
      <div className="detail-layout">
        <div className="detail-image-wrapper">
          <img src={image} alt={title} className="detail-image" />
        </div>
        
        <div className="detail-info-section">
          <h1 className="detail-title">{title}</h1>
          <p className="detail-price">Rp {price.toLocaleString("id-ID")}</p>
          <div className="detail-divider"></div>
          <h4 className="section-subtitle">Deskripsi Produk</h4>
          <p className="detail-description">{description}</p>
          
          <div className="detail-action-wrapper">
            <Button onClick={() => console.log(`Ditambahkan ke keranjang dari detail: ${product.id}`)}>
              Masukkan ke Keranjang
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}