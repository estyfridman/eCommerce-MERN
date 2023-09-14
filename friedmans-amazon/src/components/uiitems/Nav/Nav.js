import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Store } from "../../../context/Store.jsx";
import { USER_SIGNIN, USER_SIGNOUT } from "../../../Reduser/Actions.js";
import SearchBox from "../../Search/SearchBox.jsx";
import './Nav.css';

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  const  {state, dispatch: contextDispatch} = useContext(Store);
  const { cart, userInfo} = state;
  const { cartItems } = cart;

  const logoutHandler = () => {
    contextDispatch({
      type: USER_SIGNOUT
    });
  }

  const loginHandler = () => {
    contextDispatch({
      type: USER_SIGNIN
    });
  }
console.log(cartItems);

  return (
    <>
    <header className="header">
      <Navbar bg='dark' variant='dark'>
        <Link
          onClick={() => {
            navigate(-1);
          }} > 
        {location.pathname !== '/' ? <p>Back</p> : <i className="fa fa-home text-white "> </i>}
        </Link>
        
        <Container>
        <LinkContainer to="/" className="navbar-left">
        <img src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695" alt="my logo"  width={100}/>
      </LinkContainer>
        </Container>
        <Link to="/home">Home</Link>
        <Link to="/products">Products</Link>

        <SearchBox className='searchbox-component'/>

        <Link to="/cart" className="nav-link me-4 ms-4">
          <i className="fas fa-shopping-cart text-white"></i>
         
        </Link>
        {
          userInfo ? (
            <NavDropdown className="text-white me-5" title={userInfo.name} id="basic-nav-dropdown">
              <Link to="/" className="dropdown-item" onClick={logoutHandler}> logout </Link>
              <Link to="/account" className="dropdown-item"> Account </Link>
            </NavDropdown>
          ) : (
            <NavDropdown className="text-white me-5" title='welcome' id="basic-nav-dropdown">
            <Link to="/login" className="dropdown-item" onClick={loginHandler}>Login</Link>
            <Link to="/register">Register</Link>
            </NavDropdown>
            )
          }
        
      </Navbar>

    </header>
    </>
  );
}
