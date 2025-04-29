import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getAdminProducts } from "../../actions/productActions";
import { getUsers } from '../../actions/userActions';
import { adminOrders as adminOrdersAction } from '../../actions/orderActions';
import Sidebar from "./Sidebar";
import { ShoppingBag, Users, Package, AlertCircle, IndianRupee, ChevronRight } from 'lucide-react';
import "./Dashboard.css";

export default function Dashboard() {
    const { products = [] } = useSelector(state => state.productsState);
    const { adminOrders = [] } = useSelector(state => state.orderState);
    const { users = [] } = useSelector(state => state.userState);
    const dispatch = useDispatch();

    let outOfStock = 0;
    let totalAmount = 0;

    if (products.length > 0) {
        products.forEach(product => {
            if (product.stock === 0) {
                outOfStock = outOfStock + 1;
            }
        });
    }

    if (adminOrders.length > 0) {
        adminOrders.forEach(order => {
            totalAmount += order.totalPrice;
        });
    }

    useEffect(() => {
        dispatch(getAdminProducts);
        dispatch(getUsers);
        dispatch(adminOrdersAction);
    }, [dispatch]);

    return (
        <div className="dashboard-layout">
            <div className="dashboard-sidebar">
                <Sidebar />
            </div>

            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Dashboard Overview</h1>
                    <p className="header-subtitle">Welcome to your admin dashboard</p>
                </div>

                <div className="revenue-card">
                    <div className="revenue-icon">
                        <IndianRupee size={24} />
                    </div>
                    <div className="revenue-details">
                        <h3>Total Revenue</h3>
                        <p className="revenue-amount">Rs.{totalAmount.toLocaleString()}</p>
                        <span className="revenue-period">All time earnings</span>
                    </div>
                </div>

                <div className="stats-grid">
                    <Link to="/admin/products" className="stat-card products">
                        <div className="stat-icon">
                            <ShoppingBag size={24} />
                        </div>
                        <div className="stat-details">
                            <h3>Products</h3>
                            <p className="stat-value">{products.length}</p>
                            <span className="stat-label">Total products</span>
                        </div>
                        <div className="stat-action">
                            <span>View Details</span>
                            <ChevronRight size={20} />
                        </div>
                    </Link>

                    <Link to="/admin/orders" className="stat-card orders">
                        <div className="stat-icon">
                            <Package size={24} />
                        </div>
                        <div className="stat-details">
                            <h3>Orders</h3>
                            <p className="stat-value">{adminOrders.length}</p>
                            <span className="stat-label">Total orders</span>
                        </div>
                        <div className="stat-action">
                            <span>View Details</span>
                            <ChevronRight size={20} />
                        </div>
                    </Link>

                    <Link to="/admin/users" className="stat-card users">
                        <div className="stat-icon">
                            <Users size={24} />
                        </div>
                        <div className="stat-details">
                            <h3>Users</h3>
                            <p className="stat-value">{users.length}</p>
                            <span className="stat-label">Total users</span>
                        </div>
                        <div className="stat-action">
                            <span>View Details</span>
                            <ChevronRight size={20} />
                        </div>
                    </Link>

                    <div className="stat-card out-of-stock">
                        <div className="stat-icon">
                            <AlertCircle size={24} />
                        </div>
                        <div className="stat-details">
                            <h3>Out of Stock</h3>
                            <p className="stat-value">{outOfStock}</p>
                            <span className="stat-label">Products out of stock</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}