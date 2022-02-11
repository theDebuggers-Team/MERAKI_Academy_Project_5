import axios from "axios";
import React, { useState, useEffect } from "react";
import "./terms.css";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Terms = () => {
  return (
    <div className="aboutUs">
      <h3>Term Of Use</h3>
      <h2>WELCOME TO OPENSOOQ!</h2>
      <p>
        OpenSooq.com Limited (“OpenSooq”) is a leading classifieds platform that
        offers sellers the opportunity to list products and services under a
        number of categories, and the opportunity for buyers to browse, search
        for, and contact sellers to buy the listed products or services.
      </p>
      <br></br>
      <p>
        These Terms of Use provide you with information about the terms upon
        which we agree to provide, permit and allow you to access and use the
        Platforms. Please print a copy of these Terms of Use and refer to it as
        you use our Platforms and Services. You agree to be bound by these Terms
        of Use if you continue using the Platforms. If you do not agree to these
        Terms of Use, you must immediately refrain from using the Platforms and
        the Services.
      </p>
      <br></br>
      <p>
        We may make changes and/or updates and/or modifications partially and/or
        fully to the Terms of Use anytime. IF ANY FUTURE CHANGES AND/OR UPDATES
        AND/OR MODIFICATIONS ARE UNACCEPTABLE TO YOU, YOU SHOULD DISCONTINUE
        USING THE PLATFORMS AND SERVICES. YOUR CONTINUED USE OF THE PLATFORMS
        AND SERVICES NOW OR FOLLOWING THE POSTING OF ANY SUCH CHANGES AND/OR
        UPDATES AND/OR MODIFICATIONS WILL INDICATE YOUR ACCEPTANCE OF THESE
        TERMS AND ANY CHANGES AND/OR UPDATES AND/OR MODIFICATIONS MADE THERETO.
      </p>
      <br></br>
      <p>
        1.1 The Platform and the Service are provided to you subject to these
        Terms of Use (referred to herein as the "Terms"). By accessing the
        Platform or using the Service, you agree that you have read, understood
        and agree to be bound by these Terms and the Privacy Policy. For the
        purpose of the Terms and wherever the context so requires, the terms
        “you” and “your” shall mean any person who uses the Platform or the
        Service in any manner whatsoever including without limitation to persons
        browsing or/and searching the Platform and its content, posting
        comments, chatting or any content or responding to any listing or
        content on the Platform.
      </p>
      <br></br>
      <p>
        1.1 The Platform and the Service are provided to you subject to these
        Terms of Use (referred to herein as the "Terms"). By accessing the
        Platform or using the Service, you agree that you have read, understood
        and agree to be bound by these Terms and the Privacy Policy. For the
        purpose of the Terms and wherever the context so requires, the terms
        “you” and “your” shall mean any person who uses the Platform or the
        Service in any manner whatsoever including without limitation to persons
        browsing or/and searching the Platform and its content, posting
        comments, chatting or any content or responding to any listing or
        content on the Platform.
      </p>
      <br></br>
      <p>
        1.1 The Platform and the Service are provided to you subject to these
        Terms of Use (referred to herein as the "Terms"). By accessing the
        Platform or using the Service, you agree that you have read, understood
        and agree to be bound by these Terms and the Privacy Policy. For the
        purpose of the Terms and wherever the context so requires, the terms
        “you” and “your” shall mean any person who uses the Platform or the
        Service in any manner whatsoever including without limitation to persons
        browsing or/and searching the Platform and its content, posting
        comments, chatting or any content or responding to any listing or
        content on the Platform.
      </p>
    </div>
  );
};

export default Terms;
