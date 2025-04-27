import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { decreaseCartItemQty, increaseCartItemQty, removeItemFromCart } from '../../slices/cartSlice';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, CreditCard } from 'lucide-react';
import './Cart.css';

const Cart = () => {
  const { items } = useSelector(state => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseQty = (item) => {
    if (item.stock === 0 || item.quantity >= item.stock) return;
    dispatch(increaseCartItemQty({ product: item.product, size: item.size }));
  };

  const decreaseQty = (item) => {
    if (item.quantity === 1) return;
    dispatch(decreaseCartItemQty({ product: item.product, size: item.size }));
  };

  const handleRemoveItem = (productId, size) => {
    dispatch(removeItemFromCart(productId, size));
  };

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };

  const handleCheckout = () => {
    navigate('/login?redirect=shipping');
  };

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Your Shopping Cart</h1>
          <div className="cart-summary-count">
            <ShoppingCart size={20} />
            <span>{items.length} {items.length === 1 ? 'item' : 'items'}</span>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <ShoppingCart size={64} />
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any products to your cart yet.</p>
            <button className="continue-shopping-btn" onClick={handleContinueShopping}>
              <ArrowLeft size={18} />
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items-container">
              <div className="cart-items-header">
                <span className="header-product">Product</span>
                <span className="header-price">Price</span>
                <span className="header-quantity">Quantity</span>
                <span className="header-total">Total</span>
                <span className="header-actions"></span>
              </div>

              <div className="cart-items">
                {items.map(item => (
                  <div key={`${item.product}-${item.size}`} className="cart-item">
                    <div className="item-product">
                      <img src={item.image} alt={item.name} className="item-image" />
                      <div className="item-details">
                        <Link to={`/product/${item.product}`}>
                          <h3>{item.name}</h3>
                        </Link>
                        <p className="item-size">Size: {item.size}</p>
                      </div>
                    </div>

                    <div className="item-price">₹{item.price.toLocaleString()}</div>

                    <div className="quantity-controls">
                      <button
                        onClick={() => decreaseQty(item)}
                        className="quantity-btn"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(item)}
                        className="quantity-btn"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="item-total">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.product, item.size)}
                      className="remove-btn"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="cart-sidebar">
              <div className="order-summary">
                <h2>Order Summary</h2>

                <div className="summary-row">
                  <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} Units)</span>
                  <span>₹{calculateTotal().toLocaleString()}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <div className="summary-row">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>

                <div className="summary-total">
                  <span>Total</span>
                  <span>₹{calculateTotal().toLocaleString()}</span>
                </div>

                <div className="summary-actions">
                  <button
                    onClick={handleCheckout}
                    className="checkout-btn"
                    disabled={items.length === 0}
                  >
                    <CreditCard size={18} />
                    Proceed to Checkout
                  </button>

                  <button className="continue-shopping-btn" onClick={handleContinueShopping}>
                    <ArrowLeft size={18} />
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;