import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect } from "react-router-dom";
import "./register.css";
import Cloudinary from "../Cloudinary/Cloudinary";

toast.configure();
const Register = () => {
  const navigate = useNavigate();
  /////// create useState forall register form feilds
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setcountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users_image, setusers_Image] = useState("");

  const [phone_Number, setphone_number] = useState("");

  /// create a notify function to tell the user if any of this felds is empty
  const notifyRegisterError = () => {
    toast.warn("Please fill All The Fields", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const notifyRegisterSuccess = () => {
    toast.success("Register Done", { position: toast.POSITION.TOP_RIGHT });
    navigate("/login");
  };

  const user = async () => {
    if (
      firstName &&
      lastName &&
      age &&
      country &&
      email &&
      password &&
      users_image
    ) {
      const newUser = {
        firstName,
        lastName,
        age,
        country,
        email,
        password,
        users_image,
        role_id: 1,
        phone_Number,
      };

      await axios
        .post(`/user/register`, newUser)
        .then((response) => {
          console.log("hello");
          if (response.data.success) {
            notifyRegisterSuccess();
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } else {
      if (
        !firstName ||
        !lastName ||
        !age ||
        !country ||
        !email ||
        !password ||
        !users_image
      ) {
        notifyRegisterError();
      }
    }
  };

  return (
    <div className="card1">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          user();
        }}
      >
        <h2 className="title"> Sign Up</h2>

        <div className="email-login">
          <label for="First Name">
            {" "}
            <b>First Name</b>
          </label>
          <input
            type="text"
            placeholder="Enter First Name"
            name="First Name"
            className="log-reg"
            required
            value={firstName}
            onChange={(e) => {
              setfirstName(e.target.value);
            }}
          />
          <label for="Last Name">
            <b>Last Name</b>
          </label>
          <input
            type="text"
            placeholder="Enter Last Name"
            name="Last Name"
            className="log-reg"
            value={lastName}
            onChange={(e) => {
              setlastName(e.target.value);
            }}
            required
          />
          <label for="email">
            {" "}
            <b>Email</b>
          </label>

          <input
            className="log-reg"
            type="text"
            placeholder="Enter Email"
            name="uname"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <label for="Age">
            {" "}
            <b>Age</b>
          </label>
          <input
            type="number"
            placeholder="Enter Age"
            name="Age"
            className="log-reg"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
            required
          />
          <label for="Country">
            {" "}
            <b>Country</b>
          </label>
          <input
            type="text"
            placeholder="Enter Country"
            name="Country"
            className="log-reg"
            value={country}
            onChange={(e) => {
              setcountry(e.target.value);
            }}
            required
          />
          <label for="Phone Number">
            {" "}
            <b>Phone Number</b>
          </label>
          <input
            type="text"
            placeholder="Enter Phone Number"
            name="Phone Number"
            className="log-reg"
            value={phone_Number}
            onChange={(e) => {
              setphone_number(e.target.value);
            }}
            required
          />
          <label for="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            className="log-reg"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />

          <label className="image-label">
            <b>Choose Profile Image</b>
          </label>

          <Cloudinary setImage={setusers_Image} />
        </div>

        <button className="cta-btn">Sign Up</button>
        <p className="subtitle">
          Already have an account?{" "}
          <Link className="forget-pass" to="/login">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
