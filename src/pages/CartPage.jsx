import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function CartPage() {
  const { cart, setCart } = useContext(CartContext);
  const [showNotification, setShowNotification] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckout = () => {
    setShowNotification(true);
    setCart([]);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="container" style={{ padding: "2rem 0" }}>
      <h2>Keranjang Belanja</h2>

      {showNotification && (
        <div
          style={{
            background: "#10b981",
            color: "white",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "4px",
          }}
        >
          Barang anda segera disiapkan
        </div>
      )}

      {cart.length === 0 ? (
        <p style={{ color: "#64748b", margin: "20px 0" }}>Keranjang belanja Anda kosong.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "10px 0",
                padding: "10px 0",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <span>
                {item.name} (x{item.qty})
              </span>
              <span>Rp {(item.price * item.qty).toLocaleString("id-ID")}</span>
            </div>
          ))}

          <hr style={{ margin: "20px 0", border: "0", borderTop: "1px solid #cbd5e1" }} />
          <div style={{ fontWeight: "bold", fontSize: "1.1rem", display: "flex", justifyContent: "space-between" }}>
            <span>Total:</span>
            <span>Rp {total.toLocaleString("id-ID")}</span>
          </div>

          <button 
            onClick={handleCheckout} 
            style={{ 
              marginTop: "20px", 
              padding: "10px 20px", 
              backgroundColor: "#2563eb", 
              color: "white", 
              border: "none", 
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}