import React, { useState } from "react";
import "../Register/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { query, collection, getDocs, addDoc, where } from "firebase/firestore";
import KonkyLogo from "../../Assets/Konky-logo.png";

const Register = () => {
  const navigate = useNavigate();

  // email input field
  const [nameInput, setNameInput] = useState({
    name: "",
  });

  // let destructure
  const { name } = nameInput;

  let updateName = (event) => {
    setNameInput(() => ({
      name: event.target.value,
    }));
  };
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

  let signUp = (event) => {
    event.preventDefault();

    // firebase crete user with email and password
    auth
      .createUserWithEmailAndPassword(email, password, name)
      .then((auth) => {
        const user = auth.user;

        if (user) {
          //  navigate to payment after register
          navigate("/payment", { replace: true });
        } else {
          navigate("/register", { replace: true });
        }
      })
      .catch((error) => {
        // if any error alert the error message
        const error_message = error.message;
        alert(error_message);
      });
  };

  // let signUp = async (name, email, password) => {
  //   try {
  //     const response = await auth.createUserWithEmailAndPassword(
  //       email,
  //       password
  //     );

  //     const user = response.user;
  //     await addDoc(collection(db, "users"), {
  //       uid: user.uid,
  //       name,
  //       authProvider: "local",
  //       email,
  //     });
  //   } catch (error) {
  //     const erro_message = error.message;
  //     console.log(erro_message);
  //   }
  // };
  return (
    <div className="register">
      <div className="register_content">
        <Link to={"/"} className="register_logo">
          <img src={KonkyLogo} alt="" />
        </Link>
        <p className="register_desc">Fill out your details to register </p>
      </div>

      <div className="register_form">
        <form action="">
          <input
            name="name"
            value={name}
            onChange={updateName}
            type="name"
            placeholder="Fullname"
          />
          <input
            name="email"
            value={email}
            onChange={updateEmail}
            type="email"
            placeholder="Email"
            required
          />
          <input
            name="password"
            value={password}
            onChange={updatePassword}
            type="password"
            placeholder="Password"
            required
          />
          <button onClick={signUp} className="register_btn" type="button">
            Continue
          </button>
        </form>
      </div>

      <button className="register_google">
        <img
          className="register_icon"
          src="https://img.icons8.com/color/48/null/google-logo.png"
        />
        <span>register with Google</span>
      </button>

      <div className="register_login">
        <p>Already have an account? </p>
        <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
};

export default Register;
