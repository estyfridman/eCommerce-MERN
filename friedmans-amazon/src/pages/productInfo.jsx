import React from 'react';
import MessageBox from '../components/MessageBox';
import Loading from '../components/Loading/Loading';

const productInfo = () => {
    const product = JSON.parse(localStorage.getItem('product'));

    return (
        <div>
          {loading ? (
            <Loading />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
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

export default productInfo