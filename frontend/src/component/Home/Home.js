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
import { Chat } from "../Chat/Chat";
import ChatBotCom from "../ChatBot/ChatBot";
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
  const products = state.products && state.products.slice(0, 4);
  const token = state.token;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
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
  const navigate = useNavigate();
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
      <h2 className="label">Latest Products</h2>
      <div className="latest-products">
        {products &&
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
                  <span className="title">{element.title}</span>

                  <span className="price"> {element.price} $</span>
                  <span>
                    {element.description.substring(-1, 20)}
                    <p style={{ color: "gray" }}>...more</p>
                  </span>
                  <div className="button-58">
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
