import "./UserProfile.css";
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const { id } = useParams();

  const getUserByID = () => {
    axios
      .get(`http://localhost:5000/user/${id}`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
      });
  };
  return <div></div>;
};

export default UserProfile;
