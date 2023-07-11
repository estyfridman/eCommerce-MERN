import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
//import UserContext from '../contect/UserContext';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  //const {setUser} = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      console.log(data);
      alert("Login successful");
      setRedirect(true);
    } catch (e) {
      alert("Login failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="form-page">
      <div className="form-wrapper">
        <div className="title">Login</div>
        <form onSubmit={handleLoginSubmit}>
          <div className="field">
            <input
              type="email" required
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <label>Email Address</label>
          </div>

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
        </form>

        <div className="link-field-container">
          <div className="link-field">Don't have an account?
            <Link to="/register">Register</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
