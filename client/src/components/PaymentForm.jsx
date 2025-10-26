import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContextProvider'

const PaymentForm = ({ totalPrice }) => {

    const [paymentMethod, setPaymentMethod] = useState('card');

    const navigate = useNavigate()
    const { setCart } = useShop()
    const [loading, setLoading] = useState(false)


    //form data 
    const [email, setEmail] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expDate, setExpDate] = useState('')
    const [secureCode, setSecureCode] = useState('')
    const [contry, setContry] = useState('')

    const [error, setError] = useState(null)



    const endPayment = () => {
        if (paymentMethod === 'card') {

            if (!email || !cardNumber || !expDate || !secureCode || !contry) {
                return setError('All field must be completed')
            }
        }

        if (!email) {
            return setError('Email must be completed')
        }

        setLoading(true)


        setTimeout(() => {
            setCart([])
            navigate('/')
            setLoading(false)
        }, 4000)

    }

 
    if (error) {
        const timer = setTimeout(() => setError(null), 3000);
    } 

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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    disabled={true}
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
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="1234 1234 1234 1234"
                        />
                        <div className="card-icons">
                            {/* Reemplaza con tus imágenes o iconos SVG reales */}
                            <img src="/visa.png" alt="Visa" />
                            <img src="/mastercard.jpg" alt="Mastercard" />
                            <img src="/amex.png" alt="Amex" />
                        </div>
                    </div>

                    {/* Expiration Date and Security Code */}
                    <div className="row-group">
                        <div className="form-group half-width">
                            <label htmlFor="expirationDate">Expiration Date</label>
                            <input
                                type="text"
                                id="expirationDate"
                                value={expDate}
                                onChange={(e) => setExpDate(e.target.value)}
                                placeholder="MM / YY"
                            />
                        </div>
                        <div className="form-group half-width">
                            <label htmlFor="securityCode">S ecurity Code</label>
                            <div className="input-with-icon-right">
                                <input
                                    type="text"
                                    id="securityCode"
                                    value={secureCode}
                                    onChange={(e) => setSecureCode(e.target.value)}
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
                <select id="country"
                    value={contry}
                    onChange={(e) => setContry(e.target.value)}
                >
                    <option value="dominican-republic">Dominican Republic</option>
                    <option value="usa">United States</option>
                    <option value="canada">Canada</option>
                    {/* Add more contries */}
                </select>
            </div>

            <div className='loaderContent'>
                {loading && <span class="loader"></span>}
            </div>

            {error && <div className='error'>{error}</div>}


            {/* Pay Button */}
            <button
                className="pay-button"
                onClick={() => endPayment()}
            >
                Pay ${totalPrice}
            </button>

            {/* Security Info */}
            <div className="security-info">
                Payment secured by <a href="/" target="_blank" rel="noopener noreferrer">Emil IXs</a>
            </div>
        </div >
    );
};

export default PaymentForm;