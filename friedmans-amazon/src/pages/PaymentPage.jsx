import React, { useState, useContext, useEffect } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { Store } from "../context/Store.jsx";
import { SAVE_PAYMENT_METHOD } from '../Reduser/Actions';
import CheckoutSteps from '../components/CheckoutSteps/CheckoutSteps';


const PaymentPage = () => {
    const nevigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo, cart: { shippingAddress, paymentMethod } } = state;
    const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || "");

    const submitHandler = async (e) => {
        e.preventDefault();  
        ctxDispatch({
            type: SAVE_PAYMENT_METHOD,
            payload: paymentMethodName });
        nevigate("/placeorder");
    }

    useEffect(() => {
        if(!shippingAddress.address) {
            nevigate("/shipping");
        }
        setPaymentMethodName(paymentMethod.name || "");//תןספת זמנית
    }, [paymentMethod])


  return (
    <>
    <div>Payment Page</div>
    <CheckoutSteps step1 step2 step3 />
    <div>
        <Form onSubmit={submitHandler}>
            <div className="mb-3">
                <Form.Check type="radio" id="Paypal" label="Paypal" value="Paypal" checked={paymentMethodName === "Paypal"} onChange={(e) => setPaymentMethodName(e.target.value)}/>
            </div>
                
            <div className="mb-3">
                <Form.Check type="radio" id="MasterCard" label="MasterCard" value="MasterCard" checked={paymentMethodName === "MasterCard"} onChange={(e) => setPaymentMethodName(e.target.value)}/>
                </div>
                
            <div className="mb-3">
            <Form.Check type="radio" id="Visa" label="Visa" value="Visa" checked={paymentMethodName === "Visa"} onChange={(e) => setPaymentMethodName(e.target.value)}/>
            </div>
                
            <div className="mb-3">
            <button type="submit" className="btn btn-primary">Continue</button></div>

        </Form>
    </div>
    
    </>
  )
}

export default PaymentPage