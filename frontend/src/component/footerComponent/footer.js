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
    // <>
    // <div className="foot">
    //   <div className="footer">
    //     <div className="aboutDev">
    //       <Link to="/" className="about" onClick={scrollTop}>
    //         home
    //       </Link>
    //       <Link to="/about" className="about" onClick={scrollTop}>
    //         Electronics
    //       </Link>
    //       <Link to="/about" className="about" onClick={scrollTop}>
    //         Cars
    //       </Link>
    //       <Link to="/about" className="about" onClick={scrollTop}>
    //         Jobs
    //       </Link>
    //       <Link to="/about" className="about" onClick={scrollTop}>
    //         Fashion
    //       </Link>
    //       <Link to="/about" className="about" onClick={scrollTop}>
    //         Real Estate
    //       </Link>
    //     </div>
    //     <div className="aboutDev">
    //       <Link to="/about" className="about" onClick={scrollTop}>
    //         About
    //       </Link>
    //       <Link to="/about" className="about" onClick={scrollTop}>
    //         How to use site?
    //       </Link>
    //       <Link to="/about" className="about" onClick={scrollTop}>
    //         Payment Methods
    //       </Link>
    //       <Link to="/about" className="about" onClick={scrollTop}>
    //         Advertising Products
    //       </Link>
    //     </div>
    //     <div className="aboutDev">
    //       <Link to="/about" className="about" onClick={scrollTop}>
    //         help
    //       </Link>
    //       <Link to="/terms" className="about" onClick={scrollTop}>
    //         Terms Of Use
    //       </Link>
    //       <Link to="/about" className="about" onClick={scrollTop}>
    //         Privacy Policy
    //       </Link>
    //       <Link to="/about" className="about" onClick={scrollTop}>
    //         Safety Tips
    //       </Link>
    //     </div>
    //   </div>
    //   {/* //////////////////////////////////////////// */}
    //   <div>
    //     <div className="contact">
    //       <div className="cont">
    //         <Link to="/contactUs" className="about" onClick={scrollTop}>
    //           <BiMailSend />
    //           Email Address
    //         </Link>
    //         <Link to="/contactUs" onClick={scrollTop}>
    //           obenSooq@gmail.com
    //         </Link>
    //       </div>
    //       <div className="cont">
    //         <Link to="#" className="about">
    //           <BiPhoneCall />
    //           Phone
    //         </Link>
    //         <Link to="/contactUs">+962 7900 000</Link>
    //       </div>
    //       <div className="cont">
    //         <Link to="https://wa.me/+962797447936" className="about">
    //           {" "}
    //           <BiMessageDetail />
    //           Whatsapp
    //         </Link>
    //         <Link to="/contactUs">+962 7900 333</Link>
    //       </div>
    //       <div className="cont">
    //         <Link to="#" className="about">
    //           <BiHelpCircle />
    //           Help Center
    //         </Link>
    //         <Link to="/contactUs">Help?</Link>
    //       </div>
    //     </div>
    //   </div>
    //   </div>
    // </>
    // <>

    <footer>
      <div class="footer-content">
        <h3>Open Sooq</h3>
        <p>
          Raj Template is a blog website where you will find great tutorials on
          web design and development. Here each tutorial is beautifully
          described step by step with the required source code.
        </p>
        <ul class="socials">
          <li>
            <Link to="#">
              <i class="fab fa-facebook"></i>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i class="fab fa-twitter"></i>
            </Link>
          </li>
          <li>
            <Link to="contactUs">
              <i class="fab fa-google-plus"></i>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i class="fab fa-youtube"></i>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i class="fab fa-linkedin"></i>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i class="fab fa-whatsapp"></i>
            </Link>
          </li>
        </ul>
      </div>
      <div class="footer-bottom">
        <p>
          copyright &copy; <Link to="#">Foolish Developer</Link>{" "}
        </p>
        <div class="footer-menu">
          <ul class="f-menu">
            <li>
              <Link to="#">Home</Link>
            </li>
            <li>
              <Link to="#">About</Link>
            </li>
            <li>
              <Link to="#">Contact</Link>
            </li>
            <li>
              <Link to="#">Blog</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
