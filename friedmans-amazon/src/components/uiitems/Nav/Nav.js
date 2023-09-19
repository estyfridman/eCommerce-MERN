import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, NavDropdown } from "react-bootstrap";
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
        
        <div className="img-container">
        <Link to="/">
        <img src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695" alt="my logo"  width={100}/>
      </Link>
        </div>
        <Link to="/home">Home</Link>
        <Link to="/products">Products</Link>

        <SearchBox/>

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
            <Link to="/login" onClick={loginHandler} className="dropdown-item" >Login</Link>
            <Link to="/register" className="dropdown-item" >Register</Link>
            </NavDropdown>
            )
          }
      </Navbar>
    </header>
    </>
  );
}
