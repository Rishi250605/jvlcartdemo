import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package } from 'lucide-react';
import './OrderSuccess.css';

export default function OrderSuccess() {
    return (
        <div className="order-success-container">
            <div className="order-success-card">
                <div className="success-icon">
                    <CheckCircle size={48} />
                </div>
                
                <h1>Order Placed Successfully!</h1>
                <p>Thank you for your purchase. Your order has been confirmed and will be shipped soon.</p>
                
                <div className="order-details">
                    <div className="detail-item">
                        <span className="label">Order Status</span>
                        <span className="value success">Confirmed</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Estimated Delivery</span>
                        <span className="value">3-5 Business Days</span>
                    </div>
                </div>

                <div className="action-buttons">
                    <Link to="/orders" className="view-orders-btn">
                        <Package size={20} />
                        View My Orders
                    </Link>
                    <Link to="/shop" className="continue-shopping-btn">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}