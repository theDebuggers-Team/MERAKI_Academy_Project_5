import axios from "axios";
import React, { useState, useEffect } from "react";
import "./adminPanel.css";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Panel = () => {
  return (
    <div>
      <div className="panel">
        <p>Users List</p>
        <p>Products List</p>
        <p>Add New Product</p>
      </div>
    </div>
  );
};

export default Panel;
