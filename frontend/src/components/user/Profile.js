import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { User, Mail, Calendar, Package, Key, Edit } from 'lucide-react';
import './Profile.css';

export default function Profile() {
    const { user } = useSelector(state => state.authState);

    return (
        <div className="profile-wrapper">
            <div className="profile-container">
                <h1 className="profile-title">My Profile</h1>
                
                <div className="profile-content">
                    <div className="profile-sidebar">
                        <div className="avatar-container">
                            <img 
                                src={user.avatar ?? './images/default_avatar.png'} 
                                alt="Profile" 
                                className="profile-avatar" 
                            />
                            <Link to="/myprofile/update" className="edit-avatar-btn">
                                <Edit className="btn-icon" />
                                Edit Profile
                            </Link>
                        </div>

                        <div className="profile-actions">
                            <Link to="/orders" className="action-btn orders-btn">
                                <Package className="btn-icon" />
                                My Orders
                            </Link>
                            <Link to="/myprofile/update/password" className="action-btn password-btn">
                                <Key className="btn-icon" />
                                Change Password
                            </Link>
                        </div>
                    </div>

                    <div className="profile-details">
                        <div className="info-card">
                            <div className="info-header">
                                <User className="info-icon" />
                                <h3>Personal Information</h3>
                            </div>
                            <div className="info-content">
                                <div className="info-item">
                                    <label>Full Name</label>
                                    <p>{user.name}</p>
                                </div>
                                <div className="info-item">
                                    <label>Email Address</label>
                                    <p>{user.email}</p>
                                </div>
                                <div className="info-item">
                                    <label>Member Since</label>
                                    <p>{String(user.createdAt).substring(0, 10)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="stats-grid">
                            <div className="stat-card">
                                <Mail className="stat-icon" />
                                <div className="stat-info">
                                    <span className="stat-label">Email Status</span>
                                    <span className="stat-value">Verified</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <Calendar className="stat-icon" />
                                <div className="stat-info">
                                    <span className="stat-label">Account Age</span>
                                    <span className="stat-value">
                                        {Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24))} days
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}