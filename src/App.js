import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import { useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(false);
  return (
    <div>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <Home isDark={isDark} />
    </div>
  );
}

export default App;
