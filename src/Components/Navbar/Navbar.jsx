import "../../Styles/Navbar.css";

import logoWeb from "../../Images/LogoWeb.png";
const Navbar = () => {
  return (
    <>
      <div className="ContainerN">
        <img src={logoWeb} alt="Logo" className="LogoWebN"/>
        <div>
          <button className="BTN-links">Home</button>
          <button className="BTN-links">Heroes</button>
          <button className="BTN-links">Items</button>
          <button className="BTN-links">Shop</button>
          <button className="BTN-links">Tournaments</button>
          <button className="BTN-links">Stats</button>
          <button className="BTN-links">About</button>
        </div>
      </div>
    </>
  );
};
export default Navbar;
