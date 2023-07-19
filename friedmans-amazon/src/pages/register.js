import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import axios from "axios";
//import {UserContext} from "../contect/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  
  const navigate = useNavigate();
  const {search} = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  
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
    if (password!== confirmpassword) {
          alert("Passwords do not match");
          toast.error("Passwords do not match");
          return;
        };
    try {
      await axios.post("/user/register", {
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
          <Link to={`/`}>Sign in Here</Link>
        </div>
      </div>
    </div>
  );
}
