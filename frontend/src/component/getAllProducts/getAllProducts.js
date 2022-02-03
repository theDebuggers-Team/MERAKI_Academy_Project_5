import axios from "axios";
import React, { useState, useEffect } from "react";
import "./getAllProducts.css";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState("");

  const getAllProducts = () => {
    axios
      .get(`http://localhost:5000/product`)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data.products);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  /////////////////////////////////////////////////
  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:5000/products/${id}`)
      .then((result) => {
        getAllProducts();
      })
      .catch((error) => {});
  };
  ////////////////////////////////////////////////////////

  return (
    <div>
      {products &&
        products.map((element) => {
          return (
            <div className="product">
              <p>{element.title}</p>
              <p>{element.price}JD</p>
              <img src={element.image} className="img" />
              <button
                className="add"
                onClick={(e) => {
                  if (
                    window.confirm("Are you sure you wish to delete this item?")
                  )
                    deleteProduct(element._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default Products;

