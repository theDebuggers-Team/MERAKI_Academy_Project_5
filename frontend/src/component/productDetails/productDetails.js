import axios from "axios";
import React, { useState, useEffect } from "react";
import "./getAllProducts.css";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


toast.configure();
const ProductDetails = ()=>{ 

const [productDetails, setproductDetails] = useState([])
 
const {id} = useParams()

  axios.get(`http://localhost:5000/search_1?id=${id}`).then((response)=>{
    setproductDetails(response.data.results)
  }).catch((err)=>{
    toast.error(err.response.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
  })
   

  const productDetailsToShow = productDetails.map((element)=>{
return (
<div>
 <div className="product-image-description">

</div>
////////////

<div className="product-seller-chat">

</div> 
////////////////
<div className="product-add-comment-rate">

</div>
/////////////////
</div>




)
    

  })




}


export default ProductDetails