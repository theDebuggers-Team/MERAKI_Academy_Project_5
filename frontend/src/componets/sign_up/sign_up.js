import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./sign_up.css"

const SignUp = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setcountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allfeild, setallfeild] = useState(false);
  const [notAllfeild, setnotAllfeild] = useState(false);
  const [error, serError] = useState("");
  const [isError, setisError] = useState(false);

  const user = async () => {
    if (firstName && lastName && age && country && email && password) {
      const newUser = {
        firstName,
        lastName,
        age,
        country,
        email,
        password,
        role: "61de02e49962cc6441d170e3",
      };
      await axios
        .post(`http://localhost:5000/signUp`, newUser)
        .then((response) => {
          if (response.data.success) {
            setallfeild(true);
            setnotAllfeild(false);
            
          }
        })
        .catch((err) => {
          console.log(err.message);
          serError(err.response.data.message);
          setisError(true);
          setnotAllfeild(false);
          setallfeild(false);
        });
    } else {
      setnotAllfeild(true);
    }
  };

  return (
    <div>
      <h3 className="title-sign-up">Register</h3>
      <input
      className= "register-inp"
        placeholder="First Name"
        type="text"
        value={firstName}
        onChange={(e) => {
          setfirstName(e.target.value);
        }}
      />
      <br />
      <input
       className= "register-inp"
        placeholder="Last Name"
        type="text"
        value={lastName}
        onChange={(e) => {
          setlastName(e.target.value);
        }}
      />
      <br />
      <input
       className= "register-inp"
        placeholder="Age"
        type="number"
        value={age}
        onChange={(e) => {
          setAge(e.target.value);
        }}
      />
      <br />
      <input
       className= "register-inp"
        placeholder="Country"
        type="text"
        value={country}
        onChange={(e) => {
          setcountry(e.target.value);
        }}
      />
      <br />
      <input
       className= "register-inp"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <input
       className= "register-inp"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <button className="register-btn" onClick={user}>Sign up</button>
      <br />
      {allfeild ? <p>Successfully Signed Up </p> : null}
      {notAllfeild ? <p>Please fill All Feilds</p> : null}
      {isError ? { error } : null}
    </div>
  );
};

export default SignUp;
