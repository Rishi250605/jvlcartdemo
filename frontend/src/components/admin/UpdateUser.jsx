import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getUser, updateUser } from "../../actions/userActions";
import { clearError, clearUserUpdated } from "../../slices/userSlice";
import { toast } from "react-toastify";
import { UserCog, Mail, User, Shield } from 'lucide-react';
import "./UpdateUser.css";

export default function UpdateUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const { id: userId } = useParams();

    const { loading, isUserUpdated, error, user } = useSelector(state => state.userState);
    const { user: authUser } = useSelector(state => state.authState);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('role', role);
        dispatch(updateUser(userId, formData));
    }

    useEffect(() => {
        if (isUserUpdated) {
            toast('User Updated Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUserUpdated())
            });
            return;
        }

        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
            return;
        }

        dispatch(getUser(userId));
    }, [isUserUpdated, error, dispatch, userId]);

    useEffect(() => {
        if (user._id) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
    }, [user]);

    return (
        <div className="admin-layout">

            <Sidebar />

            <div className="content-container">
                <div className="page-header">
                    <div className="header-content">
                        <UserCog size={24} className="header-icon" />
                        <h1>Update User</h1>
                    </div>
                </div>

                <div className="update-user-card">
                    <form onSubmit={submitHandler} className="update-user-form">
                        <div className="form-group">
                            <label htmlFor="name_field">
                                <User size={18} />
                                Name
                            </label>
                            <input
                                type="text"
                                id="name_field"
                                placeholder="Enter user name"
                                onChange={e => setName(e.target.value)}
                                value={name}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">
                                <Mail size={18} />
                                Email
                            </label>
                            <input
                                type="email"
                                id="email_field"
                                placeholder="Enter email address"
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="role_field">
                                <Shield size={18} />
                                Role
                            </label>
                            <select
                                id="role_field"
                                value={role}
                                onChange={e => setRole(e.target.value)}
                                disabled={user._id === authUser._id}
                            >
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="update-button"
                        >
                            {loading ? 'Updating...' : 'Update User'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}