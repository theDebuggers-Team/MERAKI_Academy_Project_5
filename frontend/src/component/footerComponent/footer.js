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

  return (
    <>
      <div className="footer">
        <div className="aboutDev">
          <p className="about">home</p>
          <p className="about">Electronics</p>
          <p className="about">Cars</p>
          <p className="about">Jobs</p>
          <p className="about">Fashion</p>
          <p className="about">Real Estate</p>
        </div>
        <div className="aboutDev">
          <p className="about">About</p>
          <p className="about">How to use site?</p>
          <p className="about">Payment Methods</p>
          <p className="about">Advertising Products</p>
        </div>
        <div className="aboutDev">
          <p className="about">help</p>
          <p className="about">Terms Of Use</p>
          <p className="about">Privacy Policy</p>
          <p className="about">Safety Tips</p>
        </div>
      </div>
      <div className="contact">
        <p>
          Copyright © 2022 OpenSooq.com. All rights reserved All right reserved
          to OpenSooq © 2022
        </p>
      </div>
    </>
  );
};

export default Footer;
