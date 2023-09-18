import React, { useContext } from "react";
import { Store } from "../context/Store";
import { useNavigate } from "react-router-dom";
import { Col, Row, Toast } from "react-bootstrap";
import CartItem from "../components/Cart/cartItem";
import Total from "../components/Cart/Total";
import axios from "axios";
import { ADD_TO_CART, GET_FAIL, REMOVE_FROM_CART } from "../Reduser/Actions";

export default function Cart() {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;
  const navigate = useNavigate();

  
  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
}

  const updateCartHandler = async (item, quantity) => {
    try {
      const { data } = await axios.get(`/products/id/${item._id}`);
      if (data.countInStock < quantity) {
        Toast.error("Sorry, out of stock");
        return;
      }
      contextDispatch({ type: ADD_TO_CART, payload: { ...item, quantity } });
    } catch (error) {
      contextDispatch({ type: GET_FAIL, payload: error.message });
    }
  };

  const removeItemHandler = (item) => {
    contextDispatch({ type: REMOVE_FROM_CART, payload: item });
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <Row>
        <Col md={8}>
          <CartItem
            cartItems={cartItems}
            updateCartHandler={updateCartHandler}
            removeCartHandler={removeItemHandler}
          ></CartItem>
        </Col>
        <Col md={4}>
          <Total
            cartItems={cartItems}
            checkoutHandler={checkoutHandler}
          ></Total>
        </Col>
      </Row>
    </div>
  );
}
