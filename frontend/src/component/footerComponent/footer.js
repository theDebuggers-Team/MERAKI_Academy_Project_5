import axios from "axios";
import React, { useState, useEffect } from "react";
import "./footer.css";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { BiShowAlt } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import loginReducer from "../reducer/login";

const Footer = ({ search }) => {
  /////////////////////////////////////////////////
  const navigate = useNavigate();
  return (
    <>
      <div className="footer">
        <div className="aboutDev">
          <Link to="/" className="about">
            home
          </Link>
          <p className="about">Electronics</p>
          <p className="about">Cars</p>
          <p className="about">Jobs</p>
          <p className="about">Fashion</p>
          <p className="about">Real Estate</p>
        </div>
        <div className="aboutDev">
          <Link to="/about" className="about">
            About
          </Link>
          <Link to="/about" className="about">
            How to use site?
          </Link>
          <Link to="/about" className="about">
            Payment Methods
          </Link>
          <Link to="/about" className="about">
            Advertising Products
          </Link>
        </div>
        <div className="aboutDev">
          <p className="about">help</p>
          <p className="about">Terms Of Use</p>
          <p className="about">Privacy Policy</p>
          <p className="about">Safety Tips</p>
        </div>
      </div>
      {/* //////////////////////////////////////////// */}
      <div>
        <div className="contact">
          <div>
            <h4>Email Address</h4>
            <p>obenSooq@gmail.com</p>
          </div>
          <div>
            <h4>Phone</h4>
            <p>+962 7900 000</p>
          </div>
          <div>
            <h4>Whatsapp</h4>
            <p>+962 7900 333</p>
          </div>
          <div>
            <h4>Help Center</h4>
            <p>Help?</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
