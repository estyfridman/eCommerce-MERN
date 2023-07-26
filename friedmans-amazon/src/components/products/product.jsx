import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { Store } from '../../context/Store.jsx';
import { useContext } from'react';
import { AddToCartHandler } from '../../Services/AddToCart.js';

const Product = ({ product }) => {

    const  {state, dispatch: contextDispatch} = useContext(Store); 
    const { cart: { cartItems } } = state;
    const navigate = useNavigate();

    return (
        <>
            <Card className="product-card">
                <Link to={`/product/${product.token}`}>
                    <Card.Img variant="top" src={product.image} alt={product.title} 
                    className="card-image-page" onError={({currentTarget}) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "./Images/Image_not_available.png";
                    }}>
                    </Card.Img>
                    <Card.Body className='card-body'>
                        <Card.Title>{product.title}</Card.Title>
                        
                        <Card.Text>{product.description}</Card.Text>
                        <Card.Text>{product.price}$</Card.Text>
                        {product.countInStock === 0 ?
                            (<Button variant='light' disabled>Out Of Stock</Button>) :
                            (<Button className='btn-primary'  onClick={() => { AddToCartHandler(product , cartItems , contextDispatch)}}>Add To Cart
                            </Button>)
                        }
                    </Card.Body>
                </Link>
            </Card>
        </>
    )
}

export default Product