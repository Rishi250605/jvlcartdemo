import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import { ShoppingCart, User, Package, LogOut, Settings, ClipboardList, Menu, X } from 'lucide-react';
import './Header.css';
import logo from './yaso.png';
export default function Header() {
    const { isAuthenticated, user } = useSelector(state => state.authState);
    const { items: cartItems } = useSelector(state => state.cartState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout);
    }

    const [scrolled, setScrolled] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/">
                        <img alt='JVLcart Logo' src={logo} />
                    </Link>
                </div>

                <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div className={`navbar-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <ul className="nav-links">
                        <li>
                            <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/shop" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                                Shop
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                                About Us
                            </Link>
                        </li>
                    </ul>

                    <div className="nav-actions">
                        <Link to="/cart" className="cart-link" onClick={() => setMobileMenuOpen(false)}>
                            <ShoppingCart size={22} />
                            {cartItems.length > 0 && (
                                <span className="cart-count">{cartItems.length}</span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <div className="user-dropdown" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                                <button className="user-trigger">
                                    <img
                                        src={user.avatar ?? './images/default_avatar.png'}
                                        alt={user.name}
                                        className="user-avatar"
                                    />
                                    <span className="user-name">{user.name}</span>
                                </button>

                                <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                                    {user.role === 'admin' && (
                                        <button onClick={() => {
                                            navigate('admin/dashboard');
                                            setMobileMenuOpen(false);
                                        }} className="dropdown-item">
                                            <Settings size={18} />
                                            Dashboard
                                        </button>
                                    )}
                                    <button onClick={() => {
                                        navigate('/myprofile');
                                        setMobileMenuOpen(false);
                                    }} className="dropdown-item">
                                        <User size={18} />
                                        Profile
                                    </button>
                                    <button onClick={() => {
                                        navigate('/orders');
                                        setMobileMenuOpen(false);
                                    }} className="dropdown-item">
                                        <ClipboardList size={18} />
                                        Orders
                                    </button>
                                    <button onClick={() => {
                                        logoutHandler();
                                        setMobileMenuOpen(false);
                                    }} className="dropdown-item logout">
                                        <LogOut size={18} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="login-btn" onClick={() => setMobileMenuOpen(false)}>
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}