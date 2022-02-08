import axios from "axios";
import React, { useState, useEffect } from "react";
import "./getAllProducts.css";
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



toast.configure();
const WishList = ()=>{ 
const [wishList,setwishList] = useState([])
const [successDelete,setsuccessDelete] = useState(false)

const getMyWishList = ()=>{
    axios.get("http://localhost:5000/wishlist").then((response)=>{
        setwishList(response.data.results)

    }).catch((err)=>{
        toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
    })

}

const deleteProductFromWishList = (id)=>{
    axios.delete(`http://localhost:5000/wishlist/delete/${id}`).then((response)=>{
        toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
    }).catch((err)=>{
        toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
    })
}


useEffect =(()=>{
    getMyWishList()
},[])







}