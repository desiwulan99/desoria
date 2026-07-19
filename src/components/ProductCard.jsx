import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image_url || "https://via.placeholder.com/150"} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Rp {product.price?.toLocaleString("id-ID")}</p>
      <Link to={`/product/${product.id}`} className="btn-detail">
        Lihat Detail
      </Link>
    </div>
  );
}