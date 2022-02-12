import axios from "axios";
import React, { useState, useEffect } from "react";
import "./geoLocate.css";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const GeoLocate = ({ lat, setLat, long, setLong }) => {
  if ("geolocation" in navigator) {
    console.log("geolocation available");

    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      //   location = position;
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      console.log(lat);
    });
  } else {
    console.log("geolocation not available");
  }
  return (
    <div>
      <p> Lat: {lat}</p>
      <p> Long: {long}</p>
    </div>
  );
};

export default GeoLocate;
