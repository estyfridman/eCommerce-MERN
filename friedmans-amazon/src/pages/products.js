import React from 'react';
import { useState, useEffect } from'react';
import { Col, Row } from'react-bootstrap';
import Product from '../components/products/product';
import axios from 'axios';

export default function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
          await axios.get("/products").then((res) => setProducts(res.data));};
    
        getProducts();
      },[]);


    return (
        <>
            <Row>
                {products.map((product) => (
                    <Col key={product.token} lg={3} md={4} sm={6} className="mb-3" >
                        <Product product={product} /> 
                    </Col>
                ))}
            </Row>
        </>
    );
}