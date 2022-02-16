import "./UserProfile.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../reducer/login/index";
import { BsFacebook, BsTwitter, BsLinkedin } from "react-icons/bs";
import Swal from "sweetalert2";

const UserProfile = () => {

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setcountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users_image, setusers_Image] = useState("");
  const [phone_Number, setphone_number] = useState("");

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
      .put(`http://localhost:5000/user/updateprofile`,{firstName,lastName,age,country,phone_Number}, {
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
        localStorage.clear()
        navigate("/register")
      });
  };
  const mapOverUsers = user.map((user) => {
    return (
      <div className="divContainer">
        <div className="user-image">
          <div className="user-twit">
          <img className="image-user" src={user.users_image} />
          <span className="image-data">
            {user.firstName + " " + user.lastName}
          </span>
          <span className="image-data">{user.email}</span>
          </div>
          <div className="icons-user-prof">
            <BsFacebook className="icon-prof-f" />
            <BsTwitter className="icon-prof-t" />
            <BsLinkedin className="icon-prof-l" />
          </div>
        </div>
        <div className="detailes">
          <div className="personal-detailes">
            <div className="info-div">
              <label className="label-user">First Name</label>

              <input
                type="text"
                Placeholder="First Name"
                defaultValue={user.firstName}
                onChange={(e)=>{
                  setfirstName(e.target.value)
                }}
              />
            </div>
            <div className="info-div">
              <label className="label-user">Last Name</label>

              <input
                type="text"
                Placeholder="Last Name"
                defaultValue={user.lastName}
                onClick={(e) => {
                  setlastName(e.target.value)
                }}
              />
            </div>
            <div className="info-div">
              <label className="label-user">Email</label>

              <input
                type="text"
                Placeholder="Email"
                defaultValue={user.email}
                onChange={(e)=>{
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div className="info-div">
              <label className="label-user">Mobile Phone</label>

              <input
                type="text"
                Placeholder="Mobile Phone"
                defaultValue={user.phone_Number}
                onChange={(e)=>{
                  setphone_number(e.target.value)
                }}
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
                 onChange={(e)=>{
                  setcountry(e.target.value)
                 }}
              />
            </div>
            <div className="info-div">
              <label className="label-user">Age</label>

              <input defaultValue={user.age} type="text" Placeholder="Age" onChange={(e)=>{
                setAge(e.target.value)
              }} />
             
            </div>
          </div>
          <div className="div-btn-user-profile-update">
            <button
              className="btin-prof"
              onClick={(e) => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, update my profile",
                }).then((result) => {
                  if (result.isConfirmed) {
                    updateUserByID();
                    Swal.fire(
                      "Updated!",
                      "Your profile has been updated.",
                      "success"
                    );
                  }
                });
              }}
            >
              Update
            </button>
            <button
            className="btin-prof2"
              onClick={(e) => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete my profile",
                }).then((result) => {
                  if (result.isConfirmed) {
                    deleteUserByID();
                    Swal.fire(
                      "Updated!",
                      "Your profile has been deleted.",
                      "success"
                    );
                  }
                });
              }}
            >Delete</button>
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
  return <div className="container-usr-profile-5">{mapOverUsers}</div>;
};

export default UserProfile;
