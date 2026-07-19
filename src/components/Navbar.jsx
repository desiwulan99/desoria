import { useEffect, useState } from "react";

export default function Navbar({ activeCategory, setActiveCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://sistech-ecommerce-api.leficullen.xyz/api/categories")
      .then((res) => res.json())
      .then((result) => {
        if (result.data) setCategories(result.data);
      })
      .catch((err) => console.error("Gagal memuat kategori:", err));
  }, []);

  return (
    <nav className="navbar">
      {/* Sisi Kiri: Logo Desoria */}
      <div className="navbar-logo" onClick={() => setActiveCategory(null)}>
        Desoria
      </div>

      {/* Sisi Kanan: Kategori Horizontal Mini & Icon Keranjang Real */}
      <div className="navbar-right">
        <div className="category-menu-mini">
          <button 
            className={activeCategory === null ? "active-nav" : ""} 
            onClick={() => setActiveCategory(null)}
          >
            Semua
          </button>
          {categories.slice(0, 3).map((cat) => (
            <button
              key={cat.id}
              className={activeCategory === cat.id ? "active-nav" : ""}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Icon Keranjang Menggunakan SVG Asli */}
        <div className="cart-icon-wrapper">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="cart-icon"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="http://www.w3.org/2000/svg M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="cart-badge">0</span>
        </div>
      </div>
    </nav>
  );
}