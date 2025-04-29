import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProfile, clearAuthError } from "../../actions/userActions";
import { clearUpdateProfile } from "../../slices/authSlice";
import { User, Mail, Upload, Camera } from 'lucide-react';
import './UpdateProfile.css';

export default function UpdateProfile() {
    const { error, user, isUpdated } = useSelector(state => state.authState);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
    const dispatch = useDispatch();

    const onChangeAvatar = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(e.target.files[0]);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('avatar', avatar);
        dispatch(updateProfile(formData));
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            if (user.avatar) {
                setAvatarPreview(user.avatar);
            }
        }

        if (isUpdated) {
            toast('Profile updated successfully', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUpdateProfile())
            });
            return;
        }

        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearAuthError); }
            });
            return;
        }
    }, [user, isUpdated, error, dispatch]);

    return (
        <div className="update-profile-container">
            <div className="update-profile-card">
                <div className="card-header">
                    <User size={28} className="header-icons" />
                    <h1>Update Profile</h1>
                    <p>Update your personal information</p>
                </div>

                <form onSubmit={submitHandler} className="profile-form" encType='multipart/form-data'>
                    <div className="avatar-upload">
                        <div className="avatar-preview">
                            <img
                                src={avatarPreview}
                                alt="Avatar Preview"
                            />
                            <label htmlFor="avatar-input" className="avatar-edit">
                                <Camera size={18} />
                            </label>
                            <input
                                type="file"
                                id="avatar-input"
                                accept="image/*"
                                onChange={onChangeAvatar}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name_field">
                            <User size={18} />
                            Name
                        </label>
                        <input
                            type="text"
                            id="name_field"
                            placeholder="Enter your name"
                            value={name}
                            onChange={e => setName(e.target.value)}
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
                            placeholder="Enter your email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="update-profile-btn"
                        disabled={!name || !email}
                    >
                        <Upload size={18} />
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
}