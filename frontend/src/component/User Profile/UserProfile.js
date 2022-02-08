import "./UserProfile.css"
import React from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";


const UserProfile = () => {

const {id} =useParams();

const getUserByID = () =>{
axios.get("http://localhost:5000/user")
}
  return <div></div>;
};

export default UserProfile;
