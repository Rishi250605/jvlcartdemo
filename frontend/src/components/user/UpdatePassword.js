import React, { useEffect, useState } from 'react';
import { updatePassword as updatePasswordAction, clearAuthError } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Lock, Key, Eye, EyeOff } from 'lucide-react';
import './UpdatePassword.css';

export default function UpdatePassword() {
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    
    const dispatch = useDispatch();
    const { isUpdated, error } = useSelector(state => state.authState);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('oldPassword', oldPassword);
        formData.append('password', password);
        dispatch(updatePasswordAction(formData));
    }

    useEffect(() => {
        if(isUpdated) {
            toast('Password updated successfully', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER
            });
            setOldPassword("");
            setPassword("");
            return;
        }
        if(error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) }
            });
            return;
        }
    }, [isUpdated, error, dispatch]);

    return (
        <div className="update-password-container">
            <div className="update-password-card">
                <div className="card-header">
                    <Lock size={28} className="header-icon" />
                    <h1>Update Password</h1>
                    <p>Enter your current password and choose a new one</p>
                </div>

                <form onSubmit={submitHandler} className="password-form">
                    <div className="form-group">
                        <label htmlFor="old_password_field">
                            <Key size={18} />
                            Current Password
                        </label>
                        <div className="password-input-wrapper">
                            <input
                                type={showOldPassword ? "text" : "password"}
                                id="old_password_field"
                                placeholder="Enter your current password"
                                value={oldPassword}
                                onChange={e => setOldPassword(e.target.value)}
                            />
                            <button 
                                type="button" 
                                className="toggle-password"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                                aria-label="Toggle password visibility"
                            >
                                {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="new_password_field">
                            <Lock size={18} />
                            New Password
                        </label>
                        <div className="password-input-wrapper">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                id="new_password_field"
                                placeholder="Enter your new password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <button 
                                type="button" 
                                className="toggle-password"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                aria-label="Toggle password visibility"
                            >
                                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="update-password-btn"
                        disabled={!oldPassword || !password}
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
}