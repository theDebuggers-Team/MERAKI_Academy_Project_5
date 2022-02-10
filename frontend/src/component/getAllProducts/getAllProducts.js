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

toast.configure();

const Products = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [products, setProducts] = useState("");
  // const { search } = useParams();
  const [page, setPage] = useState(1);


  const [limit, setLimit] = useState(9);

  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      products: state.productReducer.products,
    };
  });
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
                    <p style={{ color: "gray" }}>...more</p>
                  </span>
                  <div className="button-58">
                    {/* <Link
                      to="#"
                      style={{
                        borderRight: "1px solid rgb(211, 206, 206)",
                        paddingLeft: "10%",
                      }}
                    >
                      <BiShowAlt /> Show Product
                    </Link> */}

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
                  </div>
                </div>

                {/* <button
                  className="add"
                  onClick={(e) => {
                    if (
                      window.confirm(
                        "Are you sure you wish to delete this item?"
                      )
                    )
                      deleteProduct(element.id);
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={(e) => {
                    navigate(`/update/${element.id}`);
                  }}
                >
                  Update
                </button> */}
              </div>
            );
          })}
    </div>
  );
};

export default Products;
