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
import {
  BiMailSend,
  BiPhoneCall,
  BiHelpCircle,
  BsWhatsapp,
} from "react-icons/bi";
//BiMailSend,BiPhoneCall,,BiHelpCircle
const Footer = ({ search }) => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  /////////////////////////////////////////////////
  const navigate = useNavigate();
  return (
    <>
      <div className="footer">
        <div className="aboutDev">
          <Link to="/" className="about" onClick={scrollTop}>
            home
          </Link>
          <Link to="/about" className="about" onClick={scrollTop}>
            Electronics
          </Link>
          <Link to="/about" className="about" onClick={scrollTop}>
            Cars
          </Link>
          <Link to="/about" className="about" onClick={scrollTop}>
            Jobs
          </Link>
          <Link to="/about" className="about" onClick={scrollTop}>
            Fashion
          </Link>
          <Link to="/about" className="about" onClick={scrollTop}>
            Real Estate
          </Link>
        </div>
        <div className="aboutDev">
          <Link to="/about" className="about" onClick={scrollTop}>
            About
          </Link>
          <Link to="/about" className="about" onClick={scrollTop}>
            How to use site?
          </Link>
          <Link to="/about" className="about" onClick={scrollTop}>
            Payment Methods
          </Link>
          <Link to="/about" className="about" onClick={scrollTop}>
            Advertising Products
          </Link>
        </div>
        <div className="aboutDev">
          <Link to="/about" className="about" onClick={scrollTop}>
            help
          </Link>
          <Link to="/about" className="about" onClick={scrollTop}>
            Terms Of Use
          </Link>
          <Link to="/about" className="about" onClick={scrollTop}>
            Privacy Policy
          </Link>
          <Link to="/about" className="about" onClick={scrollTop}>
            Safety Tips
          </Link>
        </div>
      </div>
      {/* //////////////////////////////////////////// */}
      <div>
        <div className="contact">
          <div>
            <h4>
              <BiMailSend />
              Email Address
            </h4>
            <p>obenSooq@gmail.com</p>
          </div>
          <div>
            <h4>
              <BiPhoneCall />
              Phone
            </h4>
            <p>+962 7900 000</p>
          </div>
          <div>
            <h4>Whatsapp</h4>
            <p>+962 7900 333</p>
          </div>
          <div>
            <h4>
              <BiHelpCircle />
              Help Center
            </h4>
            <p>Help?</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
