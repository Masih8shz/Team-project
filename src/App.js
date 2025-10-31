import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Items from "./Pages/Items/Items";

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <Router>
      <Navbar isDark={isDark} setIsDark={setIsDark} />

      <Routes>
        <Route path="/" element={<Home isDark={isDark} />} />
        <Route path="/items" element={<Items isDark={isDark} />} />
      </Routes>
    </Router>
  );
}

export default App;