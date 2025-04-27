import MetaData from '../layouts/MetaData';
import { Fragment, useEffect } from 'react';
import { validateShipping } from './Shipping';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutStep';
import { MapPin, Phone, User, Box, CreditCard, Truck, Receipt } from 'lucide-react';
import './Confirming.css';

export default function ConfirmOrder() {
  const { shippingInfo, items: cartItems } = useSelector(state => state.cartState);
  const { user } = useSelector(state => state.authState);
  const navigate = useNavigate();
  const itemsPrice = cartItems.reduce((acc, item) => (acc + item.price * item.quantity), 0);
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  let taxPrice = Number(0.05 * itemsPrice);
  const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
  taxPrice = Number(taxPrice).toFixed(2);

  const processPayment = () => {
    const data = {
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    }
    sessionStorage.setItem('orderInfo', JSON.stringify(data))
    navigate('/payment')
  }

  useEffect(() => {
    validateShipping(shippingInfo, navigate)
  }, [])

  return (
    <Fragment>
      <MetaData title={'Confirm Order'} />
      <div className="orderConfirm_mainWrapper">
        <div className="orderConfirm_container">
          <CheckoutSteps shipping confirmOrder />

          <div className="orderConfirm_contentGrid">
            <div className="orderConfirm_leftPanel">
              <div className="orderConfirm_shippingBox">
                <h2 className="orderConfirm_sectionTitle">Shipping Information</h2>
                <div className="orderConfirm_infoGrid">
                  <div className="orderConfirm_infoItem">
                    <User className="orderConfirm_icon" />
                    <div className="orderConfirm_infoContent">
                      <h4 className="orderConfirm_infoLabel">Name</h4>
                      <p className="orderConfirm_infoText">{user.name}</p>
                    </div>
                  </div>
                  <div className="orderConfirm_infoItem">
                    <Phone className="orderConfirm_icon" />
                    <div className="orderConfirm_infoContent">
                      <h4 className="orderConfirm_infoLabel">Phone</h4>
                      <p className="orderConfirm_infoText">{shippingInfo.phoneNo}</p>
                    </div>
                  </div>

                  <div className="orderConfirm_infoItem">
                    <MapPin className="orderConfirm_icon" />
                    <div className="orderConfirm_infoContent">
                      <h4 className="orderConfirm_infoLabel"></h4>
                      <p className="mb-4"><b>Address:</b> {shippingInfo.address},{shippingInfo.addressline}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country} </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="orderConfirm_itemsBox">
                <h2 className="orderConfirm_sectionTitle">Order Items</h2>
                <div className="orderConfirm_itemsList">
                  {cartItems.map(item => (
                    <div key={item.product} className="orderConfirm_itemCard">
                      <div className="orderConfirm_itemImage">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="orderConfirm_itemDetails">
                        <Link to={`/product/${item.product}`} className="orderConfirm_itemName">
                          {item.name}
                        </Link>
                        <div className="orderConfirm_itemPricing">
                          <span className="orderConfirm_quantity">{item.quantity} x ${item.price}</span>
                          <span className="orderConfirm_itemTotal">${(item.quantity * item.price).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="orderConfirm_rightPanel">
              <div className="orderConfirm_summaryCard">
                <h2 className="orderConfirm_summaryTitle">Order Summary</h2>
                <div className="orderConfirm_summaryContent">
                  <div className="orderConfirm_summaryRow">
                    <Box className="orderConfirm_summaryIcon" />
                    <span className="orderConfirm_summaryLabel">Subtotal</span>
                    <span className="orderConfirm_summaryValue">${itemsPrice}</span>
                  </div>
                  <div className="orderConfirm_summaryRow">
                    <Truck className="orderConfirm_summaryIcon" />
                    <span className="orderConfirm_summaryLabel">Shipping</span>
                    <span className="orderConfirm_summaryValue">${shippingPrice}</span>
                  </div>
                  <div className="orderConfirm_summaryRow">
                    <Receipt className="orderConfirm_summaryIcon" />
                    <span className="orderConfirm_summaryLabel">Tax</span>
                    <span className="orderConfirm_summaryValue">${taxPrice}</span>
                  </div>
                  <div className="orderConfirm_totalRow">
                    <span className="orderConfirm_totalLabel">Total Amount</span>
                    <span className="orderConfirm_totalValue">${totalPrice}</span>
                  </div>
                </div>
                <button className="orderConfirm_paymentButton" onClick={processPayment}>
                  <CreditCard className="orderConfirm_buttonIcon" />
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}