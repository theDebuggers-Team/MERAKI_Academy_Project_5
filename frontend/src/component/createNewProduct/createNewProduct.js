import axios from "axios";
import React, { useState, useEffect } from "react";
import "./createNewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cloudinary from "../Cloudinary/Cloudinary";
const NewProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  // const [token, setToken] = useState("");
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      products: state.productReducer.products,
    };
  });
  const token = state.token;

  const createNewProduct = () => {
    axios
      .post(
        "http://localhost:5000/product/",
        { title, description, price, image, category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
      });
  };
  ////////////////////////////////////////////cloudinary////////////////////////////////

  // return (
  //   <div>
  //     <input
  //       placeholder="title"
  //       onChange={(e) => {
  //         setTitle(e.target.value);
  //       }}
  //     ></input>
  //     <input
  //       placeholder="description"
  //       onChange={(e) => {
  //         setDescription(e.target.value);
  //       }}
  //     ></input>
  //     <input
  //       placeholder="Price"
  //       onChange={(e) => {
  //         setPrice(e.target.value);
  //       }}
  //     ></input>
  //     {/* <input
  //       placeholder="ImageURL"
  //       onChange={(e) => {
  //         setImage(e.target.value);
  //       }}
  //     ></input> */}
  //     <Cloudinary setImage={setImage} />
  //     <input
  //       placeholder="Category"
  //       onChange={(e) => {
  //         setCategory(e.target.value);
  //       }}
  //     ></input>
  //     <button onClick={createNewProduct} classNameName="create">
  //       Create Product
  //     </button>
  //     <p>{message}</p>
  //   </div>
  // );
  return (
    <>
      {/* <img src="img/dark-logo.png" className="logo" alt=""/> */}
      <span className="create">Create Product</span>

      <div className="form">
        <input
          type="text"
          id="product-name"
          placeholder="product name"
          className="inputprod"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          id="short-des"
          placeholder="short line about the product"
          className="inputprod"
        />
        <textarea
          id="des"
          placeholder="detail description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>


        <div className="product-price">
          <input
            type="number"
            id="actual-price"
            placeholder="actual price"
            className="inputprod"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <input
            type="number"
            id="discount"
            placeholder="discount percentage"
            className="inputprod"
          />
        </div>

        <input
          type="number"
          id="stock"
          min="20"
          placeholder="item in stocks"
          className="inputprod"
        />

        <textarea
          id="tags"
          placeholder="Enter categories here, for example - cars, Electonics, Clothes, "
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        ></textarea>
        <div className="product-info">
          <p className="text">upload image</p>

          <Cloudinary setImage={setImage} />
        </div>

        <input type="checkbox" className="checkbox" id="tac" checked />
        <label for="tac">OpenSooq take 30% from your total sell</label>

        <div className="buttons">
          <button className="btn" id="add-btn"  onClick={createNewProduct}>
            add product
          </button>
          <button className="btn" id="save-btn">
            save draft
          </button>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
