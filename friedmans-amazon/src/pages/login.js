import React, { useEffect, createContext } from "react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
//import UserContext from '../contect/UserContext';
import { Container, Form } from "react-bootstrap";
import {Store} from "../contect/Store";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userContext = createContext();

  const navigate = useNavigate();
  const {search} = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  
  const { state, dispatch: ctxDispatch} = userContext(Store);
  const {userInfo} = state;
  useEffect(() => {
    userInfo && navigate(redirect);
  }, [navigate, redirect, userInfo]);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/users/signin", { email, password });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      navigate(redirect);
    } catch (error) {
      toast.error(error.message);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <Container className="form-page">
      <div className="form-wrapper">
        <div className="title">Login</div>
        <Form onSubmit={handleLoginSubmit}>
          <Form.Group className="field">
            <input
              type="email" required
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <label>Email Address</label>
          </Form.Group>

          <div className="field">
            <input
              type="password" required
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <label>Password:</label>
          </div>

          <div className="field">
            <input type="submit" value="Login"></input>
          </div>
        </Form>

        <div className="link-field-container">
          <div className="link-field">Don't have an account?
            <Link to={`signUp?redirect=${redirect}`}>Register</Link>
          </div>
        </div>

      </div>
    </Container>
  );
}//
