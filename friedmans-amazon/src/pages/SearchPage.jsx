import React, { useState, useEffect } from 'react';
import { useReducer } from 'react';
import searchPageReducer from '../Services/utillsSearch';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Col, Row, Button } from 'react-bootstrap';
import { getFilterUrl } from '../Services/getFilterUrl';
import { GET_FAIL, GET_SUCCESS, GET_REQUEST } from '../Reduser/Actions';
import axios from 'axios';
import Title from '../components/Title/Title';
import { prices, ratings } from '../Services/utillsSearch';
import Rating from '../components/Rating/Rating';
import '../components/Search/SearchPage.css';
import Loading from '../components/Loading/Loading';
import MessageBox from '../components/MessageBox/MessageBox';
import Product from '../components/products/product'
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";

const SearchPage = () => {

    const [{ loading, error, products, pages, countProducts }, dispatch] = useReducer(searchPageReducer, {
        loading: true,
        error: '',
    });

    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);

    const category = searchParams.get("category") || "all";
    const query = searchParams.get("query") || "all";
    const price = searchParams.get("price") || "all";
    const rating = searchParams.get("rating") || "all";
    const order = searchParams.get("order") || "newest";
    const page = searchParams.get("page") || 1;

    useEffect(() => {
        const getCategories = async () => {
            try {
                const { data } = await axios.get(`/products/categories`);
                setCategories(data);
            } catch (error) {
                toast.error(error.message);
            }
        };
        getCategories();
    }, []);

    useEffect(() => {
        const getData = async () => {
            dispatch({ type: GET_REQUEST });
            try {
                const { data } = await axios.get(`products/search?` + getFilterUrl(search, { filterPrice: '1-50' }, true));
                dispatch({ type: GET_SUCCESS, payload: data });
            } catch (error) {
                dispatch({ type: GET_FAIL, payload: error.message });
            }
        };
        getData();
    }, []);

    return (
        <div>
            <Title>Search </Title>
            <Row>
                <Col md={3}>
                    <h3>Category</h3>
                    <div>
                        <ul>
                            <li>
                                <Link className={'all' === category ? 'text-bold' : ''} to={getFilterUrl(search, { category: 'all' })}>
                                    Any
                                </Link>
                            </li>
                            {categories.map((c) => (
                                <li key={c}>
                                    <Link className={c === category ? 'text-bold' : ''} to={getFilterUrl(search, { category: 'c' })}>
                                        {c}
                                    </Link>

                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Price</h3>
                        <ul>
                            <li>
                                <Link
                                    className={'all' === price ? 'text-bold' : ''}
                                    to={getFilterUrl(search, { price: 'all' })}
                                >
                                    Any
                                </Link>
                            </li>
                            {prices.map((p) => (
                                <li key={p.name}>
                                    <Link
                                        to={getFilterUrl(search, { price: p.value })}
                                        className={p.value === price ? 'text-bold' : ''}>
                                        {p.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Reviews</h3>
                        <ul>
                            {ratings.map((r) => (
                                <li key={r.name}>
                                    <Link
                                        to={getFilterUrl(search, { rating: r.rating })}
                                        className={`${r.rating}` === `${rating}` ? 'start' : ''}
                                    >
                                        <Rating caption=' ' rating={r.value}></Rating>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Col>
                <Col md={9}>
                    {loading ? (<Loading />)
                        : error ? (<MessageBox variant="danger">{error}</MessageBox>)
                            : (
                                <>
                                    <Row>
                                        <Col md={2}>
                                            <div>
                                                {countProducts === '0' ? 'No' : countProducts} Results
                                                {query !== 'all' && ' : ' + query}
                                                {category !== 'all' && ' : ' + category}
                                                {price !== 'all' && ' : Price ' + price}
                                                {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                                                {query !== 'all' ||
                                                    category !== 'all' ||
                                                    rating !== 'all' ||
                                                    price !== 'all' ? (
                                                    <button onClick={() => navigate('/search')}>
                                                        <i className="fas fa-times-circle"></i>
                                                    </button>) : null}
                                            </div>
                                        </Col>

                                        <Col className="text-end">
                                            Sort by{' '}
                                            <select
                                                value={order}
                                                onChange={(e) => {
                                                    navigate(getFilterUrl(search, { order: e.target.value }));
                                                }}>
                                                <option value="newest">Newest Arrivals</option>
                                                <option value="lowest">Price: Low to High</option>
                                                <option value="highest">Price: High to Low</option>
                                                <option value="toprated">Customer Reviews</option>
                                            </select>
                                        </Col>
                                    </Row>
                                    {products.length === 0 && ( <MessageBox>No Product Found</MessageBox>)}

                                    <Row>
                {products.map((product) => (
                  <Col sm={6} lg={4} mb={3} key={product._id}>
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>
              
              <div>
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={{
                      pathname: '/search',
                      search: getFilterUrl(search, { page: x + 1 }, true),
                    }}
                  >
                    <Button
                      className={Number(page) === x + 1 ? 'current-page-number' : ''
                      }
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
                                </>
                            )}
                </Col>
            </Row>
        </div>
    )
}

export default SearchPage;