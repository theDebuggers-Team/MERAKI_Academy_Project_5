import axios from "axios";
import React, { useState,useParams } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./ProductDetais.css";
import { MdDeleteForever, MdSystemUpdateAlt } from "react-icons/md";
import {
  BsFillSkipBackwardCircleFill,
  BsPlusCircleFill,
  BsPersonCircle,
  BsFillCartFill,
} from "react-icons/bs";
import { AiOutlineMinusCircle, AiFillMinusCircle } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import Swal from 'sweetalert2'

///// product details is a component to see all product details.
const ProductsDetails = ({
  productsDetails,
  cartItems,
  setcartItems,
  token,
  setproductsDetails,
}) => {
  ///// set state to save the array fron getelemtnbyId
  const [getElementByid,setgetElementByid] = useState([])
  const navigation = useNavigate();
  const [deletedMessage, setdeletedMessage] = useState("");
  const [isDeleted, setisDeleted] = useState(false);
  const [notdeleteMessage, setnotdeleteMessage] = useState("");
  const [notDelet, setnotDelet] = useState(false);
  const [counter, setcounter] = useState(1);
  const [customerComment, setcustomerComment] = useState("");
  const [commentRespondMessage, setcommentRespondMessage] = useState("");
  const [isCommentCreatedOnProduct, setisCommentCreatedOnProduct] =
    useState(false);
  const [errWhenCreateComment, seterrWhenCreateComment] = useState("");
  const [iserrWhenCreateComment, setiserrWhenCreateComment] = useState(false);
  //// the below to render the component
  const [torender, istorender] = useState("");
  const role = token && jwtDecode(token).role._id;

  ////create delete product by id for admin
  const deletElementById = async (id) => {
    console.log(id);
    await axios
      .delete(`http://localhost:5000/product/delete/${id}`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((response) => {
        setdeletedMessage(response.data.message);
        setisDeleted(true);
        setnotDelet(false);
      })
      .catch((err) => {
        setnotdeleteMessage(err.response.data.message);
        setisDeleted(false);
        setnotDelet(true);
      });
  };
  /////////////////////////////
  /// curcit to check the token
  const token2 = token && jwtDecode(token);
  // function to add comment to product
  const addComment = (id) => {
    // console.log(token);
    // console.log(token2.userId);
    axios
      .post(
        `http://localhost:5000/comment/${id}/create`,
        { comment: customerComment, commenter: token2.userId },
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.comment);
        // setproductsDetails([response.data.comment])
        setcommentRespondMessage(response.data.message);
        setisCommentCreatedOnProduct(true);
        setiserrWhenCreateComment(false);
        console.log(response.data);
      })
      .catch((err) => {
        seterrWhenCreateComment(err.response.data.message);
        setiserrWhenCreateComment(true);
        console.log(err.response.data.message);
      });
  };
 
  // let {id} = useParams()

  // const getElementById = (id)=>{
  //   axios.get(`http://localhost:5000/product/${id}`).then((response)=>{
  //     setgetElementByid(response.data)
  //   })
  // }


  const myProductDetails = JSON.parse(localStorage.getItem("ProductsDetails"));
  console.log(myProductDetails);
  ////////////////////////////
  const productInPage =
    myProductDetails &&
    myProductDetails.map((element) => {
      return (
        <div className="Product-d">
          <div className="image-desc-addcart-amount-price">
            <div className="image-det">
              {" "}
              <img src={element.image} className="img-dita" />
            </div>
            {/* div for title&description & amount&add to cart And price */}
            <div className="contain-discrdiv-rolebtn">
              <div className="Product-details2">
                <div>
                  <p className="Parg-title">{element.title}</p>
                </div>
                <div>
                  {" "}
                  <p>| description :{element.description}</p>
                </div>
                <div>
                  {" "}
                  <p>| Price:{element.price}</p>
                </div>
                {/* <div> <p>| amount :{element.amount}</p></div> */}
                <div className="plus-minus-coun-addcart">
                  <div className="cart-buttons">
                    <button
                      className="counter-btn"
                      onClick={(e) => {
                        setcounter(counter + 1);
                      }}
                    >
                      <BsPlusCircleFill className="plus-icon" />
                    </button>{" "}
                    <br />
                    <p>{counter}</p>
                    <br />
                    <button
                      className="counter-btn"
                      onClick={(e) => {
                        setcounter(counter - 1);
                      }}
                    >
                      <AiFillMinusCircle />
                    </button>
                    <br />
                  </div>
                  {/* <p>| amount :{element.amount}</p> */}
                  {token && (
                    <button
                      className="button-27"
                      // className="detaild-prod2"
                      onClick={(e) => {
                        // setcartItems([
                        //   ...cartItems,
                        //   { ...element, number: counter },
                        // ]);
                        const valid = localStorage.getItem("cartItem");
                        // console.log(valid);
                        if (valid) {
                          
                          if(valid.length) {

                            const cartItems = JSON.parse(localStorage.getItem("cartItem"))
                          localStorage.setItem(
                            "cartItem",
                            JSON.stringify([
                              ...cartItems,
                              { ...element, number: counter },
                            ])
                          );
                          }
                          //  else {
                          //   localStorage.setItem(
                          //     "cartItem",
                          //     JSON.stringify([{ ...element, number: counter }])
                          //   );
                          // }

                          
                          // localStorage.setItem("cartItem",JSON.stringify([]))
                          // const cartItems = JSON.parse(localStorage.getItem("cartItem"))
                          // localStorage.setItem(
                          //   "cartItem",
                          //   JSON.stringify([
                          //     ...cartItems,
                          //     { ...element, number: counter },
                          //   ])
                          // );
                        } else {
                          localStorage.setItem(
                            "cartItem",
                            JSON.stringify([{ ...element, number: counter }])
                          );
                        }
                        //  else {
                        //   localStorage.setItem(
                        //     "cartItem",
                        //     JSON.stringify([{ ...element, number: counter }])
                        //   );
                        // }
                           
                        
                    
                      }}
                    >
                      {" "}
                      <BsFillCartFill /> Add To Cart
                    </button>
                  )}
                  <br />
                </div>
              </div>
              {/* rolebutton div */}
              <div className="role-btn">
                {role == "61ddebb3ef155e84c29ac337" ? (
                  <>
                    <button
                      className="detaild-prod1"
                      onClick={(e) => {
                        navigation("/updateProduct");
                        //// update button
                      }}
                    >
                      {" "}
                      <MdSystemUpdateAlt className="update-icon" />
                    </button>
                    <br></br>
                    <button
                      className="detaild-prod1"
                      onClick={(e) => {
                        Swal.fire({
                          title: 'Are you sure Admin?',
                          text: "You won't be able to revert this!",
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#82B440',
                          cancelButtonColor: '#262626',
                          confirmButtonText: 'Yes delete it!'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            
                            Swal.fire(
                              'Deleted',
                              'The product is deleted',
                              'success'
                            )
                            deletElementById(element._id);
                          }
                        })

                       
                        // delete button
                      }}
                    >
                      <MdDeleteForever className="delete-icon" />
                    </button>
                    <br />
                  </>
                ) : null}
                <br />
                <button
                  className="detaild-prod1"
                  onClick={(e) => {
                    navigation("/products");
                    //// bakc button
                  }}
                >
                  <BsFillSkipBackwardCircleFill className="backe-icon" />
                </button>
                <br />
              </div>
              {/* rolebutton div */}
            </div>
          </div>
          {/* div for title&description & amount&add to cart And price */}
          <span className="comment-above-div-comments">Comments</span>
          <div className="container-coment-addcoment">
            {/* div for all comments */}

            <div className="coment-div">
              <div className="all-comments">
                {" "}
                { token && <div className="addnew-Comment1">
                  <input
                    type="text"
                    name=""
                    placeholder="add comment here"
                    className="btn-addCom"
                    onChange={(e) => {
                      setcustomerComment(e.target.value);
                    }}
                  />
                  <button
                    className="detaild-prod"
                    onClick={(e) => {
                      istorender(element);
                      addComment(element._id);
                      
                    }}
                  >
                    add comment
                  </button>
                </div>}
                <br />
                <div className="myAll-comment">
                  {
                    element.comments.length
                      ? element.comments.map((element) => {
                          console.log(element);
                          return (
                            <div className="Comments3">
                              {/* | Commenter Name:{" "} */}
                              <p>
                                <BsPersonCircle />
                                {/* | Commenter Name:{" "} */}
                                {element.commenter
                                  ? element.commenter.firstName
                                  : null}
                              </p>

                              {/* | Comment:{" "} */}
                              <p>
                                Comment:{" "}
                                {element.comment ? element.comment : null}
                              </p>

                              {/* <div>
                        | Populated on: <p>{ element.createdAt ? element.createdAt :null}</p>
                      </div>
                      <div>
                        | Updated on : <p>{element.updatedAt ? element.updatedAt :null}</p>
                      </div> */}
                              <br />
                            </div>
                          );
                        })
                      : null // <p>| Comments: No comments on this product</p>
                  }
                </div>
              </div>
              {/* <div className="addnew-Comment1">
              <input type="text" name="" placeholder="add comment here" className="btn-addCom" onChange={(e)=>{
                  setcustomerComment(e.target.value)
              }}/>
              <button className="detaild-prod" onClick={(e)=>{
               
                
                   addComment(element._id) 
              }}>add comment</button>
              </div> */}
            </div>
            {/* div for all comments */}
            {/* <p> | Populated on: {element.createdAt}</p>
            <p>| Updated on{element.updatedAt}</p> */}
            <br />
            {/* {token &&
            <button
            className="detaild-prod"
              onClick={(e) => {
                setcartItems([...cartItems, {...element,number:counter}]);
                localStorage.setItem("cartItem", JSON.stringify([...cartItems, {...element,number:counter}]))
              }}
            >
              {" "}
              Add To Cart
            </button>}<br/> */}

            {/* deelet and update div */}
            {/* <div className="role-btn">
           {role == "61ddebb3ef155e84c29ac337" ? <><button className="detaild-prod1" onClick={(e)=>{
                navigation("/updateProduct")
            }}>Update Product Details</button><br>
            </br>
            <button className="detaild-prod1" onClick={(e)=>{
                
                deletElementById(element._id)

            }}>Delete Product</button><br/></>:null}
              <br/>
              <button className="detaild-prod1" onClick={(e)=>{
                navigation("/products")
            }}>Back product page</button>
              </div> */}
            {/* deelet and update div */}
            {/* comment div */}
            {/* <div className="addnew-Comment">
              <input type="text" name="" placeholder="add comment here" onChange={(e)=>{
                  setcustomerComment(e.target.value)
              }}/>
              <button className="detaild-prod" onClick={(e)=>{
               
                
                   addComment(element._id) 
              }}>add comment</button>
              </div> */}
            {/* comment div */}
            {/* <button className="detaild-prod" onClick={(e)=>{
                navigation("/products")
            }}>Back product page</button> */}
            {isDeleted ? deletedMessage : null}
            {notDelet ? notdeleteMessage : null}
            {isCommentCreatedOnProduct ? commentRespondMessage : null}
            {iserrWhenCreateComment ? errWhenCreateComment : null}
          </div>
        </div>
      );
    });

  return <div>{productInPage ? productInPage : null}</div>;
};

export default ProductsDetails;
