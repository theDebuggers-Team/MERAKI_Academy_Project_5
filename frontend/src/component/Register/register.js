import React,{useState} from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

toast.configure()
const Register = ()=>{ 

    /////// create useState forall register form feilds
   const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [age, setAge] = useState(0);
    const [country, setcountry] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   const [image, setImage] = useState("");
    const [phone, setPhone] = useState("");


///// create a notify function to tell the user if any of this felds is empty
    const notifyRegisterError = ()=>{
        toast.warn("Please fill All The Fields",{position: toast.POSITION.TOP_RIGHT})
      }
 
      const notifyRegisterSuccess = ()=>{
        toast.success("Register Done",{position: toast.POSITION.BOTTOM_CENTER})
          navigation("/login")
      }

}





export default Register