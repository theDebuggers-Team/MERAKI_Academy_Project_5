import axios from "axios";
import React, { useState, useEffect } from "react";
import "./updateProduct.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cloudinary from "../Cloudinary/Cloudinary";
import {
  setproducts,
  addproduct,
  updateproduct,
  deleteproduct,
} from "../reducer/products/index";
import Swal from "sweetalert2";
import "./updateProduct.css";

const Update = () => {
  const params = useParams();
  const { id } = params;

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const getProductById = () => {
    axios
      .get(`http://localhost:5000/product/search_1?id=${id}`)
      .then((response) => {
        setTitle(response.data.results[0].title);
        setDescription(response.data.results[0].description);
        setPrice(response.data.results[0].price);
        setImage(response.data.results[0].image);
        setCategory(response.data.results[0].category);
      });
  };
  const updateProduct = (id) => {
    const updatedProduct = { title, description, price, image, category };
    axios
      .put(`http://localhost:5000/product/update/${id}`, updatedProduct, {
        headers: {
          Authorization: `Basic ${state.token}`,
        },
      })
      .then((result) => {
        dispatch(updateproduct({ ...updatedProduct, id }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getProductById();
  }, []);
  console.log(price);

  return (
    // <div className="update-product">
    //   <div className="image-form">
    //     <div>
    //       <img
    //         src="https://www.crowdynews.com/wp-content/uploads/2016/03/Product-update.jpg"
    //         className="image-update-comp"
    //       />
    //     </div>
    //     <div className="container-inputs-bottom">
    //       <div>
    //         <label for="chk" aria-hidden="true" className="text-update-comp">
    //           Update Product
    //         </label>
    //       </div>
    //       <br />
    //       <input
    //         className="update-inp"
    //         placeholder="Title"
    //         defaultValue={title}
    //         type="text"
    //         onChange={(e) => {
    //           setTitle(e.target.value);
    //         }}
    //       ></input>
    //       <br />
    //       <input
    //         className="update-inp"
    //         placeholder="description"
    //         defaultValue={description}
    //         type="text"
    //         onChange={(e) => {
    //           console.log();
    //           setDescription(e.target.value);
    //         }}
    //       ></input>
    //       <br />
    //       <input
    //         className="update-inp"
    //         placeholder="price"
    //         defaultValue={price}
    //         type="number"
    //         onChange={(e) => {
    //           setPrice(e.target.value);
    //         }}
    //       ></input>
    //       <br />
    //       <input
    //         className="update-inp"
    //         placeholder="image"
    //         defaultValue={image}
    //         type="text"
    //         onChange={(e) => {
    //           setImage(e.target.value);
    //         }}
    //       ></input>
    //       <br />
    //       <input
    //         className="update-inp"
    //         placeholder="category"
    //         defaultValue={category}
    //         type="text"
    //         onChange={(e) => {
    //           setCategory(e.target.value);
    //         }}
    //       ></input>
    //       <br />
    //       <button
    //         className="update-btn"
    //         onClick={() => {
    //           Swal.fire({
    //             title: "Do you want to save the changes?",
    //             showDenyButton: true,
    //             showCancelButton: true,
    //             confirmButtonText: "Save",
    //             denyButtonText: `Don't save`,
    //           }).then((result) => {
    //             if (result.isConfirmed) {
    //               updateProduct(id);
    //               Swal.fire("Saved!", "", "success");
    //             } else if (result.isDenied) {
    //               Swal.fire("Changes are not saved", "", "info");
    //             }
    //           });
    //         }}
    //       >
    //         Update
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <>
    {/* <img src="img/dark-logo.png" className="logo" alt=""/> */}
    <span className="create">Update Product</span>

    <div className="form">
      <input
        type="text"
        defaultValue={title}
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
      className="text-area"
        id="des"
        defaultValue={description}
        placeholder="detail description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></textarea>

      <div className="product-price">
        <input
          type="number"
          defaultValue={price}
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
      className="text-area"
        id="tags"
        defaultValue={category}
        placeholder="Enter categories here, for example - cars, Electonics, Clothes, "
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      ></textarea>
      <div className="product-info">
        <p className="text">upload image</p>

        <Cloudinary setImage={setImage} defaultValue={image}/>
      </div>

      

      <div className="buttons">
      <button
            className="btn"
            onClick={() => {
              Swal.fire({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                confirmButtonColor: "#4267b3",
                denyButtonText: `Don't save`,
              }).then((result) => {
                if (result.isConfirmed) {
                  updateProduct(id);
                  Swal.fire("Saved!", "", "success");
                } else if (result.isDenied) {
                  Swal.fire("Changes are not saved", "", "info");
                }
              });
            }}
          >
          update product
        </button>
        <button className="btn" id="save-btn">
          save draft
        </button>
      </div>
    </div>
  </>
  );
};
export default Update;
