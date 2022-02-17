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
    toast.success("Register Done", { position: toast.POSITION.BOTTOM_CENTER });
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
            position: toast.POSITION.BOTTOM_CENTER,
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
    // <div className="register_form1">

    //   <form
    //     onSubmit={(e) => {
    //       e.preventDefault();
    //       user();
    //     }}
    //     className="register_form"
    //   >
    //     <div className="Register-form-div">
    //       <h3 className="title-sign-up">Register</h3>

    //       <input
    //         className="register-inp"
    //         placeholder="First Name"
    //         type="text"
    //         value={firstName}
    //         onChange={(e) => {
    //           setfirstName(e.target.value);
    //         }}
    //         required
    //       />
    //       <br />
    //       <input
    //         className="register-inp"
    //         placeholder="Last Name"
    //         type="text"
    //         value={lastName}
    //         onChange={(e) => {
    //           setlastName(e.target.value);
    //         }}
    //         required
    //       />
    //       <br />
    //       <input
    //         className="register-inp"
    //         placeholder="Age"
    //         type="number"
    //         value={age}
    //         onChange={(e) => {
    //           setAge(e.target.value);
    //         }}
    //         required
    //       />
    //       <br />
    //       <input
    //         className="register-inp"
    //         placeholder="Country"
    //         type="text"
    //         value={country}
    //         onChange={(e) => {
    //           setcountry(e.target.value);
    //         }}
    //         required
    //       />
    //       <br />
    //       <input
    //         className="register-inp"
    //         placeholder="Email"
    //         type="email"
    //         value={email}
    //         onChange={(e) => {
    //           setEmail(e.target.value);
    //         }}
    //         required
    //       />
    //       <br />
    //       <input
    //         className="register-inp"
    //         placeholder="Password"
    //         type="password"
    //         value={password}
    //         onChange={(e) => {
    //           setPassword(e.target.value);
    //         }}
    //         required
    //       />
    //       <br />
    //       <input
    //         className="register-inp"
    //         placeholder="Phone Number"
    //         type="text"
    //         value={phone_Number}
    //         onChange={(e) => {
    //           setphone_number(e.target.value);
    //         }}
    //         required
    //       />
    //       <br />
    //       {/* <input
    //         className="register-inp"
    //         placeholder="Profile Image"
    //         type="text"
    //         value={users_image}
    //         onChange={(e) => {
    //           setusers_Image(e.target.value);
    //         }}
    //         required
    //       /> */}
    //       <abale>Choose Profile Image</abale>
    //       <br />
    //       <Cloudinary setImage={setusers_Image} />

    //       <br />
    //       <br />
    //       <input type="submit" value="Sign Up" className="register_Submit" />
    //       <br />
    //     </div>
    //   </form>
    // </div>
    <div class="card1">
      <form>
        <h2 class="title"> Sign Up</h2>

        <div class="email-login">
          <label for="First Name">
            {" "}
            <b>First Name</b>
          </label>
          <input
            type="text"
            placeholder="Enter First Name"
            name="First Name"
            className="log-reg"
          />
          <label for="Last Name">
            <b>Last Name</b>
          </label>
          <input
            type="text"
            placeholder="Enter Last Name"
            name="Last Name"
            className="log-reg"
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
          />
          <label for="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            className="log-reg"
          />
        </div>

        <button class="cta-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
