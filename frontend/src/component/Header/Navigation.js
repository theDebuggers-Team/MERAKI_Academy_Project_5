import { Link, linkes } from "react-router-dom";
import decode from "jwt-decode";
import { useState } from "react";
import "./Header.css";
import { AiFillHome, AiFillAppstore } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { IoIosCreate } from "react-icons/io";
import { IoCartSharp } from "react-icons/io5";
import { MdLogin, MdLogout } from "react-icons/md";
import { RiLoginBoxFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";

const Navigation = () => {
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });
  
  const token = state.token;
  const role = token && decode(token).role;
  const firstName = token && decode(token).firstName;
  const firstName2 = token && decode(token).given_name;
  const lastName2 = token && decode(token).family_name;
  const googleLogin = token && decode(token);
  console.log(googleLogin);
  
  //////////////////////////

  return (
    <div className="nav">
      <div className="nav-1">
        <Link to="/" className="link">
          {" "}
          <AiFillHome /> Home
        </Link>
        <Link to="/products" className="link">
          <AiFillAppstore /> Products
        </Link>
        <Link to="#" className="link">
          <BiCategoryAlt /> Categories
        </Link>
        {token ? (
          <Link to="/cart" className="link">
            <IoCartSharp /> Favorite
          </Link>
        ) : null}
      </div>
      <div className="nav-2">
        {token ? null : (
          <Link to="/login" className="link">
            <MdLogin /> Login
          </Link>
        )}
        {token ? null : (
          <Link to="/register" className="link">
            <RiLoginBoxFill /> Register
          </Link>
        )}
        {role === "ADMIN" ? (
          <Link to="/create" className="link">
            <IoIosCreate /> Create Product
          </Link>
        ) : null}

        {token ? (
          <Link
            className="link"
            to="/login"
            onClick={() => {
              localStorage.clear();
              role = null;
            }}
          >
            <MdLogout /> Log out
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Navigation;
