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
import ReactStars from "react-rating-stars-component";


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
  }, [category]);

  const getAllProductsCategories =
    products &&
    products.map((element) => {
      return (
        // <div className="single-product" key={element.id}>
        //   <div
        //     className="image"
        //     onClick={(e) => {
        //       navigate(`/productDetails/${element.id}`);
        //     }}
        //   >
        //     <img src={element.image} className="img" />
        //   </div>
        //   <div className="product-description">
        //     <span className="title">

        //       {element.title}
        //     </span>

        //     <span className="price"> {element.price} $</span>
        //     <span>
        //       {element.description.substring(-1, 20)}
        //       <p style={{ color: "gray" }}>...more</p>
        //     </span>
        //     {state.token ? (
        //       <div className="button-58">

        //         <Link
        //           to="#"
        //           className="link"
        //           onClick={() => {
        //             addToWishList(element.id);
        //           }}
        //         >
        //           {" "}
        //           <MdOutlineFavoriteBorder /> Favorite
        //         </Link>
        //       </div>
        //     ) : null}
        //   </div>

        // </div>
        <div class="product-card">
          <div class="product-tumb">
            <img src={element.image} alt="" class="image" />
          </div>
          <div class="product-details">
            <span class="product-catagory"> {element.category}</span>
            <h4>
              <a href=""> {element.title.substring(-1, 30)}...</a>
            </h4>
            <p> {element.description.substring(-1, 65)}...</p>
            <div class="product-bottom-details">
              <div class="product-price">
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
                <div class="product-links">
                  <a href="#">
                    <i
                      class="fa fa-heart"
                      onClick={() => {
                        addToWishList(element.id);
                      }}
                    ></i>
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      navigate(`/productDetails/${element.id}`);
                    }}
                  >
                    <i class="fa fa-eye"></i>
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
    });

  return (
    <div className="all-products">
      {getAllProductsCategories ? getAllProductsCategories : null}
    </div>
  );
};

export default GetProductsByCategory;
