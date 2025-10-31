import "../../Styles/ItemCard.css";

const ItemCard = ({ item }) => {
  return (
    <div className="d2-item-card" tabIndex={0}>
      <div className="d2-item-image">
        <img src={item.img} alt={item.name} />
      </div>

      <h5 className="d2-item-name">{item.name}</h5>

      <div className="d2-item-overlay">
        <div className="d2-overlay-content">
          <h6>{item.name}</h6>
          <p>{item.text}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
