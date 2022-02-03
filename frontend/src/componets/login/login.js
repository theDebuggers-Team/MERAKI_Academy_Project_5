import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import GoogleLogin from "react-google-login";

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const [isError, setisError] = useState(false);
  const [emptyFeildsError, setemptyFeildsError] = useState(false);
  const [loginSucess, setloginSucess] = useState(false);

  const loginFunction = () => {
    if (email && password) {
      const userLogin = { email, password };

      const myUser = axios
        .post(`http://localhost:5000/login`, userLogin)
        .then((response) => {
          if (response.data.success) {
            //  setToken(response.data.token)
            localStorage.setItem("token", response.data.token);

            setloginSucess(true);
          }
        })
        .catch((err) => {
          console.log(err.meseage);
          setError(err.response.data.meseage);
          setisError(true);
          setemptyFeildsError(false);
        });

      if (myUser.data.success) {
        navigate("/products");
      }
    } else {
      setemptyFeildsError(true);
    }
  };
  //  const responseGoogle=(result)=>{
  //      localStorage.setItem("token",result.tokenId)
  //      console.log(result);
  //     //  navigate("/products")
  //  }
  // console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID_1);
  return (
    <div className="login-form">
      <p className="title">Login</p>
      <div className="form-e">
        <input
          className="login-inp"
          placeholder="Email"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <input
          className="login-inp"
          placeholder="Password"
          type="password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <br />
      </div>
      <button className="login-btn" onClick={loginFunction}>
        Log in
      </button>
      <br />
      {isError ? { error } : null}
      {emptyFeildsError ? (
        <p className="pass-messages-login">Please fill All feilds</p>
      ) : null}
      {loginSucess ? (
        <p className="pass-messages-login"> You are successfully Login </p>
      ) : null}
      {/* <GoogleLogin 
      style={{display: 'flex', width: '100%',justifyContent: 'center', cursor: 'pointer',alignItems:"center"}}
    //   className="login-btn"
      clientId= "1045575810316-g0qohjbk7m4c4rv1sjcmp161k94tlc5b.apps.googleusercontent.com"
       buttonText="Login"
      onSuccess={responseGoogle}
       onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}></GoogleLogin> */}
    </div>
  );
};

export default Login;
