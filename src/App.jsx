import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SidebarCart from "./components/SidebarCart";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import { fetchCategories } from "./services/api";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState("");

  // Kategori hanya diambil sekali di sini, lalu dibagikan lewat props
  // ke Navbar & HomePage -- tidak ada fetch dobel.
  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err) => console.error("Gagal memuat kategori:", err));
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
