import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducer/login/index";
import "./login.css";
import { GoogleLogin } from "react-google-login";

toast.configure();

const Login = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  ///////////////////////
  const [phone_Number, setphone_number] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const notifyLoginSuccess = () => {
    toast.success("Login Successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const notifyLoginError = () => {
    toast.warn("Please fill All The Fields", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const loginFunction = () => {
    if (email && password) {
      const userLogin = { email, password };

      axios
        .post(`/user/login`, userLogin)
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem("token", response.data.token);
            dispatch(login(response.data.token));
            notifyLoginSuccess();
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err.meseage);
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } else {
      notifyLoginError();
    }
  };

  const responseGoogle = async (responseGoogle) => {
    console.log(responseGoogle.googleId);
    const newUser = {
      firstName: responseGoogle.profileObj.givenName,
      lastName: responseGoogle.profileObj.familyName,
      age: 0,
      country: "Jordan",
      email: responseGoogle.profileObj.email,
      password: "123123",
      users_image: responseGoogle.profileObj.imageUrl,
      role_id: 2,
      phone_Number,
    };
    await axios
      .post(`/user/register`, newUser)
      .then((response) => {
        if (response.data.success) {
          dispatch(login(responseGoogle.tokenId));
          localStorage.setItem("token", responseGoogle.tokenId);

          notifyLoginSuccess();
          navigate("/");
        }
      })
      .catch((err) => {
        if (err.response.data.message == "The email already exists") {
          dispatch(login(responseGoogle.tokenId));
          localStorage.setItem("token", responseGoogle.tokenId);

          notifyLoginSuccess();
          navigate("/");
        }
      });
  };

  return (
    <div className="card1">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginFunction();
        }}
      >
        <h2 className="title"> Log in</h2>

        <div className="email-login">
          <label for="email">
            {" "}
            <b>Email</b>
          </label>

          <input
            className="log-reg"
            type="text"
            placeholder="Enter Email"
            name="uname"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <label for="psw">
            <b>Password</b>
          </label>
          <input
            className="log-reg"
            type="password"
            placeholder="Enter Password"
            name="psw"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            required
          />
        </div>
        <p className="or">
          <span>or</span>
        </p>
        <div className="social-login">
          <GoogleLogin
            className="google-btn"
            clientId="1043914311989-9f4obcf71r469jvfb1jg232d5mlalmbj.apps.googleusercontent.com"
            buttonText="Log In with google"
            onSuccess={responseGoogle}
            // onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          ,
          <button className="fb-btn">
            <img
              alt="FB"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDI5MS4zMTkgMjkxLjMxOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjkxLjMxOSAyOTEuMzE5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojM0I1OTk4OyIgZD0iTTE0NS42NTksMGM4MC40NSwwLDE0NS42Niw2NS4yMTksMTQ1LjY2LDE0NS42NmMwLDgwLjQ1LTY1LjIxLDE0NS42NTktMTQ1LjY2LDE0NS42NTkNCgkJUzAsMjI2LjEwOSwwLDE0NS42NkMwLDY1LjIxOSw2NS4yMSwwLDE0NS42NTksMHoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTE2My4zOTQsMTAwLjI3N2gxOC43NzJ2LTI3LjczaC0yMi4wNjd2MC4xYy0yNi43MzgsMC45NDctMzIuMjE4LDE1Ljk3Ny0zMi43MDEsMzEuNzYzaC0wLjA1NQ0KCQl2MTMuODQ3aC0xOC4yMDd2MjcuMTU2aDE4LjIwN3Y3Mi43OTNoMjcuNDM5di03Mi43OTNoMjIuNDc3bDQuMzQyLTI3LjE1NmgtMjYuODF2LTguMzY2DQoJCUMxNTQuNzkxLDEwNC41NTYsMTU4LjM0MSwxMDAuMjc3LDE2My4zOTQsMTAwLjI3N3oiLz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
            />
          </button>
        </div>
        <button className="cta-btn">Log In</button>

        <p className="subtitle">
          Don't have an account?{" "}
          <Link className="forget-pass" to="/register">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
