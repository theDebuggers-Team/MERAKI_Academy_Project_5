import axios from "axios";
import React, { useState, useEffect } from "react";
import "./adminPanel.css";
import jwt_decode from "jwt-decode";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Users from "../usersComponent/usersComponent";

const Panel = () => {
  const [usersList, setUsersList] = useState(false);
  const [productList, setProductList] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  return (
    <div>
      <div className="panel">
        <p
          onClick={() => {
            setUsersList(!usersList);
          }}
        >
          Users List
        </p>
        <p
          onClick={() => {
            setProductList(!productList);
          }}
        >
          Products List
        </p>
        <p
          onClick={() => {
            setAddProduct(!addProduct);
          }}
        >
          Add New Product
        </p>
      </div>

      {usersList ? <Users /> : ""}
    </div>
  );
};

export default Panel;
