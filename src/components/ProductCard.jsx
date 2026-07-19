import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  // Fallback jika url gambar bawaan API kosong atau rusak
  const fallbackImage = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400";

  return (
    <div className="product-card">
      <img 
        src={product.image_url || fallbackImage} 
        alt={product.name} 
        onError={(e) => { e.target.src = fallbackImage; }} 
      />
      <div className="product-card-content">
        <h3>{product.name}</h3>
        <p>Rp {product.price?.toLocaleString("id-ID")}</p>
        <Link to={`/product/${product.id}`} className="btn-detail">
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}