import React, { useState } from "react";
import Navigation from "./Navigation";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";


import decode from "jwt-decode";
import { BsBag } from "react-icons/bs";





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
      <div className="header">
        <div className="logo">
          <header>
            <h1>
              <span>Open Sooq</span>
            </h1>
          </header>
        </div>
        <div className="search">
          <input
            type="search"
            placeholder="Search here ..."
            className="serach-inp"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {name ? (
            <Link to={`/search/${name}`}>
              {" "}
              <button type="button" className="serach-btn">
                <BsSearch />
              </button>
            </Link>
          ) : (
            <button className="serach-btn">
              <BsSearch />
            </button>
          )}
        </div>
        {token ? (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2%",
              width: "15%",
            }}
          >
            <img
              src="https://www.pngrepo.com/png/384670/512/account-avatar-profile-user.png"
              style={{ width: "10%", height: "10%" }}
            />{" "}
            <p>{firstName ? firstName : firstName2}</p>{" "}
            <p>{lastName ? lastName : lastName2}</p>
          </span>
        ) : null}
      </div>

      <Navigation />
    </div>
  );
};

export default Header;
