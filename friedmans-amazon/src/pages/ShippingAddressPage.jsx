import React, { useState, useContext, useEffect } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { Store } from "../context/Store.jsx";
import { SAVE_SHIPPING_ADDRESS } from '../Reduser/Actions';
import CheckoutSteps from '../components/CheckoutSteps/CheckoutSteps';
import {Button} from 'react-bootstrap';

const ShippingAddressPage = () => {
    const nevigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo, cart: { shippingAddress } } = state;

    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({
            type: SAVE_SHIPPING_ADDRESS,
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country
            }
        });
        nevigate('/payment');
    };

    useEffect(() => {
        if (!userInfo) {
            nevigate(`/login?redirect=/shipping`);
        }
    }, [])

    return (
        <div>
            <h2>to change costom title Shipping Address</h2>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <div className='container small-container'></div>
            <h4>Shipping Address</h4>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="fullName" className='mb-3'>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="your name" required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="address" className='mb-3'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="your address" required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="city" className='mb-3'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="your city" required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="postalCode" className='mb-3'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="your postal code" required
                        value={postalCode} 
                        onChange={(e) => setPostalCode(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="country" className='mb-3'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="your country" required
                        value={country} 
                        onChange={(e) => setCountry(e.target.value)}/>
                </Form.Group>
                <div className='mb-3'>
                    <Button type="submit" className="btn btn-primary">
                        Save
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default ShippingAddressPage