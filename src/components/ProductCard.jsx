import { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-img-link">
        <div className="product-card-img-wrapper">
          <img src={product.imageUrl} alt={product.name} />
        </div>
      </Link>
      <div className="product-card-content">
        <Link to={`/product/${product.id}`} className="product-title-link">
          <h3 className="product-title">{product.name}</h3>
        </Link>
        <p className="product-category-label">{product.category?.name}</p>
        <p className="price">Rp {product.price.toLocaleString("id-ID")}</p>
        
        <Button onClick={(e) => {
          e.preventDefault();
          addToCart(product); // Fungsi ini akan memicu update di SidebarCart secara otomatis
        }}>
          Add +
        </Button>
      </div>
    </div>
  );
}