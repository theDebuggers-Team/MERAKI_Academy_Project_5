import axios from "axios";
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./productDetails.css";
import ReactStars from "react-rating-stars-component";
import Swal from "sweetalert2";
import ReactImageMagnify from "react-image-magnify";
import { FaEllipsisH } from "react-icons/fa";
import Demo1 from "../Maps/maps";
import Typewriter from "typewriter-effect";

toast.configure();
const ProductDetails = ({ lat, setLat, long, setLong }) => {
  const [isLoading, setIsLoading] = useState(true);
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      products: state.productReducer.products,
    };
  });

  //// decode tokenizer
  const decode = state.token && jwt_decode(state.token);
  console.log(decode);
  const navigate = useNavigate();

  const [productDetails, setproductDetails] = useState([]);
  const [showComment, setshowComment] = useState(false);
  const [commentsOnProduct, setcommentsOnProduct] = useState([]);
  const [createComment, setcreateComment] = useState("");
  const [updatedComment, setupdatedComment] = useState("");
  const [isupdated, setisupdated] = useState(false);
  const [sucesscomment, setsucesscomment] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [usePhone, setusePhone] = useState([]);
  ////////////////////////////////
  const [rating, setRating] = useState(0);
  const token = state.token;
  const { id } = useParams();
  console.log(updatedComment);
  //////////////////////////////
  const getProductById = () => {
    axios
      .get(`/product/search_1?id=${id}`)
      .then((response) => {
        setproductDetails(response.data.results);
        setLat(response.data.results[0].latitude);
        setLong(response.data.results[0].longitude);
        // console.log(response.data.results);
        // console.log(lat);
        // console.log(long);
        // console.log(typeof lat);
        // console.log(typeof long);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err.response && err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  /////////////////////////////
  const getAllComment = () => {
    axios
      .get(`/comment/product/${id}`)
      .then((response) => {
        setcommentsOnProduct(response.data.results);
        console.log(response.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  /////////////////////////////
  //  function for whatsapp.com
  const generateURL = (phone_number) => {
    phone_number = phone_number.slice(1);
    const a = document.getElementById("whats2");
    a.href = "https://wa.me/" + "+962" + `${phone_number}`;
    a.target = "_blank";
  };

  ///// function to create new comment
  const newComment = {
    comment: createComment,

    product_id: id,
  };
  const createNewComment = () => {
    axios
      .post(`/comment/${id}`, newComment, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((result) => {
        toast.success(result.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  //////////////// update comment by id
  const updateCommentById = (commentId) => {
    axios
      .put(
        `/comment/${commentId}`,
        { comment: updatedComment },
        {
          headers: {
            Authorization: `Basic ${state.token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.affectedRows === 1) {
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  //////////// delete Comment by user id
  const deleteComment = (commentId) => {
    axios
      .delete(`/comment/delete_1/${commentId}`, {
        headers: {
          Authorization: `Basic ${state.token}`,
        },
      })
      .then((response) => {
        if (response.data.affectedRows === 1) {
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  //////////// Delete All the user Comment
  const deleteAllMyComments = (MyUserId) => {
    axios
      .delete(`/comment/delete_2/${MyUserId}`, {
        headers: {
          Authorization: `Basic ${state.token}`,
        },
      })
      .then((response) => {
        if (response.data.affectedRows === 1) {
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  /////////////////////add rating functi
  const ratingChanged = (newRating, id) => {
    setRating(newRating);

    axios
      .put(`/like/${id}`, { value: newRating - 0 })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  ////////////////////////////////////////////////////////////
  const addToWishList = () => {
    axios
      .post(
        `/wishlist/add/${id}`,
        {},
        {
          headers: {
            Authorization: `Basic ${state.token}`,
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(err);
      });
  };

  //////////////////////////////////////////

  /////////////////////////

  const deleteProduct = (id) => {
    axios
      .delete(`/product/delete_1/${id}`, {
        headers: {
          Authorization: `Basic ${state.token}`,
        },
      })
      .then((result) => {
        toast.success(result.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //////////////////////////////////////////////
  //set location

  //////////////////////
  useEffect(() => {
    getAllComment();
  }, [sucesscomment]);
  useEffect(() => {
    getProductById();
  }, [rating]);

  // useEffect(() => {
  //   getUserByID()
  // },[])
  ///////////////////////////////
  const allComments = commentsOnProduct.length
    ? commentsOnProduct.map((comment) => {
        return (
          <>
            <ul id="comments-list" class="comments-list">
              <li>
                <div class="comment-main-level">
                  <div class="comment-avatar">
                    <img src={comment.users_image} alt="" />
                  </div>

                  <div class="comment-box">
                    <div class="comment-head">
                      <h6 class="comment-name">
                        {comment.firstName + " " + comment.lastName}
                      </h6>
                      <span>{comment.publish_date}</span>
                      {comment.user_id == decode.userId ? (
                        <i
                          class="fa fa-edit"
                          onClick={(e) => setUpdating(!updating)}
                        ></i>
                      ) : null}
                      {comment.user_id == decode.userId ? (
                        <i
                          class="fa fa-trash"
                          onClick={(e) => {
                            deleteComment(comment.id);
                            setsucesscomment(!sucesscomment);
                          }}
                        ></i>
                      ) : null}
                    </div>
                    <div class="comment-content">
                      {updating ? (
                        <div class="comment-content">
                          <textarea
                            className="comment-body"
                            placeholder="Write Your Commment ..."
                            defaultValue={comment.comment}
                            onChange={(e) => {
                              setupdatedComment(e.target.value);
                            }}
                          />
                          <div class="comment-btns">
                            <button
                              className="btn"
                              onClick={(e) => {
                                updateCommentById(comment.id);
                                setsucesscomment(!sucesscomment);
                              }}
                            >
                              Update
                            </button>
                            <button
                              className="btn"
                              onClick={(e) => {
                                setUpdating(!updating);
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        comment.comment
                      )}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </>
        );
      })
    : null;

  //////////////////////////////////
  const productDetailsToShow =
    productDetails &&
    productDetails.map((element) => {
      return (
        <div className="card-wrapper">
          <div className="card">
            <div className="product-imgs">
              <div className="img-display">
                <div className="img-showcase">
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "Wristwatch by Ted Baker London",
                        isFluidWidth: true,
                        src: element.image,
                        srcSet: [
                          // `${element.image} 687w`,
                          // `${element.image} 770w`,
                          // `${element.image} 861w`,
                          // `${element.image} 955w`,
                        ].join(", "),
                        sizes: "(min-width: 480px) 30vw, 80vw",
                      },
                      largeImage: {
                        alt: "",
                        src: element.image,
                        width: 1000,
                        height: 1800,
                      },
                    }}
                  />
                </div>
              </div>
              <div className="img-select">
                <div className="img-item">
                  <a href="#" data-id="1">
                    <img
                      src={element.image}
                      alt={element.category + " image"}
                      alt="shoe image"
                    />
                  </a>
                </div>
                <div className="img-item">
                  <a href="#" data-id="2">
                    <img
                      src={element.image}
                      alt={element.category + " image"}
                    />
                  </a>
                </div>
                <div className="img-item">
                  <a href="#" data-id="3">
                    <img
                      src={element.image}
                      alt={element.category + " image"}
                    />
                  </a>
                </div>
                <div className="img-item">
                  <a href="#" data-id="4">
                    <img
                      src={element.image}
                      alt={element.category + " image"}
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="product-content">
              <div className="title1">
                <h2 className="product-title">{element.title}</h2>
                <FaEllipsisH />
              </div>

              <div className="product-rating">
                {token ? (
                  <div className="stars">
                    <ReactStars
                      value={element.rating / element.counter / 10}
                      count={5}
                      onChange={(newRate, id) => {
                        ratingChanged(newRate, element.id);
                      }}
                      size={24}
                      half={true}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      color2={"#fbb034"}
                      edit={true}
                    />
                  </div>
                ) : null}
                <span>
                  {Math.floor((element.rating / element.counter) * 10) / 10 ||
                    0}
                  ({element.counter || 0})
                </span>
              </div>

              <div className="product-price">
                <p className="last-price">
                  Old Price: <span>{element.price}</span>
                </p>
                <p className="new-price">
                  New Price:{" "}
                  <span>${element.price - element.price * 0.05} (5%)</span>
                </p>
              </div>

              <div className="product-detail">
                <h2>about this item: </h2>
                <p>{element.description}</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequatur, perferendis eius. Dignissimos, labore suscipit.
                  Unde.
                </p>
                <ul>
                  <li>
                    <i class="fa-solid fa-circle-check"></i>Available:{" "}
                    <span>in stock</span>
                  </li>
                  <li>
                    Category: <span>{element.category}</span>
                  </li>
                  <li>
                    Shipping Area: <span>All over the world</span>
                  </li>
                  <li>
                    Payment Method: <span>Visa or Cash</span>
                  </li>
                </ul>
              </div>

              <div className="purchase-info">
                <button
                  type="button"
                  className="btn"
                  onClick={(e) => {
                    addToWishList();
                  }}
                >
                  Add to favorite
                </button>

                {element.user_id == decode.userId ? (
                  <button
                    type="button"
                    className="btn"
                    onClick={(e) => {
                      navigate(`/update/${id}`);
                    }}
                  >
                    edit
                  </button>
                ) : null}

                {element.user_id == decode.userId ? (
                  <button type="button" className="btn9">
                    {(e) => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, Delete my Product",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteProduct();
                          Swal.fire(
                            "Deleted!",
                            "Your Product has been Deleted.",
                            "success"
                          );
                        }
                      });
                    }}
                    Delete
                  </button>
                ) : null}
                <a id="whats2">
                  <button
                    className="btn"
                    id="whats"
                    onClick={(e) => {
                      generateURL(element.phone_Number);
                    }}
                  >
                    Contact Seller
                  </button>
                </a>
              </div>
              <Link to="/map">see location</Link>
              <div className="social-links">
                <p>Share At: </p>
                <a href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#">
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href="#">
                  <i className="fab fa-pinterest"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    });
  ///////////////////////////////
  return (
    <>
      {isLoading ? (
        <div className="all-loader">
          {" "}
          <div class="loader-container">
            <div class="dot dot-1"></div>
            <div class="dot dot-2"></div>
            <div class="dot dot-3"></div>
            <div class="dot dot-4"></div>
          </div>
        </div>
      ) : (
        <div className="container-all-div">
          {productDetailsToShow
            ? productDetailsToShow
            : "There is No Comments yet"}
          {decode ? (
            <>
              <div className="commentslabel">
                <Typewriter
                  className="Typewriter-com"
                  options={{
                    autoStart: true,
                    loop: true,
                    delay: 50,
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("Comments")

                      .pauseFor(5000)

                      .start();
                  }}
                />
              </div>
              <div class="comments-container">
                {allComments}
                <ul id="comments-list" class="comments-list">
                  <li>
                    {state.token ? (
                      <div class="comment-main-level">
                        <div class="comment-avatar">
                          <img
                            src={
                              (decode && decode.image) ||
                              (decode && decode.picture)
                            }
                            alt=""
                          />
                        </div>

                        <div class="comment-box">
                          <div class="comment-head">
                            <h6 class="comment-name">
                              {decode && decode.firstName
                                ? decode.firstName + " " + decode.lastName
                                : decode.given_name + " " + decode.family_name}
                            </h6>
                          </div>
                          <div class="comment-content">
                            <textarea
                              className="comment-body"
                              placeholder="Write Your Commment ..."
                              onChange={(e) => {
                                setcreateComment(e.target.value);
                              }}
                            />
                            <div class="comment-btns">
                              <button
                                className="btn"
                                onClick={(e) => {
                                  if (!createComment) {
                                    toast.error("No comment written to post", {
                                      position: toast.POSITION.BOTTOM_RIGHT,
                                    });
                                  } else {
                                    createNewComment();
                                    setsucesscomment(!sucesscomment);
                                  }
                                }}
                              >
                                Post
                              </button>
                              <button className="btn">Cancel</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </li>
                </ul>
              </div>
            </>
          ) : null}
        </div>
      )}
    </>
  );
};

export default ProductDetails;
