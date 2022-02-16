import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducer/login/index";
import "./login.css";

toast.configure();

const Login = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const notifyLoginSuccess = () => {
    toast.success("Login Successfully", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    navigate("/products");
  };

  const notifyLoginError = () => {
    toast.warn("Please fill All The Fields", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const loginFunction = () => {
    if (email && password) {
      const userLogin = { email, password };

      const myUser = axios
        .post(`http://localhost:5000/user/login`, userLogin)
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem("token", response.data.token);
            dispatch(login(response.data.token));
            notifyLoginSuccess();
          }
        })
        .catch((err) => {
          console.log(err.meseage);
          toast.error(err.response.data.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        });
    } else {
      notifyLoginError();
    }
  };

  return (
    <div className="Login_form1">
      {/* <div>
        <img
          src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signin-image.jpg"
          className="Register-image-login"
        />
      </div> */}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginFunction();
        }}
        className="Login-form"
      >
        <div className="Login-form-div">
          <p className="title">Login</p>
          <div className="form-e">
            <i class="fa-duotone fa-user-hair"></i>
            <input
              className="login-inp"
              placeholder="Email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <br />
            <input
              className="login-inp"
              placeholder="Password"
              type="password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              required
            />
            <br />
          </div>

          <input type="submit" value="Login" className="Login_Submit" />

          <br />
        </div>
      </form>
    </div>
  //   <div className="all-login">
  //   <div class="main">  	
	// 	<input type="checkbox" id="chk" aria-hidden="true" className="input"/>

	// 		<div class="signup">
	// 			<form>
	// 				<label for="chk" aria-hidden="true" >Sign up</label>
	// 				<input type="text" name="txt" placeholder="User name" required=""  className="input"/>
	// 				<input type="email" name="email" placeholder="Email" required="" className="input"/>
	// 				<input type="password" name="pswd" placeholder="Password" required="" className="input"/>
	// 				<button className="button">Sign up</button>
	// 			</form>
	// 		</div>

	// 		<div class="login">
	// 			<form>
	// 				<label for="chk" aria-hidden="true"  >Login</label>
	// 				<input type="email" name="email" placeholder="Email" required="" className="input"/>
	// 				<input type="password" name="pswd" placeholder="Password" required="" className="input"/>
	// 				<button className="button">Login</button>
	// 			</form>
	// 		</div>
	// </div>
  // </div>
  );
};

export default Login;
