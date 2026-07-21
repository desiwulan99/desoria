import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SidebarCart from "./components/SidebarCart";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import { fetchCategories, fetchStores, fetchBrands } from "./services/api";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const [activeStore, setActiveStore] = useState(null);
  const [activeBrand, setActiveBrand] = useState(null);
  const [stores, setStores] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err) => console.error("Gagal memuat kategori:", err));
  }, []);

  useEffect(() => {
    fetchStores()
      .then(setStores)
      .catch((err) => console.error("Gagal memuat toko:", err));
  }, []);

  useEffect(() => {
    fetchBrands()
      .then(setBrands)
      .catch((err) => console.error("Gagal memuat brand:", err));
  }, []);

  return (
    <CartProvider>
      <div className="app-container">
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
          stores={stores}
          activeStore={activeStore}
          setActiveStore={setActiveStore}
          brands={brands}
          activeBrand={activeBrand}
          setActiveBrand={setActiveBrand}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  searchTerm={searchTerm}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  categories={categories}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  activeStore={activeStore}
                  activeBrand={activeBrand}
                  stores={stores}
                  brands={brands}
                />
              }
            />
            <Route path="/product/:id" element={<DetailPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>

        <SidebarCart />
      </div>
    </CartProvider>
  );
}
