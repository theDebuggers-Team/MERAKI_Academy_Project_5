import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="admin">
    <img
      className=""
      src="https://static.vecteezy.com/system/resources/previews/003/793/255/non_2x/lost-wireless-connection-or-disconnected-cable-no-wifi-signal-internet-page-not-found-on-display-smartphone-screen-background-illustration-vector.jpg"
      style={{ width: "40%", height: " 40%" }}
    ></img>
    <Link to="/">Go Home</Link>
  </div>
);

export default NotFound;
