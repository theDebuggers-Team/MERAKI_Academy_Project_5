import "./UserProfile.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


const UserProfile = () => {
    const navigate = useNavigate()
  const [user, setUser] = useState([]);
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      products: state.productReducer.products,
    };
  });
  const token = state.token;
  const getUserByID = () => {
    axios
      .get(`http://localhost:5000/user/profile`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((result) => {
        setUser(result.data.results);
      });
  };
  const updateUserByID = () => {
    axios
      .put(`http://localhost:5000/user/updateprofile`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
      });
  };
  const deleteUserByID = () => {
    axios
      .put(`http://localhost:5000/user/deleteprofile`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
      });
  };
  const mapOverUsers = user.map((user) => {
    return (
      <div>
        <p>{user.firstName}</p>
        <p>{user.lastName}</p>
        <p>{user.age}</p>
        <p>{user.country}</p>
        <p>{user.email}</p>
        <p>{user.phone_Number}</p>
        <button onClick={(e)=>{
            deleteUserByID()
            navigate("/")
        }}>delete</button>
        <button>update</button>
      </div>
    );
  });

  useEffect(() => {
    getUserByID();
  }, []);
  return (
    <div>
     {mapOverUsers}
    </div>
  );
};

export default UserProfile;
