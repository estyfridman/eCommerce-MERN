import React, { useContext, useReducer, useEffect } from "react";
import { Store } from "../context/Store";
import { useParams, useNavigate, Link } from 'react-router-dom';
import orderReducer from '../Reduser/orderReducer';
import { initStateOrder } from '../Reduser/orderReducer';
import Loading from "../components/Loading/Loading";
import MessageBox from "../components/MessageBox/MessageBox";
import { Col, Row, Card, ListGroup } from 'react-bootstrap';
import { GET_REQUEST, GET_SUCCESS, GET_FAIL } from "../Reduser/Actions";
import axios from "axios";

export default function OrderPage() {

    const { state: { userInfo } } = useContext(Store);
    const params = useParams();
    const { id: orderId } = params;
    const naviagte = useNavigate();

    const [{ loading, error, order }, dispatch] = useReducer(orderReducer, initStateOrder);

    useEffect(() => {
        const getOrder = async () => {

            dispatch({ type: GET_REQUEST });

            try {
                if (userInfo && userInfo.token) {
                    const { data } = await axios.get(`/orders/${orderId}`, {
                        headers: {
                            authorization: userInfo.token,
                        },
                      },
                      );
                    dispatch({ type: GET_SUCCESS, payload: data });
                 }
                
            } catch (err) {
                dispatch({ type: GET_FAIL, payload: err });
            }
        };
        if (!userInfo) {
            naviagte('/login');
        }
        if (!order || (order._id && orderId !== order._id) || !userInfo) {
            getOrder();
        }
    }, [naviagte, order, orderId, userInfo]);


    return (
        <div>
            {
                loading ?
                    (<Loading />) :
                    error ?
                        (<MessageBox variant="danger">{error}</MessageBox>)
                        : (<div>
                            <h1 className="my-3">Order {order._id.substr(order._id.length - 5)}</h1>
                            <Row>
                                <Col md={8}>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <Card.Title>Shipping</Card.Title>
                                            <Card.Text>
                                                <strong>Name: </strong> {order.shippingAddress.fullName} <br />
                                                <strong>Address: </strong> {order.shippingAddress.address},
                                                {order.shippingAddress.city} ,{order.shippingAddress.country}
                                            </Card.Text>
                                            {order.isDelivered ? (
                                                <MessageBox variant="success">
                                                    Delivered at {order.deliveredAt}
                                                </MessageBox>
                                            ) : (
                                                <MessageBox variant="danger">Not Delivered</MessageBox>
                                            )}
                                        </Card.Body>
                                    </Card>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <Card.Title>Payment</Card.Title>
                                            <Card.Text>
                                                <strong>Method: </strong> {order.paymentMethod}
                                            </Card.Text>
                                            {order.isPaid ? (
                                                <MessageBox variant="success">
                                                    Paid at {order.paidAt}
                                                </MessageBox>
                                            ) : (
                                                <MessageBox variant="danger">Not Paid</MessageBox>
                                            )}
                                        </Card.Body>
                                    </Card>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <Card.Title>Items</Card.Title>
                                            <ListGroup variant="flush">
                                                {order.orderItems.map((item) => (
                                                    <ListGroup.Item key={item._id}>
                                                        <Row className="align-items-center">
                                                            <Col md={6}>
                                                                <img
                                                                    src={item.image}
                                                                    alt={item.title}
                                                                    className="img-fluid rounded img-thumbnail"
                                                                ></img>{' '}
                                                                <Link to={`/product/${item.token}`}>{item.title}</Link>
                                                            </Col>
                                                            <Col md={3}>
                                                                <span>{item.quantity}</span>
                                                            </Col>
                                                            <Col md={3}>${item.price}</Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <Card.Title>Order Summary</Card.Title>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Items</Col>
                                                        <Col>${order.itemsPrice.toFixed(2)}</Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Shipping</Col>
                                                        <Col>${order.shippingPrice.toFixed(2)}</Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Tax</Col>
                                                        <Col>${order.taxPrice.toFixed(2)}</Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>
                                                            <strong> Order Total</strong>
                                                        </Col>
                                                        <Col>
                                                            <strong>${order.totalPrice.toFixed(2)}</strong>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </div>)
            }
        </div>
    );
}
