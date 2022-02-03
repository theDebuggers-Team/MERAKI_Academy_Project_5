import React,{useState} from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from "react-router-dom";

toast.configure()
const Register = ()=>{ 
    const navigate = useNavigate()
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
        navigate("/login")
      }
      
      const user = async () => {
        if (firstName && lastName && age && country && email && password&&image) {
          const newUser = {
            firstName,
            lastName,
            age,
            country,
            email,
            password,
              image,
            role: "USER",
          };

          await axios
        .post(`http://localhost:5000/user/register`, newUser)
        .then((response) => {
          if (response.data.success) {
               notifyRegisterSuccess()
                   
            
          }
        }).catch((err) => {
            console.log(err.message);
            toast.error(err.response.data.message,{position: toast.POSITION.BOTTOM_CENTER})
          });

    }else {
        if(!firstName || !lastName || !age || !country || !email || !password||!image){
           
             notifyRegisterError()
        }
      }

}
 

return (
    <div>
<form onSubmit = {user}>
      <h3 className="title-sign-up">Register</h3>
         
      <input
      className= "register-inp"
        placeholder="First Name"
        type="text"
        value={firstName}
        onChange={(e) => {
          setfirstName(e.target.value);
        }}
        required
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
        required
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
        required
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
        required
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
        required
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
        required
      />
      <input
      className= "register-inp"
        placeholder="Phone Number"
        type="text"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
        }}
      />
      <br />
<input
      className= "register-inp"
        placeholder="Profile Image"
        type="text"
        value={image}
        onChange={(e) => {
          setImage(e.target.value);
        }}
        required
      />
      <br />
      <br />
      <input type="submit" value="Submit"/>
      <br />
      </form>
    </div>
  );



}





export default Register