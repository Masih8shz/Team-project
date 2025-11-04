import { useState, useContext } from "react";
import products from "../../data/products.json";
import "../../Styles/shop.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

const Shop = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  
 
  const { addToCart } = useContext(CartContext);


  const filteredProducts = products.filter((item) => {
    const matchCategory = filter === "all" || item.category === filter;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="shop-page container py-5">


      <div className="filter-buttons d-flex gap-3 mb-4 align-items-center">

        <div className="search-box mb-0">
          <input
            type="search"
            className="form-control search-input"
            placeholder="Search item..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className={`btn-filter ${filter==="all"?"active":""}`} onClick={() => setFilter("all")}>
          <i className="bi bi-grid-3x3-gap"></i> All
        </button>
        <button className={`btn-filter ${filter==="rare"?"active":""}`} onClick={() => setFilter("rare")}>
          <i className="bi bi-gem"></i> Rare
        </button>
        <button className={`btn-filter ${filter==="arcana"?"active":""}`} onClick={() => setFilter("arcana")}>
          <i className="bi bi-stars"></i> Arcana
        </button>
        <button className={`btn-filter ${filter==="immortal"?"active":""}`} onClick={() => setFilter("immortal")}>
          <i className="bi bi-infinity"></i> Immortal
        </button>
      </div>

      
      <div className="row g-4">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="col-md-3 product-card"
            data-type={item.category}
          >
            <div className="item-box">
              <img src={item.image} alt={item.name} />
              <h6>{item.name}</h6>
              <p>${item.price}</p>

              <button
                className="btn btn-success w-100 mt-2"
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>

              <Link to="/cart" className="btn btn-primary w-100 mt-2">
                Go to Cart
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Shop;