import React, { useEffect, useContext, useReducer} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import MessageBox from '../components/MessageBox/MessageBox';
import Loading from '../components/Loading/Loading';
import { Store } from "../context/Store.jsx";
import { GET_REQUEST, GET_SUCCESS, GET_FAIL } from "../Reduser/Actions";
import axios from 'axios';
import { AddToCartHandler } from '../Services/AddToCart.js';
import ProductPageReducer from '../Reduser/ProductPageReducer';
import ProductDescription from '../components/products/product/CartDescription';
import CartDescription from '../components/products/product/CartDescription';
import {toast} from 'react-toastify'

const ProductInfo = () => {

  const params = useParams();
  const { token } = params;
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const initialState = {
    loading: true,
    error: '',
    products: [],
  };

  const [{ loading, error, product }, dispatch] = useReducer(ProductPageReducer, initialState);

  const addToCart = async () => {
    await AddToCartHandler(product, cartItems, ctxDispatch);
     navigate('/cart');
  };

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: GET_REQUEST });

      try {
        const res = await axios.get(`/products/token/${token}`);
        dispatch({ type: GET_SUCCESS, payload: res.data });
      } catch (err) {
        dispatch({ type: GET_FAIL, payload: err });
        toast.error(err)
      }
    };

    getProduct();
  }, [token]);

    return (
        <div>
          {loading ? 
          (
            <Loading />
          ) : error ? 
          (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : 
          (
            <div>
              <Row>
                <Col md={6}>
                  <img
                    src={`${product.image}`}
                    alt={product.title}
                    className="card-img-top card-image"
                  />
                </Col>
    
                <Col md={3}>
                  <ProductDescription {...product} />
                </Col>
    
                <Col md={3}>
                <CartDescription product={product} addToCart={addToCart} /> 
                </Col>
              </Row>
            </div>
          )}
        </div>
      );
}

export default ProductInfo