import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function SidebarCart({ isOpen }) {
  const { cart, setCart } = useContext(CartContext);
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckout = () => {
    alert("Barang anda segera disiapkan");
    setCart([]);
  };

  return (
    <div className={`sidebar-container ${isOpen ? "" : "sidebar-hidden"}`}>
      <div className="sidebar-content">
        <h3 className="sidebar-title">Keranjang</h3>
        
        <div className="cart-items-list">
          {cart.length === 0 ? (
            <p className="empty-cart-text">Keranjang masih kosong</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="sidebar-cart-item">
                <span className="item-name">{item.name} x{item.qty}</span>
                <span className="item-price">Rp {item.price.toLocaleString("id-ID")}</span>
              </div>
            ))
          )}
        </div>

        <div className="sidebar-footer">
          <div className="total-row">
            <strong>Total:</strong>
            <span className="total-price">Rp {total.toLocaleString("id-ID")}</span>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}