import { useRef } from "react";
import "../../Styles/Navbar.css";
import logo from "../../Images/LogoWeb.png";

const Navbar = () => {
  const underlineRef = useRef(null);
  const linksContainerRef = useRef(null);

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
      <div className="logoWebN">
        <img src={logo} alt="Logo" />
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
