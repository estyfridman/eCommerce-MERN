
import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';  
import { Store } from '../../context/Store.jsx';
import { AddToCartHandler } from '../../Services/AddToCart.js';
import Rating from '../Rating/Rating.jsx';

const Product = ({ product }) => {

    const { state, dispatch: ctxDispatch } = useContext(Store);

    const { cart: { cartItems } } = state;

    return (
        <div className="row">
            <div className="col-md-12 col-sm-8">
                <Card className="product-card">
                        <Card.Img variant="top" src={product.image} alt={product.title}
                            className="card-image-page"
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = "./Images/Image_not_available.png";
                            }}>
                        </Card.Img>
                    <Card.Body className='card-body'>
                            <Card.Title className='text-shortener'>{product.title}</Card.Title>
                        <Rating rating={product.rating.rate} numReviews={product.rating.count}></Rating>
                        <Card.Text>{product.price}$</Card.Text>
                        {product.countInStock === 0 ?
                            (<Button id='btn-out' disabled > Out Of Stock </Button>) 
                            :
                            (<Button id='btn-cart' onClick={() => {AddToCartHandler(product, cartItems, ctxDispatch)}}>Add To Cart </Button>)}
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Product