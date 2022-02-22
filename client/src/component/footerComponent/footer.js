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
        <h3>
          {" "}
          <span>
            <img
              className="logo150"
              src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/899/6848090899_b19bf8cc-f43d-46ca-8443-eb794500bdcc.png?cb=1645278934"
            />
          </span>
        </h3>
        <p>
          Sooq is the number one Arabic classifieds platform in the Middle
          East with over 2 billion monthly pageviews. We connect buyers and
          sellers in real-time to be able to sell, buy, get a service or a job.
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
            <a href="https://wa.me/+962797447936" target="_blank">
              <i class="fab fa-whatsapp"></i>
            </a>
          </li>
        </ul>
      </div>
      <div class="footer-bottom">
        <p>
          copyright &copy; <Link to="#">Open Sooq</Link>{" "}
        </p>
        <div class="footer-menu">
          <ul class="f-menu">
            <li>
              <Link to="/" onClick={scrollTop}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about">About</Link>
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
