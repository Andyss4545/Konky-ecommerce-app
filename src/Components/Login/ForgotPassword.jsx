import React, { useState } from "react";
import "../Login/ForgotPassword.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import KonkyLogo from "../../Assets/Konky-logo.png";

const ForgotPassword = () => {
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

  let forgotPass = (event) => {
    event.preventDefault();

    auth.confirmPasswordReset(auth, email).then((auth) => {
      if (auth) {
        navigate("/login", { replace: true });
      } else {
        navigate("/forgotpassword", { replace: true });
      }
    });
  };
  return (
    <div className="login">
      <div className="login_content">
        <Link to={"/"} className="login_logo">
          <img src={KonkyLogo} alt="" />
        </Link>
        <p className="login_desc">
          Enter your email to request for a new password
        </p>
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
          <button onClick={forgotPass} className="login_btn" type="button">
            Continue
          </button>
        </form>
      </div>

      <div className="forgot_register">
        <p>Go back to login page? </p>
        <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
