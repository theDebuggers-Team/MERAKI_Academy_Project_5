import "./Home.css";
import Categories from "../Categories/categories";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BsChatText } from "react-icons/bs";
import {
  setproducts,
  addproduct,
  updateproduct,
  deleteproduct,
  getproductsByState,
} from "../reducer/products/index";
import Typewriter from "typewriter-effect";
import ReactStars from "react-rating-stars-component";


import { Chat } from "../Chat/Chat";
// import ChatBotCom from "../ChatBot/ChatBot";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const Home = () => {
  const [chatbot, setChatbot] = useState(false);
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
  console.log(state.products);
  const products = state.products && state.products.slice(-4);
  const token = state.token;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const getAllProducts = () => {
    axios
      .get(`/product?page=${page}&limit=${limit}`)
      .then((response) => {
        dispatch(setproducts(response.data.results));
        console.log(state.products);
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
    <div className="home">
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
          <img src="https://citycenter.jo/image/catalog/revslider_media_folder/GAMINGPCBANNER.jpg" />
        </div>
        <div>
          <img src="https://citycenter.jo/image/catalog/revslider_media_folder/GAMINGPCBANNER.jpg" />
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
              // <div className="single-product-1" key={element.id}>
              //   <div
              //     className="image"
              //     onClick={(e) => {
              //       navigate(`/productDetails/${element.id}`);
              //       scrollTop();
              //     }}
              //   >
              //     <img src={element.image} className="img" />
              //   </div>
              //   <div className="product-description">
              //     <span className="title">{element.title}</span>

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
                <div class="badge">New</div>
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
          })}
      </div>
      <Categories />
      {/* <div className="chat-div">
        <button
          className="btn-chat"
          onClick={() => {
            setChatbot(!chatbot);
          }}
        >
          <BsChatText /> need help ?
        </button>
      </div> */}
      {/* {chatbot ? (
        <div>
          <ChatBotCom />
        </div>
      ) : null} */}
      <div className="chat">
        <Chat />{" "}
      </div>
    </div>
  );
};

export default Home;
