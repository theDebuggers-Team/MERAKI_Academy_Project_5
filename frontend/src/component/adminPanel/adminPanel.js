import axios from "axios";
import React, { useState, useEffect } from "react";
import "./adminPanel.css";
import jwt_decode from "jwt-decode";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Users from "../usersComponent/usersComponent";
import ProductsAdmin from "../productsComponent/productsComponent";

const Panel = () => {
  const [usersList, setUsersList] = useState(false);
  const [productList, setProductList] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  return (
    <div>
      <div className="panel">
        <p
          className="adminPanel"
          onClick={() => {
            setUsersList(!usersList);
            setProductList(false);
            setAddProduct(false);
          }}
        >
          Users List
        </p>
        <p
          className="adminPanel"
          onClick={() => {
            setUsersList(false);
            setProductList(!productList);
            setAddProduct(false);
          }}
        >
          Products List
        </p>
        <p
          className="adminPanel"
          onClick={() => {
            setUsersList(false);
            setProductList(false);
            setAddProduct(!addProduct);
          }}
        >
          Add New Product
        </p>
      </div>

      {usersList ? <Users /> : ""}
      {productList ? <ProductsAdmin /> : ""}
    </div>
  );
};

export default Panel;
