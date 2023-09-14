import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Store } from "../context/Store.jsx";
import { SAVE_PAYMENT_METHOD } from '../Reduser/Actions';
import CheckoutSteps from '../components/CheckoutSteps/CheckoutSteps';
import { Form } from 'react-bootstrap';


export default function PaymentPage(){
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { shippingAddress, paymentMethod } } = state;
    const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || "");

    async function submitHandler(e){
        e.preventDefault();
        ctxDispatch({
            type: SAVE_PAYMENT_METHOD,
            payload: paymentMethodName
        });
        localStorage.setItem('paymentMethod', paymentMethodName);
        navigate("/placeorder");
    }

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate("/shipping");
        }
    }, [navigate, shippingAddress])


    return (
        <>
            <CheckoutSteps step1 step2 step3 />
            <div>
                <h1 className="my-3">Shipping Address</h1>
                <Form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <Form.Check type="radio" id="Paypal" label="Paypal" value="Paypal"
                            checked={paymentMethodName === "Paypal"}
                            onChange={(e) => setPaymentMethodName(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <Form.Check type="radio" id="MasterCard" label="MasterCard" value="MasterCard"
                            checked={paymentMethodName === "MasterCard"}
                            onChange={(e) => setPaymentMethodName(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <Form.Check type="radio" id="Visa" label="Visa" value="Visa"
                            checked={paymentMethodName === "Visa"}
                            onChange={(e) => setPaymentMethodName(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Continue</button>
                    </div>
                </Form>
            </div>
        </>
    );
}
