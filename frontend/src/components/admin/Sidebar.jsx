import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Star, ChevronDown, Plus } from 'lucide-react';
import { useState } from 'react';
import './Sidebar.css';

export default function Sidebar() {
    const navigate = useNavigate();
    const [isProductsOpen, setIsProductsOpen] = useState(false);

    return (
        <div className="sidebar-wrapper">
            <div className="sidebar-header">

            </div>

            <nav className="sidebar-nav">
                <Link to="/admin/dashboard" className="nav-item">
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </Link>

                <div className={`nav-item-dropdown ${isProductsOpen ? 'open' : ''}`}>
                    <button
                        className="nav-item"
                        onClick={() => setIsProductsOpen(!isProductsOpen)}
                    >
                        <Package size={20} />
                        <span>Products</span>
                        <ChevronDown size={16} className="dropdown-icon" />
                    </button>
                    <div className="dropdown-content">
                        <button onClick={() => navigate('/admin/products')} className="dropdown-item">
                            <Package size={18} />
                            <span>All Products</span>
                        </button>
                        <button onClick={() => navigate('/admin/products/create')} className="dropdown-item">
                            <Plus size={18} />
                            <span>Create New</span>
                        </button>
                    </div>
                </div>

                <Link to="/admin/orders" className="nav-item">
                    <ShoppingCart size={20} />
                    <span>Orders</span>
                </Link>

                <Link to="/admin/users" className="nav-item">
                    <Users size={20} />
                    <span>Users</span>
                </Link>

                <Link to="/admin/reviews" className="nav-item">
                    <Star size={20} />
                    <span>Reviews</span>
                </Link>
            </nav>
        </div>
    );
}