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
  BiMessageDetail,
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
    <div className="foot">
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
          <Link to="/terms" className="about" onClick={scrollTop}>
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
          <div className="cont">
            <Link to="/contactUs" className="about" onClick={scrollTop}>
              <BiMailSend />
              Email Address
            </Link>
            <Link to="/contactUs" onClick={scrollTop}>
              obenSooq@gmail.com
            </Link>
          </div>
          <div className="cont">
            <Link to="#" className="about">
              <BiPhoneCall />
              Phone
            </Link>
            <Link to="/contactUs">+962 7900 000</Link>
          </div>
          <div className="cont">
            <Link to="#" className="about">
              {" "}
              <BiMessageDetail />
              Whatsapp
            </Link>
            <Link to="/contactUs">+962 7900 333</Link>
          </div>
          <div className="cont">
            <Link to="#" className="about">
              <BiHelpCircle />
              Help Center
            </Link>
            <Link to="/contactUs">Help?</Link>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Footer;
