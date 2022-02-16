import axios from "axios";
import React, { useState, useEffect } from "react";
import "./getAllProducts.css";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

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
// import "./styles.css";
import ReactStars from "react-rating-stars-component";
toast.configure();

const Products = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [products, setProducts] = useState("");
  // const { search } = useParams();
  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(4);
  const [likes, setLikes] = useState(9);

  const [more, setmore] = useState(false);

  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      products: state.productReducer.products,
    };
  });
  // const stars = {
  //   size: 30,
  //   value: {0},
  //   isHalf: true,
  //   edit: false,
  //   onChange: (newValue) => {
  //     console.log(`Example 2: new value is ${newValue}`);
  //   },
  // };
  const token = state.token;
  const getAllProducts = () => {
    axios
      .get(`http://localhost:5000/product?page=${page}&limit=${limit}`)
      .then((response) => {
        dispatch(setproducts(response.data.results));
        console.log(state.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const next = () => {
    if (page < 3) {
      setPage(page + 1);
    }
  };
  const previous = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  //// counter to add one product from the same product list

  /////// add Product to wish List Naser
  const addToWishList = (productId) => {
    axios
      .post(
        `http://localhost:5000/wishlist/add/${productId}`,
        {},
        {
          headers: {
            Authorization: `Basic ${token}`,
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

  useEffect(() => {
    getAllProducts();
  }, [page, limit]);

  /////////////////////////////////////////////////
  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:5000/product/delete_1/${id}`, {
        headers: {
          Authorization: `Basic ${state.token}`,
        },
      })
      .then((result) => {
        getAllProducts();
      })
      .catch((error) => {});
  };

  return (
    <div className="all">
     <h2 className="label">All Products</h2>
      <div className="all-products">
        {state.products &&
          state.products
            .filter((element) => {
              if (search == undefined) {
                return element;
              } else if (
                element.title.toLowerCase().includes(search.toLowerCase()) ||
                (element.category &&
                  element.category.toLowerCase().includes(search.toLowerCase()))
              ) {
                return element;
              }
            })
            .map((element) => {
              return (
                <div className="single-product" key={element.id}>
                  <div
                    className="image"
                    onClick={(e) => {
                      navigate(`/productDetails/${element.id}`);
                    }}
                  >
                    <img src={element.image} className="img" />
                  </div>
                  <div className="product-description">
                    <span className="title">
                      {/* {element.title.substring(-1, 30) + "..."} */}
                      {element.title}
                    </span>

                    <span className="price"> {element.price} $</span>
                    <span>
                      {element.description.substring(-1, 20)}
                      <p
                        style={{ color: "gray", cursor: "pointer" }}
                        onClick={(e) => {
                          setmore(!more);
                        }}
                      >
                        ...more
                      </p>
                      {more ? <p>{element.description}</p> : null}
                    </span>
                    <div className="stars">
                      <ReactStars
                        count={5}
                        // onChange={ratingChanged}
                        size={24}
                        value={element.rating / element.counter}
                        half={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        color2={"#fbb034"}
                        edit={false}
                      />
                    </div>

                   { state.token?<div className="button-58">
                      <Link
                        to="#"
                        className="link"
                        onClick={() => {
                          addToWishList(element.id);
                        }}
                      >
                        {" "}
                        <MdOutlineFavoriteBorder /> Favorite
                      </Link>
                    </div>:null}
                  </div>
                </div>
              );
            })}
      </div>
      <div className="productsPanelPagination">
        <button className="btn" onClick={previous}>
          Back
        </button>
        <button className="btn2">{page}</button>
        <button className="btn" onClick={next}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
