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
          dir="rtl"
          to="/"
          className="Nav-Btn"
          onMouseEnter={moveUnderline}
          onMouseLeave={resetUnderline}
        >
          <svg
            dir="ltr"
            style={{ marginBottom: 2 }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-house"
            viewBox="0 0 16 16"
          >
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
          </svg>
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
          dir="rtl"
          to="/items"
          className="Nav-Btn"
          onMouseEnter={moveUnderline}
          onMouseLeave={resetUnderline}
        >
          <svg
            dir="ltr"
            style={{ marginBottom: 2 }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-diagram-3-fill"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5zm-6 8A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5zm6 0A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5zm6 0a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5z"
            />
          </svg>
          Items
        </Link>
<<<<<<< HEAD
        <Link
          dir="rtl"
=======
        
         <Link
>>>>>>> 3ec4130ebf79e6faff02fed742a16b9efeaec525
          to="/shop"
          className="Nav-Btn"
          onMouseEnter={moveUnderline}
          onMouseLeave={resetUnderline}
          
        >
<<<<<<< HEAD
          <svg
            dir="ltr"
            style={{ marginBottom: 2 }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-bag"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
          </svg>
=======
          
>>>>>>> 3ec4130ebf79e6faff02fed742a16b9efeaec525
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
