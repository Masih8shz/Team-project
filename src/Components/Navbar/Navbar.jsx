import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../Styles/Navbar.css";

const Navbar = ({ isDark, setIsDark }) => {
  const underlineRef = useRef(null);
  const linksContainerRef = useRef(null);

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
        <Link
          to="/"
          className="Nav-Btn"
          onMouseEnter={moveUnderline}
          onMouseLeave={resetUnderline}
        >
          Home
        </Link>
        <button
          className="Nav-Btn"
          onMouseEnter={moveUnderline}
          onMouseLeave={resetUnderline}
        >
          Heroes
        </button>
        <Link
          to="/items"
          className="Nav-Btn"
          onMouseEnter={moveUnderline}
          onMouseLeave={resetUnderline}
        >
          Items
        </Link>
        
         <Link
          to="/shop"
          className="Nav-Btn"
          onMouseEnter={moveUnderline}
          onMouseLeave={resetUnderline}
          
        >
          
          shop
        </Link>
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
