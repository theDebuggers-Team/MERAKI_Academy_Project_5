import axios from "axios";
import React, { useState, useEffect } from "react";
import "./getAllProducts.css";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactStars from "react-rating-stars-component";


toast.configure();
const ProductDetails = ()=>{ 
const navigate = useNavigate();

const [productDetails, setproductDetails] = useState([])
const [showComment,setshowComment] = useState(false)
const [commentsOnProduct,setcommentsOnProduct] =useState([])
 
const {id} = useParams()

  axios.get(`http://localhost:5000/search_1?id=${id}`).then((response)=>{
    setproductDetails(response.data.results)
  }).catch((err)=>{
    toast.error(err.response.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
  })

  axios.get(`http:localhost:5000/comment/product/${id}`).then((response)=>{
    setcommentsOnProduct(response.data.results)
  }).catch((err)=>{
    toast.error(err.response.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
  })
   
  
  const allComments = commentsOnProduct.map((comment)=>{
      return(
         <div className="all-comments">
             <div className="just-one-comment">
             <p>{comment.name}</p>
            <p>{comment.comment}</p>
            <p>{comment.publishedDate}</p>
          </div>
         </div>
      )
  })




  const productDetailsToShow = productDetails.map((element)=>{
return (
<div className= "all-div-componenet">
<div>
 <div className="product-image-description">
     <p>{element.title}</p>
     <br/>
    <img src={element.image}/>
    <br/>
   <p>{element.description}</p>
   <br/>
</div>
////////////
 <div className="container-chating-rate-reviews">
<div className="product-seller-chat">
  <img src="https://media.istockphoto.com/photos/live-chat-social-media-communication-message-picture-id691388370"/>
  <br/>
  <button onClick={(e)=>{
    //   navigate("/chat")
  }}></button>
  <br/>
</div> 
////////////////
<div className="product-add-comment-rate">
    <ReactStars
    size= {26}
    count= {5}
    color= "black"
    activeColor= "red"
    value= {7.5}
    a11y= {true}
    isHalf= {true}
    emptyIcon= {<i className="far fa-star" />}
    halfIcon={<i className="fa fa-star-half-alt" />}
    filledIcon={<i className="fa fa-star" />}
    onChange= {newValue => {
      console.log(`Example 2: new value is ${newValue}`);
    }}
    />
    <br/>

    <button onClick={
       setshowComment(!showComment)
    }>Show reviews</button>

</div>
</div>
/////////////////

</div>

<div className="all-comment-div">

{ showComment? <div className="comment-reviews">
{allComments? allComments:toast.warn("No comment on this product", {
        position: toast.POSITION.BOTTOM_RIGHT,
      })}

</div>:null}

</div>

</div>


)
    
})




}


export default ProductDetails