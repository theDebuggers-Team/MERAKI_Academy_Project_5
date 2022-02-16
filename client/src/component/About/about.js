import axios from "axios";
import React, { useState, useEffect } from "react";
import "./about.css";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const About = () => {
 
  return (
    <div className="aboutUs">
      <h3 >About Us</h3>
      <h2>Open Sooq</h2>
      <p>
        OpenSooq is the number one Arabic classifieds platform in the Middle
        East with over 2 billion monthly pageviews. We connect buyers and
        sellers in real-time to be able to sell, buy, get a service or a job.
      </p>
      <br></br>
      <p>
        OpenSooq has over 160 team members and is entrusted by over 45 million
        unique people and businesses trading on our platform to sell over USD 25
        billion worth of items annually and excluding the value of job openings
        and services being filled.
      </p>
      <br></br>
      <p>
        We make the process of buying or selling substantially easier and faster
        than the norm, as the platform is built to be safe and accessible to
        everyone, whether you are a company or an individual.
      </p>
      <br></br>
      <p>
        OpenSooq has become the Arab users first online marketplace choice in
        the MENA region while operating in 19 different countries including
        Jordan, Saudi Arabia, United Arab Emirates, Kuwait, Iraq, Oman, Egypt,
        Bahrain, Syria, Lebanon, Libya, Sudan, Yemen, Qatar, Palestine, Algeria,
        Morocco, Mauretania, and Tunis.
      </p>
    </div>
  );
};

export default About;
