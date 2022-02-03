import React,{useState} from 'react'
import { Routes, Route, Link } from "react-router-dom";
import axios from 'axios'
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


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
    
        }
    }
}