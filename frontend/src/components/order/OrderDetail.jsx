import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { orderDetail as orderDetailAction } from '../../actions/orderActions';
import Loader from '../layouts/Loader';
import MetaData from '../layouts/MetaData';
import { Package, MapPin, Phone, User, CreditCard, Truck, ShoppingBag } from 'lucide-react';
import './OrderDetail.css';

export default function OrderDetail() {
    const { orderDetail, loading } = useSelector(state => state.orderState);
    const { shippingInfo = {}, user = {}, orderStatus = "Processing", orderItems = [], totalPrice = 0, paymentInfo = {} } = orderDetail;
    const isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true : false;
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(orderDetailAction(id));
    }, [id, dispatch]);

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={`Order #${orderDetail._id}`} />
                    <div className="order-detail-page">
                        <div className="order-detail-header">
                            <div className="order-title">
                                <Package size={24} />
                                <h1>Order #{orderDetail._id}</h1>
                            </div>
                            <div className={`order-status ${orderStatus && orderStatus.toLowerCase().replace(' ', '-')}`}>
                                {orderStatus}
                            </div>
                        </div>

                        <div className="order-detail-grid">
                            <div className="order-info-card shipping-info">
                                <h2>Shipping Information</h2>
                                <div className="info-list">
                                    <div className="info-item">
                                        <User size={20} />
                                        <div>
                                            <span className="label">Name</span>
                                            <span className="value">{user.name}</span>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <Phone size={20} />
                                        <div>
                                            <span className="label">Phone</span>
                                            <span className="value">{shippingInfo.phoneNo}</span>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <MapPin size={20} />
                                        <div>
                                            <span className="label">Address</span>
                                            <span className="value">
                                                {shippingInfo.address}, {shippingInfo.line}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="order-info-card payment-info">
                                <h2>Payment Information</h2>
                                <div className="info-list">
                                    <div className="info-item">
                                        <CreditCard size={20} />
                                        <div>
                                            <span className="label">Payment Status</span>
                                            <span className={`value ${isPaid ? 'paid' : 'unpaid'}`}>
                                                {isPaid ? 'PAID' : 'NOT PAID'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <ShoppingBag size={20} />
                                        <div>
                                            <span className="label">Total Amount</span>
                                            <span className="value price">${totalPrice}</span>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <Truck size={20} />
                                        <div>
                                            <span className="label">Delivery Status</span>
                                            <span className={`value ${orderStatus && orderStatus.toLowerCase().replace(' ', '-')}`}>
                                                {orderStatus}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="order-info-card order-items">
                                <h2>Order Items</h2>
                                <div className="items-list">
                                    {orderItems && orderItems.map(item => (
                                        <div key={item.product} className="order-item">
                                            <div className="item-image">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <div className="item-details">
                                                <Link to={`/product/${item.product}`} className="item-name">
                                                    {item.name}
                                                </Link>
                                                <div className="item-meta">
                                                    <span className="item-price">${item.price}</span>
                                                    <span className="item-quantity">{item.quantity} Piece(s)</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}