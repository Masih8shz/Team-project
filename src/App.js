import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Items from "./Pages/Items/Items";
import Shop from "./Pages/Shop/Shop";
import ShoppingCart from "./Pages/Shop/ShoppingCart";
import { CartProvider } from "./Context/CartContext";
import AuthPage from "./Pages/Auth/AuthPage";

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <CartProvider>
      <Router>
        <HideNavbarWrapper isDark={isDark} setIsDark={setIsDark} />
      </Router>
    </CartProvider>
  );
}

const HideNavbarWrapper = ({ isDark, setIsDark }) => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/auth" && (
        <Navbar isDark={isDark} setIsDark={setIsDark} />
      )}

      <Routes>
        <Route path="/" element={<Home isDark={isDark} />} />
        <Route path="/items" element={<Items isDark={isDark} />} />
        <Route path="/shop" element={<Shop isDark={isDark} />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </>
  );
};

export default App;
