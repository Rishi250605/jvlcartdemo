import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword, clearAuthError } from "../../actions/userActions";
import { Mail, ArrowRight } from 'lucide-react';
import "./ForgotPassword.css";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const { error, message } = useSelector(state => state.authState);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        dispatch(forgotPassword(formData));
    }

    useEffect(() => {
        if (message) {
            toast(message, {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER
            });
            setEmail("");
            return;
        }

        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) }
            });
            return;
        }
    }, [message, error, dispatch]);

    return (
        <div className="forgot-password-wrapper">
            <div className="forgot-password-container">
                <div className="forgot-password-card">
                    <div className="card-header">
                        <Mail className="header-icons" />
                        <h1>Forgot Password</h1>
                        <p>Enter your email address to reset your password</p>
                    </div>

                    <form onSubmit={submitHandler} className="forgot-password-form">
                        <div className="form-group">
                            <label htmlFor="email_field">Email Address</label>
                            <div className="input-group">
                                <Mail className="input-icons" />
                                <input
                                    type="email"
                                    id="email_field"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="submit-button"
                        >
                            Send Reset Link
                            <ArrowRight className="button-icon" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}