import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import SearchBar from "./SearchBar";

export default function Navbar({ searchTerm, setSearchTerm, activeCategory, setActiveCategory, categories, toggleCart }) {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="desoria-header">
      <div className="top-bar">
        <div className="top-bar-left">
          <span>Seller Centre</span> | <span>Download</span> | <span>Ikuti kami di</span>
        </div>
        <div className="top-bar-right">
          <span>Notifikasi</span> | <span>Bantuan</span> | <span className="username">dezii_wuln</span>
        </div>
      </div>

      <div className="main-nav">
        <div className="logo-section" onClick={() => setActiveCategory(null)}>
          DESORIA
        </div>

        <div className="search-and-tags">
          <SearchBar 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Cari produk, merek dan toko di Desoria..."
          />

          <div className="nav-tags">
            <span className={activeCategory === null ? "active-tag" : ""} onClick={() => setActiveCategory(null)}>
              Semua Produk
            </span>
            {categories.map((cat) => (
              <span key={cat.id} className={activeCategory === cat.slug ? "active-tag" : ""} onClick={() => setActiveCategory(cat.slug)}>
                {cat.name}
              </span>
            ))}
          </div>
        </div>

        <div className="cart-container" onClick={toggleCart}>
          <svg className="desoria-cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM17 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12M20 7H6.21l-1.1-2.34A1 1 0 0 0 4.22 4H2v2h1.36l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.06L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 20 7z"/>
          </svg>
          <span className="cart-badge-count">{totalItems}</span>
        </div>
      </div>
    </header>
  );
}