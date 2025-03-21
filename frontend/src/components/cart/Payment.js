import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import { validateShipping } from "../cart/Shipping";
import { createOrder } from "../../actions/orderActions";
import { clearError as clearOrderError } from "../../slices/orderSlice";

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
        amount: Math.round(orderInfo.totalPrice * 100), // Convert to paisa
      });
  
      // Check if Razorpay is loaded before using
      if (!window.Razorpay) {
        throw new Error("Razorpay SDK not loaded. Please refresh the page.");
      }
  
      const options = {
        key: "rzp_test_zAVo9nLtxs6DjK", // Replace with your API key
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
        theme: { color: "#3399cc" },
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Complete Your Payment
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Amount to pay: ₹{orderInfo.totalPrice}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={submitHandler}>
          <div className="rounded-md shadow-sm -space-y-px">
            <button
              type="submit"
              id="pay_btn"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Pay Now - ₹{orderInfo.totalPrice}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
