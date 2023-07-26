import React from "react";
import MessageBox from "../MessageBox/MessageBox";
import { Link } from "react-router-dom";
import { Button, ListGroup, Row, Col } from "react-bootstrap";

const CartItem = ({cartItems, updateCartHandler, removeCartHandler}) => {

    return (
        <>
         {cartItems.length === 0 ? 
         (
            <MessageBox> Your cart is empty.
                {<Link to="/">Back</Link>}
            </MessageBox>
         ) : (
            <ListGroup>
                {cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                        <Row className="align-items-center">
                            <Col md={4}>
                                <img src={item.image} alt={item.name} className="img-fluid rounded img-thumbnail" />
                                <Link to={`/products/${item.token}`}>
                                    {item.name}
                                </Link>
                            </Col>
                            <Col md={3}>
                                <Button onClick={() => updateCartHandler(item, item.quantity - 1)} variant="light" disabled={item.quantity -1}></Button>
                                {item.price}
                            </Col>
                            <Col>
                                {item.quantity}
                            </Col>
                            <Col>
                                {item.price * item.quantity}
                            </Col>
                            <Col>
                                <Button
                                    className="btn btn-danger"
                                    onClick={() => removeCartHandler(item)}
                                >
                                    <i className="fas fa-trash"></i>
                                </Button>{' '}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    ))}
                </ListGroup>
         )}
        </>
    )
}

export default CartItem;