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
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./wishList.css";
import ReactStars from "react-rating-stars-component";
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
      .get("/wishlist/", {
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
      .delete(`/wishlist/delete/${productId}`, {
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
  if (!wishList) {
    toast.warn("WishList is empty", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  const myWishList =
    wishList &&
    wishList.map((element) => {
      return (
        <div className="product-card" key={element.id}>
          <div
            className="product-tumb"
            onClick={(e) => {
              navigate(`/productDetails/${element.id}`);
            }}
          >
            <img src={element.image} alt="" className="image" />
          </div>
          <div className="product-details">
            <span className="product-catagory"> {element.category}</span>
            <h4>
              <a href=""> {element.title.substring(-1, 30)}...</a>
            </h4>
            <p> {element.description.substring(-1, 68)}...</p>
            <div className="product-bottom-details">
              <div className="product-price">
                <small className="old-price">
                  ${element.price - element.price * 0.05}
                </small>
                <span className="new-price" style={{ fontWeight: 600 }}>
                  ${element.price}
                </span>
              </div>
            </div>
            <div className="stars-1">
              <ReactStars
                count={5}
                size={24}
                value={element.rating / element.counter}
                half={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                color2={"#fbb034"}
                edit={false}
              />
              {state.token ? (
                <div className="product-links">
                  <Link to="#">
                    <i
                      className="fa fa-trash"
                      onClick={(e) => {
                        deleteProductFromWishList(element.id);
                        setsuccessDelete(!successDelete);
                      }}
                    ></i>
                  </Link>
                  <Link
                    to="#"
                    onClick={(e) => {
                      navigate(`/productDetails/${element.id}`);
                    }}
                  >
                    <i className="fa fa-eye"></i>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
    });

  return <div className="all-products">{myWishList ? myWishList : null}</div>;
};

export default WishList;
