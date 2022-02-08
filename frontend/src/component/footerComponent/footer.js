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
    <div className="footer">
      <p>About</p>
      <p>How to use site?</p>
      <p>Payment Methods</p>
      <p>Advertising Products</p>
    </div>
  );
};

export default Footer;
