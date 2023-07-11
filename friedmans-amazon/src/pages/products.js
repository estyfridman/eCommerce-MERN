import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function Products() {

    const [products, setProducts] = useState([]);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <h2>Products</h2>
            <div>
                {products.map((product) => (
                    <div key={product._id}>
                        <img src={product.image} alt={product.title} width={100}/>
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>Price: {product.price}</p>
                    </div>
                ))}
            </div>
        </>
    );
}