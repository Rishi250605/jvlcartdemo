import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteOrder, adminOrders as adminOrdersAction } from "../../actions/orderActions";
import { clearError, clearOrderDeleted } from "../../slices/orderSlice";
import Loader from '../layouts/Loader';
import { toast } from 'react-toastify';
import Sidebar from "./Sidebar";
import { Package, Pencil, Trash2, AlertCircle } from 'lucide-react';
import './OrderList.css';

export default function OrderList() {
    const { adminOrders = [], loading = true, error, isOrderDeleted } = useSelector(state => state.orderState);
    const dispatch = useDispatch();

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteOrder(id));
    };

    useEffect(() => {
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
            return;
        }
        if (isOrderDeleted) {
            toast('Order Deleted Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearOrderDeleted())
            });
            return;
        }

        dispatch(adminOrdersAction);
    }, [dispatch, error, isOrderDeleted]);

    return (
        <div className="admin-layout">

            <Sidebar />

            <div className="admin-contents">
                <div className="orders-container">
                    <div className="page-header">
                        <Package className="header-icons" />
                        <h1>Order Management</h1>
                    </div>

                    {loading ? <Loader /> : (
                        <div className="orders-table-container">
                            <div className="table-header">
                                <div className="header-cell">Order ID</div>
                                <div className="header-cell">Items</div>
                                <div className="header-cell">Amount</div>
                                <div className="header-cell">Status</div>
                                <div className="header-cell">Actions</div>
                            </div>

                            {adminOrders && adminOrders.length > 0 ? (
                                <div className="table-body">
                                    {adminOrders.map(order => (
                                        <div key={order._id} className="table-row">
                                            <div className="table-cell id-cell" data-label="Order ID">{order._id}</div>
                                            <div className="table-cell" data-label="Items">{order.orderItems.length}</div>
                                            <div className="table-cell amount-cell" data-label="Amount">${order.totalPrice}</div>
                                            <div className="table-cell" data-label="Status">
                                                <span className={`status-badge ${order.orderStatus.includes('Processing') ? 'processing' : 'delivered'}`}>
                                                    {order.orderStatus}
                                                </span>
                                            </div>
                                            <div className="table-cell actions-cell" data-label="Actions">
                                                <Link to={`/admin/order/${order._id}`} className="edit-btn">
                                                    <Pencil size={16} />
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={(e) => deleteHandler(e, order._id)}
                                                    className="delete-btn"
                                                >
                                                    <Trash2 size={16} />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-orders">
                                    <AlertCircle size={48} />
                                    <h3>No Orders Found</h3>
                                    <p>There are no orders to display at the moment.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}