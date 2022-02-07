import axios from "axios";
import React, { useState, useEffect } from "react";
// import "./getAllProducts.css";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ReactStars from "react-rating-stars-component";

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
  /////////////////////
  useEffect(() => {
    
    getAllComment();
  }, [sucesscomment]);
  useEffect(() => {
    getProductById();
  }, []);
  ///////////////////////////////
  const allComments =
    commentsOnProduct &&
    commentsOnProduct.map((comment) => {
      return (
        <div className="all-comments" key={comment.id}>
          <div className="just-one-comment" >
            <p>{comment.firstName}</p>
            <p>{comment.comment}</p>

            {isupdated ? (
              <div>
                <textarea
                  className="update-comment-inp"
                  onChange={(e) => {
                    setupdatedComment(e.target.value);
                  }}
                />{" "}
                <br />
                <button
                  onClick={(e) => {
                    updateCommentById(comment.id);
                    setisupdated(!isupdated);
                    setsucesscomment(!sucesscomment);
                  }}
                >
                  update comment
                </button>
              </div>
            ) : null}
            <p>{comment.publish_date}</p>

            {decode.userId == comment.user_id ? (
              <div>
                <button
                  onClick={(e) => {
                    setisupdated(!isupdated);
                  }}
                >
                  Modify comment
                </button>
                <button
                  onClick={(e) => {
                    deleteComment(comment.id);
                    setsucesscomment(!sucesscomment);
                  }}
                >
                  Delete Comment
                </button>
              </div>
            ) : null}
          </div>

          <button
            className="btn-to-delete-all-my-comment"
            onClick={(e) => {
              deleteAllMyComments(comment.user_id);

              setsucesscomment(!sucesscomment);
            }}
          >
            Delete All Comment
          </button>
        </div>
      );
    });

  //////////////////////////////////
  const productDetailsToShow =
    productDetails &&
    productDetails.map((element) => {
      return (
        <div className="all-div-componenet" key={element.id}>
          <div>
            <div className="product-image-description">
              <p>{element.title}</p>
              <br />
              <img src={element.image} />
              <br />
              <p>{element.description}</p>
              <br />
            </div>

            <div className="container-chating-rate-reviews">
              <div className="product-seller-chat">
                <br />
                <button
                  onClick={(e) => {
                    //   navigate("/chat")
                  }}
                ></button>
                <br />
              </div>

              <div className="product-add-comment-rate">
                {/* {state.token ? (
                  <ReactStars
                    size={26}
                    count={5}
                    color="black"
                    activeColor="red"
                    value={7.5}
                    a11y={true}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star" />}
                    halfIcon={<i className="fa fa-star-half-alt" />}
                    filledIcon={<i className="fa fa-star" />}
                    onChange={(newValue) => {
                      console.log(`Example 2: new value is ${newValue}`);
                    }}
                  />
                ) : null} */}
                <br />

                <button
                  onClick={(e) => {
                    // getAllComment();
                    setshowComment(!showComment);
                  }}
                >
                  Show reviews
                </button>
              </div>
            </div>
          </div>

          <div className="all-comment-div">
            {showComment ? (
              <div className="comment-reviews">
                {allComments
                  ? allComments
                  : toast.warn("No comment on this product", {
                      position: toast.POSITION.BOTTOM_RIGHT,
                    })}

                {state.token ? (
                  <div>
                    <textarea
                      onChange={(e) => {
                        setcreateComment(e.target.value);
                      }}
                      className="text-area-comment"
                    />
                    <br />
                    <button
                      className="btn-to-create-comment"
                      onClick={(e) => {
                        createNewComment();
                        setsucesscomment(!sucesscomment);
                      }}
                    >
                      {" "}
                      Add Comment
                    </button>{" "}
                  </div>
                ) : null}
                <br />
              </div>
            ) : null}
          </div>
        </div>
      );
    });
  ///////////////////////////////
  return <div>{productDetailsToShow ? productDetailsToShow : null}</div>;
  //////////////////////////////
};

export default ProductDetails;
