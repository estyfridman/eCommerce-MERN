import { useReducer, useContext, useEffect } from 'react';
import { Store } from "../context/Store.jsx";
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, Col, Row, ListGroup } from "react-bootstrap";
import axios from "axios";
import { CREATE_FAILED, CREATE_REQUEST, CREATE_SUCCEEDED, CLEAR_CART} from '../Reduser/Actions.js';
import { toast } from 'react-toastify';
import CheckoutSteps from '../components/CheckoutSteps/CheckoutSteps';
import Loading from '../components/Loading/Loading.jsx'

const reducer = (state, { type }) => {
    switch (type) {
      case CREATE_REQUEST:
        return { ...state, loading: true };
      case CREATE_SUCCEEDED:
        return { ...state, loading: false };
      case CREATE_FAILED:
        return { ...state, loading: false };
  
      default:
        return state;
    }
  };
  

export default function SubmitOrderPage(){

    const [{ loading }, dispatch] = useReducer(reducer, { loading: false });

    const { state, dispatch: storeDispatch } = useContext(Store);
    const { cart, userInfo } = state;
    const { paymentMethod } = cart;
    const navigate = useNavigate();

    
    async function submitOrderHandler(e){
      e.preventDefault();
      try {
        dispatch({ type: CREATE_REQUEST });//ctxDispatch

      const { data } = await axios.post(
        '/orders/',
        {    //bodyParameters
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: { authorization: userInfo.token },
        }
      );

      dispatch({ type: CREATE_SUCCEEDED });

      storeDispatch({ type: CLEAR_CART });

      localStorage.removeItem('cartItems');

      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: CREATE_FAILED });
      toast.error(err.message);
    }
  };

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  cart.taxPrice = round2(cart.itemsPrice * 0.17);
  cart.shippingPrice =
    cart.itemsPrice > 50
      ? round2(cart.itemsPrice * 0.1)
      : round2(cart.itemsPrice * 0.02);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  useEffect(() => {
    if (!paymentMethod) {
      navigate('/payment');
    }
  }, [cart, navigate, paymentMethod]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <h1 className="my-3">Orders Summary</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name: </strong>
                {cart.shippingAddress.fullName}
                <br />
                <strong>Address: </strong>
                {cart.shippingAddress.address}
                <br />
                <strong>City: </strong>
                {cart.shippingAddress.city}
                <br />
                <strong>Country: </strong>
                {cart.shippingAddress.country}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="img-fluid rounded img-thumbnail"
                        />{' '}
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
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Summary: </Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items: </Col>
                    <Col>${cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping: </Col>
                    <Col>${cart.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax: </Col>
                    <Col>${cart.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total: </Col>
                    <Col>
                      <strong>${cart.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={submitOrderHandler}
                      disabled={cart.cartItems.length === 0}
                    >
                      Submit
                    </Button>
                  </div>
                  {loading && <Loading />}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}