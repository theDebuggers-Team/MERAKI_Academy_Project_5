import axios from "axios";
import React, { useState, useEffect } from "react";
import "./updateProduct.css";

const Update = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const updateProduct = () => {
    let updatedProduct = { title, description, price, image };

    axios
      .put(`http://localhost:5000/products/${id}`, updatedProduct)
      .then((result) => {
        getAllProducts();
      })
      .catch((error) => {});
  };
};
