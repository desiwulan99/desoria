import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { CartContext } from "../context/CartContext";
import { formatRupiah } from "../utils/format";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const image = product.imageUrl || "https://placehold.co/600x600?text=No+Image";

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-img-link">
        <div className="product-card-img-wrapper">
          <img src={image} alt={product.name} loading="lazy" />
        </div>
      </Link>
      <div className="product-card-content">
        <Link to={`/product/${product.id}`} className="product-title-link">
          <h3 className="product-title">{product.name}</h3>
        </Link>
        {product.category?.name && (
          <p className="product-category-label">{product.category.name}</p>
        )}
        <p className="price">{formatRupiah(product.price)}</p>

        <Button
          onClick={handleAdd}
          variant={justAdded ? "success" : "primary"}
          className={justAdded ? "btn-pop" : ""}
        >
          {justAdded ? "Ditambahkan ✓" : "Add +"}
        </Button>
      </div>
    </div>
  );
}
