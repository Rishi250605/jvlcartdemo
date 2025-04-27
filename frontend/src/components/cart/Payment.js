import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import { validateShipping } from "../cart/Shipping";
import { createOrder } from "../../actions/orderActions";
import { clearError as clearOrderError } from "../../slices/orderSlice";
import { CreditCard, ShoppingBag } from 'lucide-react';
import './Payment.css';

export default function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { user } = useSelector((state) => state.authState);
  const { items: cartItems, shippingInfo } = useSelector(
    (state) => state.cartState
  );
  const { error: orderError } = useSelector((state) => state.orderState);

  const order = {
    orderItems: cartItems,
    shippingInfo,
    itemsPrice: orderInfo.itemsPrice,
    shippingPrice: orderInfo.shippingPrice,
    taxPrice: orderInfo.taxPrice,
    totalPrice: orderInfo.totalPrice,
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("Razorpay script loaded successfully");
    };
    script.onerror = () => {
      console.error("Failed to load Razorpay script");
    };
    document.body.appendChild(script);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true;
  
    try {
      const { data } = await axios.post("/api/v1/payment/process", {
        amount: Math.round(orderInfo.totalPrice),
      });
  
      if (!window.Razorpay) {
        throw new Error("Razorpay SDK not loaded. Please refresh the page.");
      }
  
      const options = {
        key: "rzp_test_zAVo9nLtxs6DjK",
        amount: data.amount,
        currency: "INR",
        name: "Your Company",
        description: "Order Payment",
        image: "/logo.png",
        order_id: data.id,
        handler: function (response) {
          toast("Payment Success!", {
            type: "success",
            position: toast.POSITION.BOTTOM_CENTER,
          });
  
          order.paymentInfo = {
            id: response.razorpay_payment_id,
            status: "Success",
          };
  
          dispatch(orderCompleted());
          dispatch(createOrder(order));
          navigate("/order/success");
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: shippingInfo.phoneNo,
        },
        theme: { color: "#f59e0b" },
      };
  
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Payment API Error:", error.message);
      toast("Payment Failed! " + error.message, { type: "error" });
      document.querySelector("#pay_btn").disabled = false;
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="payment-header">
          <CreditCard className="header-icon" size={32} />
          <h2>Complete Your Payment</h2>
          <p>Secure payment gateway</p>
        </div>

        <div className="order-summary">
          <div className="summary-header">
            <ShoppingBag size={20} />
            <h3>Order Summary</h3>
          </div>
          
          <div className="summary-details">
            <div className="summary-item">
              <span>Items Price:</span>
              <span>₹{orderInfo.itemsPrice}</span>
            </div>
            <div className="summary-item">
              <span>Shipping:</span>
              <span>₹{orderInfo.shippingPrice}</span>
            </div>
            <div className="summary-item">
              <span>Tax:</span>
              <span>₹{orderInfo.taxPrice}</span>
            </div>
            <div className="summary-item total">
              <span>Total Amount:</span>
              <span>₹{orderInfo.totalPrice}</span>
            </div>
          </div>
        </div>

        <form onSubmit={submitHandler} className="payment-form">
          <button
            type="submit"
            id="pay_btn"
            className="pay-button"
          >
            Pay Now - ₹{orderInfo.totalPrice}
          </button>
        </form>

        <div className="payment-footer">
          <p>By clicking "Pay Now", you agree to our terms and conditions</p>
        </div>
      </div>
    </div>
  );
}