import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import SidebarCart from "./components/SidebarCart"; 
import { CartProvider } from "./context/CartContext";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetch("https://sistech-ecommerce-api.leficullen.xyz/api/categories")
      .then((res) => res.json())
      .then((result) => {
        if (result.data) setCategories(result.data);
      })
      .catch((err) => console.error("Error fetching categories:", err));
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
          toggleCart={() => setIsCartOpen(!isCartOpen)}
        />
        
        <div style={{ display: "flex", width: "100%", position: "relative", overflowX: "hidden" }}>
          <main className="main-content" style={{ flex: 1 }}>
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
                    selectedBrand={selectedBrand}
                    setSelectedBrand={setSelectedBrand}
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                  />
                } 
              />
              <Route path="/product/:id" element={<DetailPage />} />
            </Routes>
          </main>
          
          <SidebarCart isOpen={isCartOpen} />
        </div>
      </div>
    </CartProvider>
  );
}