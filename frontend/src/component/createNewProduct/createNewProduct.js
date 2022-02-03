import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateProducts.css";
import Swal from "sweetalert2";

const CreateProducts = ({ token }) => {
  const navigation = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState([]);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [createMessage, setCreateMessage] = useState("");
  const [error, setError] = useState("");
  const [setIsCreated, setIsCreated] = useState(false);

  ///// to get the created products path and create the product

  const createTheProduct = () => {
    axios
      .post(
        "http://localhost:5000/product/create",
        { title, description, comments, price, image, amount, category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setCreateMessage(response.data.message);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <div className="Create-new-product">
      <p className="crt-new-prod-title">Create New Product</p>
      <input
        type="text"
        placeholder="Product Title"
        className="create-new-prod-in-crt-pro-comp"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="Product description"
        className="create-new-prod-in-crt-pro-comp"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="Product comments"
        className="create-new-prod-in-crt-pro-comp"
        value={comments}
        onChange={(e) => {
          setComments([...comments, e.target.value]);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="Product price"
        className="create-new-prod-in-crt-pro-comp"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="Product image"
        className="create-new-prod-in-crt-pro-comp"
        value={image}
        onChange={(e) => {
          setImage(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="Product amount"
        className="create-new-prod-in-crt-pro-comp"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="Product Category"
        className="create-new-prod-in-crt-pro-comp"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      <br />
      <button
        className="create-new-prod-btn"
        onClick={(e) => {
          Swal.fire({
            title: "Are you sure Admin?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#82B440",
            cancelButtonColor: "#262626",
            confirmButtonText: "Yes create it!",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire("created", "The product setIsCreated", "success");
              createTheProduct();
            }
          });

          // createTheProduct()
          setIsCreated(true);
        }}
      >
        Create New Product
      </button>
      <br />
      {/* {createMessage && createMessage} */}
      <br />
      {/* {error && error} */}
      <br />
      {setIsCreated ? (
        <button
          className="create-new-prod-btn"
          onClick={(e) => {
            navigation("/products");
          }}
        >
          Back To Products page
        </button>
      ) : null}
      <br />
    </div>
  );
};

export default CreateProducts;
