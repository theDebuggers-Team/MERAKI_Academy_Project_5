import axios from "axios";
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setproducts,
  addproduct,
  updateproduct,
  deleteproduct,
  getproductsByState,
} from "../reducer/products/index";
import { BiShowAlt } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

toast.configure();
const GetProductsByCategory = () => {
  const [products, setproducts] = useState([]);

  const { category } = useParams();

  const navigate = useNavigate();

  const getProductsByCategory = () => {
    axios
      .get(`http://localhost:5000/search_2?category=${category}`)
      .then((response) => {
        setproducts(response.data.results);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  useEffect(() => {
    getProductsByCategory();
  }, []);

  const getAllProductsCategories =
    products &&
    products.map((element) => {
      return <div className="single-product-category"></div>;
    });

  return <div className="multi-products-category"></div>;
};

export default GetProductsByCategory;
