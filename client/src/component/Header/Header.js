import React, { useState } from "react";
import Navigation from "./Navigation";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { IoPersonSharp } from "react-icons/io5";

import decode from "jwt-decode";
import { BsBag } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";

import jwtDecode from "jwt-decode";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";

const Header = ({ setSearch }) => {
  const [clickUser, setClickUser] = useState(false);
  const handleClickUser = () => {
    setClickUser(!clickUser);
  };
  const categoriesarr = [
    {
      name: "Cars",
    },
    {
      name: "Electronics",
    },
    {
      name: "Jobs",
    },
    {
      name: "Real Estates",
    },
    {
      name: "Fashoins",
    },
    {
      name: "Job Seeker",
    },
  ];
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });

  const token = state.token;

  // const [search, setSearch] = useState("");
  const lastName = token && decode(token).lastName;
  const firstName = token && decode(token).firstName;
  const firstName2 = token && decode(token).given_name;
  const lastName2 = token && decode(token).family_name;
  const role = token && decode(token).role;

  return (
    <div className="main-header">
      <div className="header1">
        <div className="logo1">
          <div>
            <h1>
              <span><img className="logo150" src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/899/6848090899_b19bf8cc-f43d-46ca-8443-eb794500bdcc.png?cb=1645278934"/></span>
           </h1>
          </div>
        </div>
        <div className="container">
          <div className="box">
            <div className="search-bar">
              <form
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <input
                  type="text"
                  placeholder="Search here ..."
                  className="searchTerm"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />

                <button type="button" className="searchButton">
                  <BsSearch />
                </button>
              </form>
            </div>
          </div>
        </div>

        {token ? (
          <div className="dropdown-user">
            <span
              className="user-button"
              style={{
                display: "flex",
                alignItems: "center",

                fontSize: "1.1rem",
              }}
              onClick={handleClickUser}
            >
              <IoPersonSharp />
              <p>{firstName ? firstName : firstName2}</p>{" "}
              <p>{lastName ? lastName : lastName2}</p>
              <IoMdArrowDropdown />
            </span>
            {clickUser ? (
              <div className="dropdown-menu1-user ">
                <span className="user-list">
                  <Link to="/profile" className="link-user">
                    <FaRegUser /> Profile
                  </Link>
                </span>
                {role == 1 ? (
                  <span className="user-list">
                    <Link to="/panel" className="link-user">
                      <MdOutlineAdminPanelSettings /> Admin panel
                    </Link>
                  </span>
                ) : null}
                {state.isLoggedIn ? (
                  <span className="user-list">
                    <Link
                   
                      className="link-user"
                      to="/login"
                      onClick={() => {
                        localStorage.clear();
                        role = null;
                      }}
                    >
                      <AiOutlineLogout /> Logout
                    </Link>
                  </span>
                ) : (
                  <span className="user-list">
                    <Link to="#" className="link-user">
                      Login
                    </Link>
                  </span>
                )}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <Navigation />
    </div>
  );
};

export default Header;
