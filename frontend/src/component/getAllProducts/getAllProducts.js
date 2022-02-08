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
const Products = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [products, setProducts] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      products: state.productReducer.products,
    };
  });

  const getAllProducts = () => {
    axios
      .get(`http://localhost:5000/product?page=${page}&limit=${limit}`)
      .then((response) => {
        // console.log(response.data.products);
        // setProducts(response.data.results);
        dispatch(setproducts(response.data.results));
        console.log(state.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /////// add Product to wish List Naser
  const addToWishList = (id)=>{
    axios.post(`http://localhost:5000/wishlist/add/${id}`, {
      headers: {
        Authorization: `Basic ${state.token}`,
      },
    }).then((response)=>{
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }).catch((err)=>{
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
  }

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
            if (search === undefined) {
              return element;
            } else if (
              element.title.toLowerCase().includes(search.toLowerCase()) ||
              element.category.toLowerCase().includes(search.toLowerCase())
            ) {
              return element;
            }
          })
          .map((element) => {
            return (
              <div
                className="single-product"
                key={element.id}
                onClick={(e) => {
                  navigate(`/productDetails/${element.id}`);
                }}
              >
                <div>
                  <img src={element.image} className="img" />
                </div>
                <div className="product-description">
                  <span className="title">
                    {element.title.substring(-1, 30) + "..."}
                  </span>

                  <p >{element.description.substring(-1, 70) + "..."}</p>
                  <span className="price">Price : {element.price} J.D</span>
                  <div className="productes-btn">
                    <Link
                      to="#"
                      style={{
                        borderRight: "1px solid rgb(211, 206, 206)",
                        paddingLeft: "10%",
                      }}
                    >
                      <BiShowAlt /> Show Product
                    </Link>
                    <Link
                      to="#"
                      onClick={() => {
                        addToWishList(element.id)
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
