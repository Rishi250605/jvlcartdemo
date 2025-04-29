import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { orderDetail as orderDetailAction, updateOrder } from "../../actions/orderActions";
import { toast } from "react-toastify";
import { clearOrderUpdated, clearError } from "../../slices/orderSlice";
import { Link } from "react-router-dom";
import { Package, Truck, Check, User, Phone, MapPin, DollarSign } from 'lucide-react';
import './UpdateOrder.css';

export default function UpdateOrder() {
    const { loading, isOrderUpdated, error, orderDetail } = useSelector(state => state.orderState)
    const { user = {}, orderItems = [], shippingInfo = {}, totalPrice = 0, paymentInfo = {}} = orderDetail;
    const isPaid = paymentInfo.status === 'Success' ? true : false;
    const [orderStatus, setOrderStatus] = useState("Processing");
    const { id:orderId } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        const orderData = {};
        orderData.orderStatus = orderStatus;
        dispatch(updateOrder(orderId, orderData))
    }
    
    useEffect(() => {
        if(isOrderUpdated) {
            toast('Order Updated Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearOrderUpdated())
            })
            return;
        }

        if(error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }

        dispatch(orderDetailAction(orderId))
    }, [isOrderUpdated, error, dispatch])

    useEffect(() => {
        if(orderDetail._id) {
            setOrderStatus(orderDetail.orderStatus);
        }
    },[orderDetail])

    const getStatusIcon = (status) => {
        switch(status) {
            case 'Processing': return <Package className="status-icon processing" />;
            case 'Shipped': return <Truck className="status-icon shipped" />;
            case 'Delivered': return <Check className="status-icon delivered" />;
            default: return <Package className="status-icon" />;
        }
    };

    return (
        <div className="update-order-container">
            <div className="sidebar-container">
                <Sidebar/>
            </div>
            <div className="order-content">
                <div className="order-details-container">
                    <div className="order-info-section">
                        <h1>Order #{orderDetail._id}</h1>
                        
                        <div className="info-card shipping-info">
                            <h4>Shipping Information</h4>
                            <div className="info-item">
                                <User size={18} />
                                <p><b>Name:</b> {user.name}</p>
                            </div>
                            <div className="info-item">
                                <Phone size={18} />
                                <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                            </div>
                            <p className="mb-4"><b>Address:</b>{shippingInfo.address},{shippingInfo.addressline}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country}</p>
                            <div className="info-item">
                                <MapPin size={18} />
                                <p><b>Address:</b> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country}</p>
                            </div>
                            <div className="info-item">
                                <DollarSign size={18} />
                                <p><b>Amount:</b> ${totalPrice}</p>
                            </div>
                        </div>

                        <div className="info-card payment-info">
                            <h4>Payment Status</h4>
                            <div className={`payment-status ${isPaid ? 'paid' : 'unpaid'}`}>
                                {isPaid ? 'PAID' : 'NOT PAID'}
                            </div>
                        </div>

                        <div className="info-card order-status">
                            <h4>Current Status</h4>
                            <div className={`status-badge ${orderStatus.toLowerCase()}`}>
                                {getStatusIcon(orderStatus)}
                                <span>{orderStatus}</span>
                            </div>
                        </div>

                        <div className="info-card order-items">
                            <h4>Order Items</h4>
                            {orderItems && orderItems.map(item => (
                                <div className="order-item" key={item.product}>
                                    <div className="item-image">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="item-details">
                                        <Link to={`/product/${item.product}`} className="item-name">
                                            {item.name}
                                        </Link>
                                        <div className="item-info">
                                            <span className="item-price">${item.price}</span>
                                            <span className="item-quantity">{item.quantity} Piece(s)</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="update-status-section">
                        <div className="status-update-card">
                            <h4>Update Order Status</h4>
                            <select 
                                className="status-select"
                                onChange={e => setOrderStatus(e.target.value)}
                                value={orderStatus}
                                name="status"
                            >
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                            <button
                                disabled={loading}
                                onClick={submitHandler}
                                className="update-button"
                            >
                                {loading ? 'Updating...' : 'Update Status'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}