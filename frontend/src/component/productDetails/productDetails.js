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
toast.configure();
const ProductDetails = () => {
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      products: state.productReducer.products,
    };
  });

  //// decode tokenizer
  const decode = state.token && jwt_decode(state.token);
  const navigate = useNavigate();

  const [productDetails, setproductDetails] = useState([]);
  const [showComment, setshowComment] = useState(false);
  const [commentsOnProduct, setcommentsOnProduct] = useState([]);
  const [createComment, setcreateComment] = useState("");
  const [updatedComment, setupdatedComment] = useState("");
  const [isupdated, setisupdated] = useState(false);
  const [sucesscomment, setsucesscomment] = useState(false);
  ////////////////////////////////
  const [rating, setRating] = useState(0);
  console.log(rating);
  const token = state.token;
  const { id } = useParams();
  console.log(updatedComment);
  // console.log(decode);
  //////////////////////////////
  const getProductById = () => {
    axios
      .get(`http://localhost:5000/product/search_1?id=${id}`)
      .then((response) => {
        setproductDetails(response.data.results);
        console.log(response.data.results);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
  /////////////////////////////
  const getAllComment = () => {
    axios
      .get(`http://localhost:5000/comment/product/${id}`)
      .then((response) => {
        setcommentsOnProduct(response.data.results);
        console.log(response.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  ///// function to create new comment
  const newComment = {
    comment: createComment,

    product_id: id,
  };
  const createNewComment = () => {
    axios
      .post(`http://localhost:5000/comment/${id}`, newComment, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((result) => {
        toast.success(result.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
  //////////////// update comment by id
  const updateCommentById = (commentId) => {
    axios
      .put(
        `http://localhost:5000/comment/${commentId}`,
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
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        } else {
          toast.error(response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  //////////// delete Comment by user id
  const deleteComment = (commentId) => {
    axios
      .delete(`http://localhost:5000/comment/delete_1/${commentId}`, {
        headers: {
          Authorization: `Basic ${state.token}`,
        },
      })
      .then((response) => {
        if (response.data.affectedRows === 1) {
          toast.success(response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        } else {
          toast.error(response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  //////////// Delete All the user Comment
  const deleteAllMyComments = (MyUserId) => {
    axios
      .delete(`http://localhost:5000/comment/delete_2/${MyUserId}`, {
        headers: {
          Authorization: `Basic ${state.token}`,
        },
      })
      .then((response) => {
        if (response.data.affectedRows === 1) {
          toast.success(response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        } else {
          toast.error(response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
  /////////////////////add rating functi
  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating);
  };

  const addLike = (id) => {
    axios
      .put(`http://localhost:5000/like/${id}`, { value: rating - 0 })
      .then((result) => {
        console.log(result.message);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //////////////////////////////////////////
  useEffect(() => {
    getAllComment();
  }, [sucesscomment]);
  useEffect(() => {
    getProductById();
  }, []);
  ///////////////////////////////
  const allComments = commentsOnProduct.length
    ? commentsOnProduct.map((comment) => {
        return <div></div>;
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
              <div className="title">
                <h2 className="product-title">{element.title}</h2>
                <FaEllipsisH />
              </div>

              <div className="product-rating">
                {token ? (
                  <div className="stars">
                    <ReactStars
                      count={5}
                      onChange={ratingChanged}
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
                  {element.rating || 0}({element.counter || 0})
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
                <button type="button" className="btn">
                  Add to favorite
                </button>
                <button type="button" className="btn">
                  edit
                </button>
                <button type="button" className="btn">
                  delete
                </button>
              </div>

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
      <div className="container-all-div">
        {productDetailsToShow
          ? productDetailsToShow
          : "There is No Comments yet"}
        {allComments}
      </div>
    </>
  );
};

export default ProductDetails;
