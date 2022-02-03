import React,{useState} from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

toast.configure()
const Register = ()=>{ 
   const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [age, setAge] = useState(0);
    const [country, setcountry] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   const [image, setImage] = useState("");
    const [phone, setPhone] = useState("");

    const notifyRegisterError = ()=>{
        toast.warn("Please fill All The Fields",{position: toast.POSITION.TOP_RIGHT})
      }


}





export default Register