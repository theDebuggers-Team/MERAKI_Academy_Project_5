import "./Home.css";
import Categories from "../Categories/categories";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setproducts } from "../reducer/products/index";
import Typewriter from "typewriter-effect";
import ReactStars from "react-rating-stars-component";

import { Chat } from "../Chat/Chat";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      products: state.productReducer.products,
    };
  });
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const products = state.products && state.products.slice(-4);
  const token = state.token;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const getAllProducts = () => {
    axios
      .get(`/product?page=${page}&limit=${limit}`)
      .then((response) => {
        dispatch(setproducts(response.data.results));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const navigate = useNavigate();
  const addToWishList = (productId) => {
    axios
      .post(
        `/wishlist/add/${productId}`,
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
  }, []);

  return (
    <div  className="home">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={2500}
        showThumbs={false}
      >
        <div>
          <img src="https://citycenter.jo/image/catalog/revslider_media_folder/GAMINGPCBANNER.jpg" />
        </div>
        <div>
          <img src="https://citycenter.jo/image/catalog/revslider_media_folder/gundambanner.jpg" />
        </div>
        <div>
          <img src="https://citycenter.jo/image/catalog/revslider_media_folder/HXXBAN.jpg" />
        </div>
      </Carousel>
      <h2 className="label">
        <Typewriter
          className="Typewriter"
          options={{
            autoStart: true,
            loop: true,
            delay: 75,
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString("Latest Products")

              .pauseFor(2000)

              .start();
          }}
        />
      </h2>
      <div className="latest-products">
        {products &&
          products.map((element) => {
            return (
              <div key={element.id} className="product-card">
                <div className="badge">New</div>
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
                  <p> {element.description.substring(-1, 65)}...</p>
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
                        <a href="#">
                          <i
                            className="fa fa-heart"
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
                          <i className="fa fa-eye"></i>
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <Categories />

      <div className="chat">
        <Chat />{" "}
      </div>
    </div>
  );
};

export default Home;
