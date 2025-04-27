import { useDispatch, useSelector } from "react-redux";
import { Fragment, useState } from "react";
import { countries } from 'countries-list';
import { saveShippingInfo } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutStep";
import { toast } from "react-toastify";
import { MapPin, Phone, Building2, Mail, Globe, MapIcon } from 'lucide-react';
import './Shipping.css';
import { CiMail } from "react-icons/ci";

export const validateShipping = (shippingInfo, navigate) => {
    if (
        !shippingInfo.address ||
        !shippingInfo.city ||
        !shippingInfo.state ||
        !shippingInfo.country ||
        !shippingInfo.phoneNo ||
        !shippingInfo.postalCode
    ) {
        toast.error('Please fill the shipping information', {
            position: toast.POSITION.BOTTOM_CENTER
        });
        navigate('/shipping');
    }
}

export default function Shipping() {
    const { shippingInfo = {} } = useSelector(state => state.cartState);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
    const [country, setCountry] = useState(shippingInfo.country);
    const [state, setState] = useState(shippingInfo.state);
    const countryList = Object.values(countries);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country, state }));
        navigate('/order/confirm');
    }

    return (
        <Fragment>
            <div className="shipping-page">
                <CheckoutSteps shipping />

                <div className="shipping-container">
                    <div className="shipping-card">
                        <div className="shipping-header">
                            <MapPin size={24} />
                            <h1>Shipping Information</h1>
                        </div>

                        <form onSubmit={submitHandler} className="shipping-form">
                            <div className="form-group">
                                <div className="input-icon">
                                    <Mail size={20} />

                                </div>
                                <div className="input-container">

                                    <label htmlFor="address_field">Street Address</label>
                                    <input
                                        type="text"
                                        id="address_field"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Enter your street address"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <div className="input-icon">
                                        <MapIcon size={20} />
                                    </div>
                                    <div className="input-container">
                                        <label htmlFor="city_field">City</label>
                                        <input
                                            type="text"
                                            id="city_field"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            placeholder="Enter your city"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="input-icon">
                                        <Mail size={20} />
                                    </div>
                                    <div className="input-container">
                                        <label htmlFor="postal_code_field">Postal Code</label>
                                        <input
                                            type="text"
                                            id="postal_code_field"
                                            value={postalCode}
                                            onChange={(e) => setPostalCode(e.target.value)}
                                            placeholder="Enter postal code"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-icon">
                                    <Phone size={20} />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="phone_field">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone_field"
                                        value={phoneNo}
                                        onChange={(e) => setPhoneNo(e.target.value)}
                                        placeholder="Enter your phone number"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <div className="input-icon">
                                        <Globe size={20} />
                                    </div>
                                    <div className="input-container">
                                        <label htmlFor="country_field">Country</label>
                                        <select
                                            id="country_field"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            required
                                        >
                                            <option value="">Select Country</option>
                                            {countryList.map((country, i) => (
                                                <option key={i} value={country.name}>
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="input-icon">
                                        <MapPin size={20} />
                                    </div>
                                    <div className="input-container">
                                        <label htmlFor="state_field">State</label>
                                        <input
                                            type="text"
                                            id="state_field"
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                            placeholder="Enter your state"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="submit-button">
                                Continue to Payment
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}