import { useRef, useState, useEffect } from "react";
import "../../Styles/Navbar.css";

const Navbar = ({ isDark, setIsDark }) => {
  const underlineRef = useRef(null);
  const linksContainerRef = useRef(null);
  // const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.body.classList.add("transition-mode");
    if (isDark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    const timeout = setTimeout(() => {
      document.body.classList.remove("transition-mode");
    }, 700);

    return () => clearTimeout(timeout);
  }, [isDark]);

  useEffect(() => {
    const navbar = document.querySelector(".ContainerN");
    navbar.classList.add("slide-down");
  }, []);

  const moveUnderline = (e) => {
    const el = e.target;
    const parentRect = linksContainerRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    underlineRef.current.style.width = `${elRect.width}px`;
    underlineRef.current.style.left = `${elRect.left - parentRect.left}px`;
  };

  const resetUnderline = () => {
    underlineRef.current.style.width = "0";
  };

  return (
    <div className="ContainerN">
      <div className="theme-toggle">
        <button onClick={() => setIsDark(!isDark)}>
          {isDark ? "☀️" : "🌙"}
        </button>
      </div>

      <div className="logoWebN">
        <img src={"Screenshot 2025-10-26 180604.png"} alt="Logo" />
      </div>

      <div className="navbar-links" ref={linksContainerRef}>
        <button
          className="Nav-Btn"
          onMouseEnter={moveUnderline}
          onMouseLeave={resetUnderline}
        >
          Home
        </button>
        <button
          className="Nav-Btn"
          onMouseEnter={moveUnderline}
          onMouseLeave={resetUnderline}
        >
          Heroes
        </button>
        <button
          className="Nav-Btn"
          onMouseEnter={moveUnderline}
          onMouseLeave={resetUnderline}
        >
          Items
        </button>
        <button
          className="Nav-Btn"
          onMouseEnter={moveUnderline}
          onMouseLeave={resetUnderline}
        >
          Shop
        </button>
        <button
          className="Nav-Btn"
          onMouseEnter={moveUnderline}
          onMouseLeave={resetUnderline}
        >
          Tournaments
        </button>
        <button
          className="Nav-Btn"
          onMouseEnter={moveUnderline}
          onMouseLeave={resetUnderline}
        >
          Stats
        </button>
        <button
          className="Nav-Btn"
          onMouseEnter={moveUnderline}
          onMouseLeave={resetUnderline}
        >
          About
        </button>
        <div ref={underlineRef} className="underline" />
      </div>
    </div>
  );
};

export default Navbar;
