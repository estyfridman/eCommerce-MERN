import React, { useEffect} from "react";
import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Container, Form } from "react-bootstrap";
import {Store} from "../context/Store.jsx";
import { toast } from "react-toastify";
import { USER_SIGNIN } from "../Reduser/Actions";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const {search} = useLocation();
  const { state, dispatch: ctxDispatch} = useContext(Store);
  const {userInfo} = state;
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/users/signin", { email, password });
      ctxDispatch({ type: USER_SIGNIN, payload: data });
      navigate(redirect || "/");
    } catch (error) {
      toast.error(error.message, {theme: "colored", hideProgressBar: true,
      autoClose: 3000,
      closeOnClick: true,});
    }
  };

  useEffect(() => {
    userInfo && navigate(redirect);
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="form-page small-container">
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

          <Form.Group className="field">
            <input
              type="password" required
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <label>Password:</label>
          </Form.Group>

          <div className="field">
            <input type="submit" value="Login"></input>
          </div>
        </Form>

        <div className="link-field-container">
          <div className="link-field">Don't have an account?
            <Link to={`/register?redirect=${redirect}`}>Register</Link>
          </div>
        </div>

      </div>
    </Container>
  );
}//
