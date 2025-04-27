import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearAuthError } from '../../actions/userActions';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Upload } from 'lucide-react';
import './Register.css';

export default function Register() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector(state => state.authState);

    const onChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0])
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } else {
            setUserData({ ...userData, [e.target.name]: e.target.value })
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', userData.name)
        formData.append('email', userData.email)
        formData.append('password', userData.password)
        formData.append('avatar', avatar);
        dispatch(register(formData))
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
            return
        }
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) }
            })
            return
        }
    }, [error, isAuthenticated, dispatch, navigate])

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <div className="auth-header">
                    <h1>Create Account</h1>
                    <p>Join our community today</p>
                </div>

                <form onSubmit={submitHandler} className="auth-form" encType='multipart/form-data'>
                    <div className="input-group">
                        <div className="input-icon">
                            <User size={20} />
                        </div>
                        <input
                            type="text"
                            id="name_field"
                            name="name"
                            placeholder="Full Name"
                            onChange={onChange}
                            className="auth-input"
                        />
                    </div>

                    <div className="input-group">
                        <div className="input-icon">
                            <Mail size={20} />
                        </div>
                        <input
                            type="email"
                            id="email_field"
                            name="email"
                            placeholder="Email Address"
                            onChange={onChange}
                            className="auth-input"
                        />
                    </div>

                    <div className="input-group">
                        <div className="input-icon">
                            <Lock size={20} />
                        </div>
                        <input
                            type="password"
                            id="password_field"
                            name="password"
                            placeholder="Password"
                            onChange={onChange}
                            className="auth-input"
                        />
                    </div>

                    <div className="profile-upload">
                        <div className="profile-preview">
                            <img
                                src={avatarPreview}
                                alt="Profile Preview"
                            />
                        </div>
                        <div className="upload-section">
                            <label htmlFor="customFile" className="upload-btn">
                                <Upload size={20} />
                                Choose Profile Picture
                            </label>
                            <input
                                type="file"
                                name="avatar"
                                onChange={onChange}
                                id="customFile"
                                accept="image/*"
                                className="file-input"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>

                    <div className="auth-link">
                        Already have an account?
                        <Link to="/login">Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}