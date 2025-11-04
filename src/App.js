import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Items from "./Pages/Items/Items";
import Shop from "./Pages/Shop/Shop";
import ShoppingCart from "./Pages/Shop/ShoppingCart";
import { CartProvider } from "./Context/CartContext";

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <CartProvider>
      
      <Router>
        <Navbar isDark={isDark} setIsDark={setIsDark} />

        <Routes>
          <Route path="/" element={<Home isDark={isDark} />} />
          <Route path="/items" element={<Items isDark={isDark} />} />
          <Route path="/shop" element={<Shop isDark={isDark} />} />
          <Route path="/cart" element={<ShoppingCart />} />
        </Routes>
      </Router>
     
    </CartProvider>
  );
}

export default App;