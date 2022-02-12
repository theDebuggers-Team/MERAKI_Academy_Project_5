import axios from "axios";
import React, { useState, useEffect } from "react";
import "./geoLocate.css";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const GeoLocate = () => {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  if ("geolocation" in navigator) {
    console.log("geolocation available");

    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      location = position;
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  } else {
    console.log("geolocation not available");
  }
  return <p>{lat}</p>;
};

export default GeoLocate;
