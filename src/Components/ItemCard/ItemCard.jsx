import { useState } from "react";
import "../../Styles/ItemCard.css";

const ItemCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  const shortText = item.text.length > 100 ? item.text.slice(0, 100) + "..." : item.text;

  return (
    <div className="d2-item-card" tabIndex={0}>
      <div className="d2-item-image">
        <img src={item.img} alt={item.name} />
      </div>

      <h5 className="d2-item-name">{item.name}</h5>

      <div className="d2-item-overlay">
        <div className="d2-overlay-content">
          <p>{expanded ? item.text : shortText}</p>

          {item.text.length > 100 && (
            <span
              className="d2-expand-arrow"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? ">" : "˅"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;