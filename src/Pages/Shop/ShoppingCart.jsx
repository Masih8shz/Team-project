import { useCart } from "../../context/CartContext"
import { Link } from "react-router-dom";
import "../../Styles/cart.css";

const ShoppingCart = () => {
  const { cart, removeFromCart, clearCart } = useCart();


const totalPrice = cart?.reduce((sum, item) => sum + item.price, 0) || 0;

  if (!cart?.length) {                      
    return (
      <div className="cart-container empty-cart">
        <h2>Your cart is empty 🛒</h2>
        <Link to="/shop" className="btn-go-shop">Go to Shop</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>

      <div className="cart-items">
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} className="cart-img" />

            <div className="cart-info">
              <h4>{item.name}</h4>
              <p>${item.price}</p>
            </div>

            <button className="btn-remove" onClick={() => removeFromCart(item.id)}>
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <h3>Total: <span>${totalPrice}</span></h3>
        <div className="cart-actions">
          <button className="btn-clear" onClick={clearCart}>Clear Cart</button>
          <button className="btn-pay">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;