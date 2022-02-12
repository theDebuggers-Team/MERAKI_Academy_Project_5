import axios from "axios";
import React, { useState, useEffect } from "react";
import "./usersComponent.css";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const GeoLocate = () => {
  if ("geolocation" in navigator) {
    console.log("geolocation availabCle");
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
    });
  } else {
    console.log("geolocation not available");
  }
};

export default GeoLocate;
