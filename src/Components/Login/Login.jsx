import React, { useState } from "react";
import "../Login/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import KonkyLogo from "../../Assets/Konky-logo.png";

const Login = () => {
  const navigate = useNavigate();

  // email input field
  const [emailInput, setEmailInput] = useState({
    email: "",
  });

  // let destructure
  const { email } = emailInput;

  let updateEmail = (event) => {
    setEmailInput(() => ({
      email: event.target.value,
    }));
  };

  // password input field
  const [passwordInput, setPasswordInput] = useState({
    password: "",
  });

  // let destructure
  const { password } = passwordInput;

  let updatePassword = (event) => {
    setPasswordInput(() => ({
      password: event.target.value,
    }));
  };

  const singIn = (event) => {
    event.preventDefault();
    // firebase singIn with email and password
    auth.signInWithEmailAndPassword(email, password).then((auth) => {
      // if auth satified, navigat to payment else stay on the page
      if (auth) {
        navigate("/payment", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    });
  };

  return (
    <div className="login">
      <div className="login_content">
        <Link to={"/"} className="login_logo">
          <img src={KonkyLogo} alt="" />
        </Link>
        {/* <p className="login_title">What's your email/Password address</p>
        <p className="login_desc">Type your login details to continue</p> */}
      </div>

      <div className="login_form">
        <form action="">
          <input
            name="name"
            value={email}
            onChange={updateEmail}
            type="email"
            placeholder="Email"
            required
          />
          <input
            name="name"
            value={password}
            onChange={updatePassword}
            type="password"
            placeholder="Password"
            required
          />
          <button onClick={singIn} className="login_btn" type="button">
            Continue
          </button>
        </form>

        <Link className="login_forgot" to={"/forgotpassword"}>
          Forgot Password
        </Link>
      </div>

      <button className="login_google">
        <img
          className="login_icon"
          src="https://img.icons8.com/color/48/null/google-logo.png"
        />
        <span>Login with Google</span>
      </button>

      <div className="login_register">
        <p>Don't have an account? </p>
        <Link to={"/register"}>Register</Link>
      </div>
    </div>
  );
};

export default Login;
