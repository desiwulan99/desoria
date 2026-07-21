import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { formatRupiah } from "../utils/format";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const { cart, updateQty, removeFromCart, clearCart, totalPrice } = useContext(CartContext);
  const [showNotification, setShowNotification] = useState(false);

  const handleCheckout = () => {
    setShowNotification(true);
    clearCart();
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="container cart-page">
      <h2 className="section-main-heading">Keranjang Belanja</h2>

      {showNotification && (
        <div className="checkout-notification">Barang anda segera disiapkan</div>
      )}

      {cart.length === 0 ? (
        <EmptyState message="Keranjang belanja Anda kosong.">
          <Link to="/" className="btn-back">Belanja sekarang</Link>
        </EmptyState>
      ) : (
        <>
          <div className="cart-page-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-page-item">
                <img
                  src={item.imageUrl || "https://placehold.co/100x100?text=No+Image"}
                  alt={item.name}
                  className="cart-page-item-img"
                />
                <div className="cart-page-item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">{formatRupiah(item.price)}</span>
                </div>
                <div className="item-qty-controls">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Kurangi">−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Tambah">+</button>
                </div>
                <span className="cart-page-item-subtotal">{formatRupiah(item.price * item.qty)}</span>
                <button className="item-remove-btn" onClick={() => removeFromCart(item.id)} aria-label="Hapus">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-page-summary">
            <div className="total-row">
              <span>Total:</span>
              <span className="total-price">{formatRupiah(totalPrice)}</span>
            </div>
            <Button variant="primary" fullWidth={false} onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
