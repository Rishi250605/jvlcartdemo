import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, login } from '../../actions/userActions';
import MetaData from '../layouts/MetaData';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CiMail } from "react-icons/ci";

import './Login.css';

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { loading, error, isAuthenticated } = useSelector(state => state.authState)
    const redirect = location.search ? '/' + location.search.split('=')[1] : '/';

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirect)
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
        <Fragment>
            <MetaData title="Login" />
            <div className="login-container">
                <div className="login-box">
                    <div className="login-header">
                        <h1>Welcome Back</h1>
                        <p>Please sign in to continue</p>
                    </div>
                    <form onSubmit={submitHandler} className="login-form">
                        <div className="form-group">
                            <div className="input-wrapper">



                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="input-with-icon"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}

                                />

                            </div>

                        </div>

                        <div className="form-group">
                            <div className="input-wrapper">

                                <input
                                    type="password"
                                    id="password_field"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="input-with-icon"
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <label className="remember-me">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <Link to="/password/forgot" className="forgot-password">
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            id="login_button"
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>

                        <div className="register-link">
                            Don't have an account?
                            <Link to="/register">Sign Up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}