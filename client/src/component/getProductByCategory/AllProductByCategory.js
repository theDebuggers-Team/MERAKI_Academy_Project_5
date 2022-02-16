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
import { useParams } from "react-router-dom";
import "./AllProductByCategory.css";

toast.configure();
const GetProductsByCategory = () => {
  const [products, setproducts] = useState([]);

  const { category } = useParams();

  const navigate = useNavigate();

  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      products: state.productReducer.products,
    };
  });

  const getProductsByCategory = () => {
    axios
      .get(`/product/search_2?category=${category}`)
      .then((response) => {
        setproducts(response.data.results);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  const addToWishList = (productId) => {
    axios
      .post(
        `/wishlist/add/${productId}`,
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

  useEffect(() => {
    getProductsByCategory();
  }, []);

  const getAllProductsCategories =
    products &&
    products.map((element) => {
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
            {state.token ? (
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
            ) : null}
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
    });

  return (
    <div className="multi-products-category">
      {getAllProductsCategories ? getAllProductsCategories : null}
    </div>
  );
};

export default GetProductsByCategory;
