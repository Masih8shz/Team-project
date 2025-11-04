import { useState } from "react";
import ItemCard from "../../Components/ItemCard/ItemCard";
import "../../Styles/Items.css";
import itemsData from "../../data/items.json";
import BackgroundEffect from './../../Components/BackGroundEffect';

const Items = ({ isDark }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const filteredItems = itemsData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className={`d2-items-section ${isDark ? "dark-mode" : ""}`}>
      <div className="d2-items-container">
        <BackgroundEffect isDark={isDark}/>
        <h2 className="d2-items-title">Dota 2 Items</h2>

        <input
          type="text"
          placeholder="Search items..."
          className="d2-search-bar"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <div className="d2-items-grid">
          {currentItems.map((item) => (
            <ItemCard key={item.id} item={item} />
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