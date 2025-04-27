import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userOrders as userOrdersAction } from '../../actions/orderActions';
import MetaData from '../layouts/MetaData';
import { Eye, Package, DollarSign, Truck } from 'lucide-react';
import './UserOrders.css';

export default function UserOrders() {
    const { userOrders = [] } = useSelector(state => state.orderState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userOrdersAction);
    }, [dispatch]);

    return (
        <Fragment>
            <MetaData title="My Orders" />
            <div className="orders-page">
                <div className="orders-header">
                    <h1>My Orders</h1>
                    <p>{userOrders.length} {userOrders.length === 1 ? 'Order' : 'Orders'}</p>
                </div>

                {userOrders.length === 0 ? (
                    <div className="no-orders">
                        <Package size={48} />
                        <h3>No Orders Found</h3>
                        <p>You haven't placed any orders yet.</p>
                        <Link to="/" className="shop-now-btn">Start Shopping</Link>
                    </div>
                ) : (
                    <div className="orders-container">
                        {userOrders.map(order => (
                            <div key={order._id} className="order-card">
                                <div className="order-header">
                                    <div className="order-id">
                                        <span className="label">Order ID:</span>
                                        <span className="value">{order._id}</span>
                                    </div>
                                    <div className={`order-status ${order.orderStatus.toLowerCase().replace(' ', '-')}`}>
                                        {order.orderStatus}
                                    </div>
                                </div>

                                <div className="order-info">
                                    <div className="info-item">
                                        <Package size={20} />
                                        <div className="info-content">
                                            <span className="label">Items</span>
                                            <span className="value">{order.orderItems.length}</span>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <DollarSign size={20} />
                                        <div className="info-content">
                                            <span className="label">Total Amount</span>
                                            <span className="value">${order.totalPrice}</span>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <Truck size={20} />
                                        <div className="info-content">
                                            <span className="label">Delivery Status</span>
                                            <span className="value">{order.orderStatus}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="order-actions">
                                    <Link to={`/order/${order._id}`} className="view-details-btn">
                                        <Eye size={18} />
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Fragment>
    );
}