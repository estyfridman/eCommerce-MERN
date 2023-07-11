import React, { useState } from "react";
import { IProduct } from "../../../models/IProduct";
import { Link } from "react-router-dom";

interface IProductProps {
    product: IProduct;
}

const Product = ({ product }: IProductProps) => {
    const {
        id,
        title,
        description,
        price,
        quantityUnitsInStock,
    } = product;
    const [amount, setAmount] = useState(0);

    const handleAddProduct = () => {
        //addProduct({ ...product, quantity: 1 });
        //openCart();
    }

    const displayAddToCart = () => {
        if (quantityUnitsInStock > 0) {
            return (
                <div>
                    <div>
                        <button onClick={() => setAmount(amount + 1)}>+</button>
                        {amount}
                        <button onClick={() => setAmount(amount - 1)}>-</button>
                    </div>
                    <button onClick={handleAddProduct}>Add to cart</button>
                </div>
            );
        }
        else {
            return(
                <div>The product is out of stock</div>
            )
        }
    }

    return (
        <>
            <div>{title}</div>
            <div>{description}</div>
            <div>{price}</div>
            {displayAddToCart}
            <Link to={`/product/${id}`}>View details</Link>
        </>
    )
}