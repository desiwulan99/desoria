import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Store, Tags } from "lucide-react";
import { CartContext } from "../context/CartContext";
import SearchBar from "./SearchBar";
import logoImg from "../assets/logo-d.png";

const SORT_OPTIONS = [
  { value: "", label: "Pilihan Terpopuler" },
  { value: "price-asc", label: "Harga: Rendah ke Tinggi" },
  { value: "price-desc", label: "Harga: Tinggi ke Rendah" },
  { value: "name-asc", label: "Nama: A-Z" },
  { value: "name-desc", label: "Nama: Z-A" },
];

export default function Navbar({
  searchTerm,
  setSearchTerm,
  setActiveCategory,
  stores = [],
  activeStore,
  setActiveStore,
  brands = [],
  activeBrand,
  setActiveBrand,
  sortBy,
  setSortBy,
}) {
  const { totalItems, setIsCartOpen } = useContext(CartContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="desoria-header">
      <div className="top-bar">
        <div className="top-bar-left">
          <span>Seller Centre</span> | <span>Download</span>
        </div>
        <div className="top-bar-right">
          <span>Notifikasi</span> | <span>Bantuan</span> | <span className="username">Profile</span>
        </div>
      </div>

      <div className="main-nav">
        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((v) => !v)}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link
          to="/"
          className="logo-section"
          onClick={() => {
            setActiveCategory(null);
            closeMobileMenu();
          }}
        >
          <img src={logoImg} alt="Desoria" className="logo-icon" />
          DESORIA
        </Link>

        <div className="search-and-tags">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari produk, merek dan toko di Desoria..."
          />

          <div className="nav-filter-row">
            <div className="nav-filter-item">
              <Store size={15} className="nav-filter-icon" />
              <select
                aria-label="Filter berdasarkan toko"
                value={activeStore || ""}
                onChange={(e) => setActiveStore(e.target.value || null)}
              >
                <option value="">Semua Toko</option>
                {stores.map((store) => (
                  <option key={store.id} value={store.slug}>
                    {store.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="nav-filter-item">
              <Tags size={15} className="nav-filter-icon" />
              <select
                aria-label="Filter berdasarkan brand"
                value={activeBrand || ""}
                onChange={(e) => setActiveBrand(e.target.value || null)}
              >
                <option value="">Semua Brand</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.slug}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="nav-filter-item">
              <select
                aria-label="Urutkan produk"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button className="cart-container" onClick={() => setIsCartOpen((v) => !v)} aria-label="Buka keranjang">
          <svg className="desoria-cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM17 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12M20 7H6.21l-1.1-2.34A1 1 0 0 0 4.22 4H2v2h1.36l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.06L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 20 7z" />
          </svg>
          <span className="cart-badge-count">{totalItems}</span>
        </button>
      </div>

      <div className={`mobile-filter-panel ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-filter-section">
          <span className="mobile-filter-label">Toko</span>
          <select
            aria-label="Filter berdasarkan toko"
            value={activeStore || ""}
            onChange={(e) => setActiveStore(e.target.value || null)}
          >
            <option value="">Semua Toko</option>
            {stores.map((store) => (
              <option key={store.id} value={store.slug}>
                {store.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mobile-filter-section">
          <span className="mobile-filter-label">Brand</span>
          <select
            aria-label="Filter berdasarkan brand"
            value={activeBrand || ""}
            onChange={(e) => setActiveBrand(e.target.value || null)}
          >
            <option value="">Semua Brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.slug}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mobile-filter-section">
          <span className="mobile-filter-label">Urutkan</span>
          <select
            aria-label="Urutkan produk"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}