export default function ProductCard({ item }) {
  return (
    <div className="product-card text-center p-3">
      <img src={item.image} className="img-fluid mb-2" alt={item.name} />
      <h5>{item.name}</h5>
      <p className="text-warning fw-bold">{item.price} Gold</p>
      <button className="btn btn-outline-light btn-sm">Details</button>
    </div>
  );
}