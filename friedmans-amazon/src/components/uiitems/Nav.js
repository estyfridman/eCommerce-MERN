import React from "react";
import { Link, useNavigate } from "react-router-dom";
//import { HiOutlineUserCircle } from "react-icons/hi";
import { Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Nav() {
  const navigate = useNavigate();

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
        <Link to="/cart">My Cart</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        
      </div>
    
    </header>
    </>
  );
}
