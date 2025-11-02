import { useState } from "react";
import ItemCard from "../../Components/ItemCard/ItemCard";
import "../../Styles/ItemsPage.css";
import itemsData from "../../data/items.json";
import BackgroundEffect from "../../Components/BackGroundEffect";

const Items = ({ isDark }) => {
  const itemsPerPage = 30;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(itemsData.length / itemsPerPage);


  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentItems = itemsData.slice(startIndex, startIndex + itemsPerPage);

  console.log("itemsData:", itemsData);

  return (
    <section className={`d2-items-section ${isDark ? "dark-mode" : ""}`}>
      <BackgroundEffect isDark={isDark} />

      <div className="d2-items-container">
        <h2 className="d2-items-title">Dota 2 Items</h2>

        <div className="d2-items-grid">
          {currentItems.map((item, index) => (
            <ItemCard key={index} item={item} />
          ))}
        </div>

        <div className="d2-pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            « Prev
          </button>

          <span>
            Page {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next »
          </button>
        </div>
      </div>
    </section>
  );
};

export default Items;