import { useState } from "react";
import products from "../../data/products.json";
import ProductCard from "../../Components/ProductCard/ProductCard";
import "../../Styles/shop.css"
const Shop = () => {
  const [filter, setFilter] = useState("all");

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((item) => item.category === filter);

  return (
    <div className="shop-page container py-5">

   
      <div className="filter-buttons d-flex gap-3 mb-4">
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
            className={`col-md-3 product-card ${
              filteredProducts.includes(item) ? "show" : "hide"
            }`}
            data-type={item.category}
          >
            <div className="item-box">
              <img src={item.image} alt={item.name} />
              <h6>{item.name}</h6>
              <p>${item.price}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Shop;