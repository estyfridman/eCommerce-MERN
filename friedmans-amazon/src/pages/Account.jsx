import React, { useContext } from "react";
import {Store} from "../context/Store.jsx";


export default function Account() {

    const { state, dispatch: ctxDispatch} = useContext(Store);
    //const {userInfo} = state;
    const { userInfo, cart: { shippingAddress } } = state;


    return(
        <div>
        <h2>Account</h2>


<div>
    {
        shippingAddress ? 
        (<div>
            <div>Full Name: {shippingAddress.fullName}</div>
            <div>Address: {shippingAddress.address}</div>
            <div>City: {shippingAddress.city}</div>
            <div>Postal Code: {shippingAddress.postalCode}</div>
            <div>Country: {shippingAddress.country}</div>
        </div>) 
        : (<div></div>)
    }
</div>
        </div>
    )
}