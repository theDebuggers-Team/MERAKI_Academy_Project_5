import "./UserProfile.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../reducer/login/index";
const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [updated, setUpdated] = useState(false);
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
      .delete(`http://localhost:5000/user/deleteprofile`, {
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
      <div className="divContainer">
        <div className="user-image">
          <img className="image-user" src={user.users_image} />
          <span className="image-data">
            {user.firstName + " " + user.lastName}
          </span>
          <span className="image-data">{user.email}</span>
        </div>
        <div className="detailes">
          <div className="personal-detailes">
            <div className="info-div">
              <label className="label-user">First Name</label>

              <input
                type="text"
                Placeholder="First Name"
                defaultValue={user.firstName}
              />
            </div>
            <div className="info-div">
              <label className="label-user">Last Name</label>

              <input
                type="text"
                Placeholder="Last Name"
                defaultValue={user.lastName}
              />
            </div>
            <div className="info-div">
              <label className="label-user">Email</label>

              <input
                type="text"
                Placeholder="Email"
                defaultValue={user.email}
              />
            </div>
            <div className="info-div">
              <label className="label-user">Mobile Phone</label>

              <input
                type="text"
                Placeholder="Mobile Phone"
                defaultValue={user.phone_Number}
              />
            </div>
          </div>

          <div className="Address">
            <div className="info-div">
              <label className="label-user">Country</label>

              <input
                type="text"
                Placeholder="Country"
                defaultValue={user.country}
              />
            </div>
            <div className="info-div">
              <label className="label-user">Mobile Phone</label>

              <input type="text" Placeholder="Mobile Phone" />
            </div>
          </div>
        </div>

        {/* <p>{user.firstName}</p>
        <p>{user.lastName}</p>
        <p>{user.age}</p>
        <p>{user.country}</p>
        <p>{user.email}</p>
        <p>{user.phone_Number}</p>
        <button
          onClick={(e) => {
            deleteUserByID();

            localStorage.clear();
            dispatch(logout());
            navigate("/login");
          }}
        >
          delete
        </button>
        <button>update</button> */}
      </div>
    );
  });

  useEffect(() => {
    getUserByID();
  }, []);
  return <div>{mapOverUsers}</div>;
};

export default UserProfile;
