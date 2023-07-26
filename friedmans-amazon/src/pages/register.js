import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation  } from "react-router-dom";
import { Form, Container, Button } from "react-bootstrap";
import { BiShow, BiHide } from "react-icons/bi";
import { toast } from "react-toastify";
import { Store } from "../context/Store.jsx";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
  };

  async function registerUser(e) {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data } = await axios.post("/users/signup", {
        name,
        email,
        password,
      });
      alert("Registration successful. Now you can log in");

      ctxDispatch({
        type: "USER_SIGNIN",
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    userInfo && navigate(redirect);
    }, [navigate, redirect, userInfo]);

  return (
    <Container className="form-page">
      <div className="form-wrapper">
        <div className="title">Register</div>
        <Form onSubmit={registerUser}>
          <Form.Group className="field">
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
            />
            <Form.Label>Name</Form.Label>
          </Form.Group>

          <Form.Group className="field">
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
            <Form.Label>Email Address</Form.Label>
          </Form.Group>

          <span
            className="flex text-xl cursor-pointer"
            onClick={handleShowPassword}
          >
            {showPassword ? <BiShow /> : <BiHide />}
          </span>
          <Form.Group className="field" controlId="password">
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              required
            />
            <Form.Label>Password</Form.Label>
          </Form.Group>

          <span
            className="flex text-xl cursor-pointer"
            onClick={handleShowConfirmPassword}
          >
            {showPassword ? <BiShow /> : <BiHide />}
          </span>
          <Form.Group className="field" controlId="confirm-password">
            <Form.Control
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showConfirmPassword ? "text" : "password"}
              required
            />
            <Form.Label>Confirm Password</Form.Label>
          </Form.Group>

          <div className="field">
            <Button type="submit" >Register</Button>
            <br />
          </div>
        </Form>
        <div>
          Already a member?
          <Link to={`/login?redirect=${redirect}`}>Sign in Here</Link>
        </div>
      </div>
    </Container>
  );
};
