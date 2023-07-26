import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Container, Badge, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Store } from "../../context/Store.jsx";
import { USER_SIGNOUT } from "../../Reduser/Actions";

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  const  {state, dispatch: contextDispatch} = useContext(Store);
  const { cart, userInfo} = state;
  const { cartItems } = cart;

  const logoutHandler = (event) => {
    contextDispatch({type: USER_SIGNOUT});
  };

  const loginHandler = (event) => {
    event.preventDefault();
  };
  return (
    <>
    <header className="navbar-all">
      <Navbar>
        <Link
          onClick={() => {
            navigate(-1);
          }}
        > Back
        </Link>
        <Container>
        <LinkContainer to="/" className="navbar-left">
        <img src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695" alt="my logo"  width={100}/>
      </LinkContainer>
        </Container>

        <nav to="/search"  className="d-flex mx-auto align-items-center">
            <input type="text"></input>
            <button type="submit"  id="Isearch">
              <i className="fas fa-search"></i>
            </button>
        </nav>

      </Navbar>

      <div className="navbar-center">
        <Link to="/home">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart" className="nav-link me-4 ms-4">
          <i className="fas fa-shopping-cart text-white"></i>
          { cartItems.length > 0 && (
            <Badge pill bg="danger"> {
              cartItems.reduce((acc, item) => acc + item.quantity, 0)
            }</Badge>
          )}
        </Link>
        {
          userInfo ? (
            <NavDropdown className="text-white me-5" title={userInfo.name}>
              <Link to="/" className="dropdown-item" onClick={logoutHandler}> logout
              </Link>
            </NavDropdown>
          ) : (<link to="/login" className="dropdown-item" onClick={loginHandler}>Login</link>)
          }
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        
      </div>
    
    </header>
    </>
  );
}
