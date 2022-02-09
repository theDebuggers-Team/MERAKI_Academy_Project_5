import axios from "axios";
import React, { useState, useEffect } from "react";
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
const WishList = () => {
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      products: state.productReducer.products,
    };
  });

  const [wishList, setwishList] = useState([]);
  const [successDelete, setsuccessDelete] = useState(false);

  const getMyWishList = () => {
    axios
      .get("http://localhost:5000/wishlist/", {
        headers: {
          Authorization: `Basic ${state.token}`,
        },
      })
      .then((response) => {
        setwishList(response.data.results);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const deleteProductFromWishList = (productId) => {
    axios
      .delete(`http://localhost:5000/wishlist/delete/${productId}`, {
        headers: {
          Authorization: `Basic ${state.token}`,
        },
      })
      .then((response) => {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  useEffect(() => {
    getMyWishList();
  }, [successDelete]);

  const myWishList =
    wishList &&
    wishList.map((element) => {
      return (
        <div className="single-product" key={element.id}>
          <div
            onClick={(e) => {
              navigate(`/productDetails/${element.id}`);
            }}
          >
            <img src={element.image} className="img" />
          </div>
          <div className="product-description">
            <span className="title">
              {element.title.substring(-1, 30) + "..."}
            </span>

            <p>{element.description.substring(-1, 70) + "..."}</p>
            <span className="price">Price : {element.price} J.D</span>
            <div className="productes-btn">
              {/* <Link
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
              onClick={(e) => {
                // console.log(cart);
              }}
            >
              {" "}
              <MdOutlineFavoriteBorder /> Favorite
            </Link> */}

              <button
                className="btn-btn-remove-wishlist"
                onClick={(e) => {
                  deleteProductFromWishList(element.id);
                  setsuccessDelete(!successDelete);
                }}
              >
                Rmove
              </button>
            </div>
          </div>
        </div>
      );
    });

  return (
    <>
      {myWishList
        ? myWishList
        : toast.warn("WishList is empty", {
            position: toast.POSITION.TOP_RIGHT,
          })}
    </>
  );
};

export default WishList;
