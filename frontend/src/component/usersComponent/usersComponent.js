import axios from "axios";
import React, { useState, useEffect } from "react";
import "./usersComponent.css";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const users = () => {
  const [users, setUsers] = useState([]);
  /////////////////////////////
  const getAllUsers = () => {
    axios
      .get(`http://localhost:5000/user`)
      .then((response) => {
        setUsers(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default users;
