import React,{useState} from 'react'
import { Routes, Route, Link } from "react-router-dom";
import axios from 'axios'
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

toast.configure()
const Login = ()=>{
  
const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const notifyLoginSuccess = ()=>{
    toast.success("Register Done",{position: toast.POSITION.BOTTOM_CENTER});
      navigation("/products")
  }

  const notifyLoginError = ()=>{
    toast.warn("Please fill All The Fields",{position: toast.POSITION.TOP_RIGHT})
      }
   
      const loginFunction = () => {
        if (email && password) {
          const userLogin = { email, password };
            
          const myUser = axios
        .post(`http://localhost:5000/user/login`, userLogin)
        .then((response) => {
          if (response.data.success) {
           
            localStorage.setItem("token", response.data.token);

            notifyRegisterSuccess()
          }
        })
        .catch((err) => {
          console.log(err.meseage);
          toast.error(err.response.data.message,{position: toast.POSITION.BOTTOM_CENTER})
        });

        }
    }
}