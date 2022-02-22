import axios from "axios";
import React, { useState, useEffect } from "react";
import "./getAllProducts.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Typewriter from "typewriter-effect";
import { setproducts } from "../reducer/products/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactStars from "react-rating-stars-component";
toast.configure();

const Products = ({ search, favourites, setFav }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(4);

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
      .get(`/product?page=${page}&limit=${limit}`)
      .then((response) => {
        dispatch(setproducts(response.data.results));
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
  }, [page, limit]);

  /////////////////////////////////////////////////

  return (
    <div className="all">
      <h2 className="label">
        <Typewriter
          className="Typewriter"
          options={{
            autoStart: true,

            delay: 75,
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString("All Products")

              .pauseFor(2000)

              .start();
          }}
        />
      </h2>
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
                <div className="product-card">
                  <div
                    className="product-tumb"
                    onClick={(e) => {
                      navigate(`/productDetails/${element.id}`);
                    }}
                  >
                    <img src={element.image} alt="" className="image" />
                  </div>
                  <div className="product-details">
                    <span className="product-catagory">
                      {" "}
                      {element.category}
                    </span>
                    <h4>
                      <a href=""> {element.title.substring(-1, 30)}...</a>
                    </h4>
                    <p> {element.description.substring(-1, 70)}...</p>
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
                              style={{
                                color: favourites.includes(element.id)
                                  ? "red"
                                  : "null",
                              }}
                              onClick={() => {
                                if (!favourites.includes(element.id)) {
                                  addToWishList(element.id);
                                  setFav([...favourites, element.id]);
                                }
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
