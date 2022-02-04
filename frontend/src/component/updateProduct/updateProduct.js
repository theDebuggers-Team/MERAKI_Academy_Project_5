import axios from "axios";
import React, { useState, useEffect } from "react";
import "./updateProduct.css";


const Update = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setcategory] = useState("");

  const updateProduct = () => {
    let updatedProduct = { title, description, price, image, category };

    axios
      .put(`http://localhost:5000/products/${id}`, updatedProduct)
      .then((result) => {
        getAllProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="Update-Product-update-component">
        <span className="update-tit-update-component">Update Product</span>
        <br />
        <input
          type="text"
          placeholder="Title"
          className="upd-inp-prod"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Description"
          className="upd-inp-prod"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Price"
          className="upd-inp-prod"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="amount"
          className="upd-inp-prod"
          value={amount}
          onChange={(e) => {
            setamount(e.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Update image product"
          className="upd-inp-prod"
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Update Product catigory"
          className="upd-inp-prod"
          value={updateCategory}
          onChange={(e) => {
            setcategory(e.target.value);
          }}
        />
        <br />
        <div className="upd-inp-back-confirm-update">
          <button
            className="upd-botton"
            onClick={() => {
              Swal.fire({
                title: "Are you sure Admin?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#82B440",
                cancelButtonColor: "#262626",
                confirmButtonText: "Yes update it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire("updated", "The product is updated", "success");
                  updateProduct(id[0]);
                }
              });
            }}
          >
            Confirm Updating
          </button>
          <br />

          <br />
          <button
            className="upd-botton"
            onClick={(e) => {
              navigation("/products");
            }}
          >
            {" "}
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
};
