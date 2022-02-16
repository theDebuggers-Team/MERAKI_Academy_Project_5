import axios from "axios";
import React, { useState, useEffect } from "react";
import "./adminPanel.css";
import jwt_decode from "jwt-decode";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Users from "../usersComponent/usersComponent";
import ProductsAdmin from "../productsComponent/productsComponent";
import Charts from "../Charts/charts";
import PieRechartComponent from "../Charts/Pchart";

const Panel = () => {
  const [usersList, setUsersList] = useState(true);
  const [productList, setProductList] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  return (
    <div>
      <div className="panel">
        <button
          className="btn"
          onClick={() => {
            setUsersList(true);
            setProductList(false);
            setAddProduct(false);
          }}
        >
          Users List
        </button>
        <button
          className="btn"
          onClick={() => {
            setUsersList(false);
            setProductList(true);
            setAddProduct(false);
          }}
        >
          Products List
        </button>
        <button
          className="btn"
          onClick={() => {
            setUsersList(false);
            setProductList(false);
            setAddProduct(true);
          }}
        >
          Charts
        </button>
      </div>

      {usersList ? <Users /> : ""}
      {productList ? <ProductsAdmin /> : ""}
      {addProduct ? <PieRechartComponent /> : ""}
      {addProduct ? <Charts /> : ""}
    </div>
  );
};

export default Panel;
