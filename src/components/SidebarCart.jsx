import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { formatRupiah } from "../utils/format";
import Button from "./Button";

export default function SidebarCart() {
  const { cart, updateQty, removeFromCart, clearCart, totalPrice, isCartOpen, setIsCartOpen } =
    useContext(CartContext);
  const onClose = () => setIsCartOpen(false);

  const handleCheckout = () => {
    alert("Barang anda segera disiapkan");
    clearCart();
    onClose();
  };

  return (
    <>
      {isCartOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <div className={`sidebar-container ${isCartOpen ? "" : "sidebar-hidden"}`}>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <h3 className="sidebar-title">Keranjang</h3>
            <button className="sidebar-close-btn" onClick={onClose} aria-label="Tutup keranjang">
              ✕
            </button>
          </div>

          <div className="cart-items-list">
            {cart.length === 0 ? (
              <p className="empty-cart-text">Keranjang masih kosong</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="sidebar-cart-item">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">{formatRupiah(item.price * item.qty)}</span>
                  </div>
                  <div className="item-qty-controls">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Kurangi">−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Tambah">+</button>
                    <button className="item-remove-btn" onClick={() => removeFromCart(item.id)} aria-label="Hapus">
                      🗑
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="sidebar-footer">
            <div className="total-row">
              <strong>Total:</strong>
              <span className="total-price">{formatRupiah(totalPrice)}</span>
            </div>
            <Button variant="primary" disabled={cart.length === 0} onClick={handleCheckout}>
              Checkout
            </Button>
            <Link to="/cart" className="view-full-cart-link" onClick={onClose}>
              Lihat keranjang lengkap
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
