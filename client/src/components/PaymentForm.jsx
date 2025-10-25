import React, { useState } from 'react';

const PaymentForm = ({ totalPrice }) => {
    const [paymentMethod, setPaymentMethod] = useState('card');

    return (
        <div className="payment-information-container">
            <h2>Payment Information</h2>

            {/* Email Field */}
            <div className="form-group email-group">
                <label htmlFor="email">Email</label>
                <div className="input-with-icon">
                    <span className="icon">✉️</span>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="youremail@example.com" 
                    />
                </div>
            </div>

            {/* Payment Method Toggle */}
            <div className="payment-method-toggle">
                <button 
                    className={`toggle-button ${paymentMethod === 'card' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                >
                    <span className="icon">💳</span>
                    Card
                </button>
                <button 
                    className={`toggle-button ${paymentMethod === 'bank' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('bank')}
                >
                    <span className="icon">🏦</span>
                    Bank
                    <span className="price-tag">{totalPrice} US$</span>
                </button>
            </div>
            
            {/* Card Fields (Conditional render based on paymentMethod) */}
            {paymentMethod === 'card' && (
                <>
                    {/* Card Number */}
                    <div className="form-group card-number-group">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input 
                            type="text" 
                            id="cardNumber" 
                            placeholder="1234 1234 1234 1234" 
                        />
                        <div className="card-icons">
                            {/* Reemplaza con tus imágenes o iconos SVG reales */}
                            <img src="/visa.png" alt="Visa"/>
                            <img src="/mastercard.jpg" alt="Mastercard"/>
                            <img src="/amex.png" alt="Amex"/>
                        </div>
                    </div>

                    {/* Expiration Date and Security Code */}
                    <div className="row-group">
                        <div className="form-group half-width">
                            <label htmlFor="expirationDate">Expiration Date</label>
                            <input 
                                type="text" 
                                id="expirationDate" 
                                placeholder="MM / YY" 
                            />
                        </div>
                        <div className="form-group half-width">
                            <label htmlFor="securityCode">Security Code</label>
                            <div className="input-with-icon-right">
                                <input 
                                    type="text" 
                                    id="securityCode" 
                                    placeholder="CVC" 
                                />
                                <span className="icon-right">
                                    💳
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Country Field */}
            <div className="form-group">
                <label htmlFor="country">Country</label>
                <select id="country">
                    <option value="dominican-republic" selected>Dominican Republic</option>
                    <option value="usa">United States</option>
                    <option value="canada">Canada</option>
                    {/* Add more contries */}
                </select>
            </div>

            {/* Pay Button */}
            <button className="pay-button">Pay ${totalPrice}</button>

            {/* Security Info */}
            <div className="security-info">
                <span className="lock-icon">🔒</span>
                Payment secured by Emil IXs<a href="https://stripe.com" target="_blank" rel="noopener noreferrer">Stripe</a>
            </div>
        </div>
    );
};

export default PaymentForm;