import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import axios from "axios";
//import {UserContext} from "../contect/UserContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  //const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  //const handleShowConfirmPassword = () => {
  //  setShowConfirmPassword((preve) => !preve);
  //};
  //useContext(UserContext);

  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful. Now you can log in");
    } catch (e) {
      alert("Registration failed. Please try again later");
    }
  }

  return (
    <div className="form-page">
      <div className="form-wrapper">
        <div className="title">Register</div>
        <form onSubmit={registerUser}>
          <div className="field">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
            />
            <label>Name</label>
          </div>

          <div className="field">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
            <label>Email Address</label>
          </div>

          <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          <div className="field">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              required
            />
            <label>Password</label>
          </div>

          <div className="field">
            <input type="submit" value="Register"></input>
            <br />
          </div>
        </form>
        <div>
          Already a member?
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
