import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const Product = ({ product }) => {

    //const [amount, setAmount] = useState(0);

    const handleAddProduct = (product) => {
        console.log(product)
        //addProduct({ ...product, quantity: 1 });
        //openCart();
    }

    // const displayAddToCart = () => {
    //     if (countInStock > 0) {
    //         return (
    //             <div>
    //                 <div>
    //                     <button onClick={() => setAmount(amount + 1)}>+</button>
    //                     {amount}
    //                     <button onClick={() => setAmount(amount - 1)}>-</button>
    //                 </div>
    //                 <button onClick={() => handleAddProduct(product)}>Add to cart</button>
    //             </div>
    //         );
    //     }
    //     else {
    //         return (
    //             <div>Out of stock</div>
    //         )
    //     }
    // }

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
                            (<Button className='btn-primary' onClick={() => { handleAddProduct(product) }}>Add To Cart</Button>)}
                    </Card.Body>
                </Link>
            </Card>
        </>
    )
}

export default Product