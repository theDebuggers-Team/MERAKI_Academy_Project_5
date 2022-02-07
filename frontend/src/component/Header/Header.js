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

const Header = () => {
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });

  const [name, setName] = useState("");

  const token = state.token;

  const lastName = token && decode(token).lastName;
  const firstName = token && decode(token).firstName;
  const firstName2 = token && decode(token).given_name;
  const lastName2 = token && decode(token).family_name;

  // console.log(firstName2);
  return (
    <div className="main-header">
      <div className="header1">
        <div className="logo1">
          <header>
            <h1>
              <span>Open Sooq</span>
            </h1>
          </header>
        </div>
        {/* <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Search here ..."
            className="searchTerm"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {name ? (
            <Link to={`/search/${name}`}>
              {" "}
              <button type="button" className="searchButton">
                <BsSearch />
              </button>
            </Link>
          ) : (
            <button className="searchButton">
              <BsSearch />
            </button>
          )}
        </div>
        </div> */}
        {token ? (
          <div className="dropdown">
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2%",
                // width: "16%",
                fontSize: "1.1rem",
              }}
            >
              {/* <img
              src="https://www.pngrepo.com/png/384670/512/account-avatar-profile-user.png"
              style={{ width: "10%", height: "10%" }}
            />{" "} */}
              <IoPersonSharp />
              <p>{firstName ? firstName : firstName2}</p>{" "}
              <p>{lastName ? lastName : lastName2}</p>
              <IoMdArrowDropdown />
            </span>
            <div className="dropdown-menu"></div>
          </div>
        ) : null}
      </div>

      <Navigation />
    </div>
  );
};

export default Header;
