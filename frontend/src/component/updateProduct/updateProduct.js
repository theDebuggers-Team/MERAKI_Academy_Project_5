import axios from "axios";
import React, { useState, useEffect } from "react";
import "./updateProduct.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setproducts,
  addproduct,
  updateproduct,
  deleteproduct,
} from "../reducer/products/index";
import Swal from "sweetalert2";

const Update = () => {
  const params = useParams();
  const { id } = params;

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      products: state.productReducer.products,
    };
  });
  console.log(state.getallproduct);
  const filter =
    state.products &&
    state.products.filter((ele) => {
      return ele.id == id;
    });
  console.log(filter);

  const [title, setTitle] = useState(filter[0].title);
  const [description, setDescription] = useState(filter[0].description);
  const [price, setPrice] = useState(filter[0].price);
  const [image, setImage] = useState(filter[0].image);
  const [category, setCategory] = useState(filter[0].category);
  // const [title, setTitle] = useState("")
  // const [description, setDescription] = useState("");
  // const [price, setPrice] = useState("");
  // const [image, setImage] = useState("");
  // const [category, setCategory] = useState("");

  const updateProduct = (id) => {
    const updatedProduct = { title, description, price, image, category };
    axios
      .put(`http://localhost:5000/product/update/${id}`, updatedProduct, {
        headers: {
          Authorization: `Basic ${state.token}`,
        },
      })
      .then((result) => {
        // getAllProducts();
        dispatch(updateproduct({ ...updatedProduct, id }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(filter);
  return (
    <div className="update-product">
      <label for="chk" aria-hidden="true">
        Update Product
      </label>
      <input
        className="update-inp"
        placeholder="Title"
        defaultValue={filter[0].title}
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></input>
      <br />
      <input
        className="update-inp"
        placeholder="description"
        defaultValue={filter[0].description}
        type="text"
        onChange={(e) => {
          console.log();
          setDescription(e.target.value);
        }}
      ></input>
      <br />
      <input
        className="update-inp"
        placeholder="price"
        defaultValue={filter[0].price - 0}
        type="number"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      ></input>
      <br />
      <input
        className="update-inp"
        placeholder="image"
        defaultValue={filter[0].image}
        type="text"
        onChange={(e) => {
          setImage(e.target.value);
        }}
      ></input>
      <br />
      <input
        className="update-inp"
        placeholder="category"
        defaultValue={filter[0].category}
        type="text"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      ></input>
      <br />
      <button
        className="update-btn"
        onClick={() => {
          Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
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
        Update
      </button>
    </div>
  );
};
export default Update;
