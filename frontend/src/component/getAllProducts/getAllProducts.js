import axios from "axios";
import React, { useState, useEffect } from "react";
import "./getAllProducts.css";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Products = ({ search }) => {
  const [products, setProducts] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const getAllProducts = () => {
    axios
      .get(`http://localhost:5000/products/?page=${page}&limit=${limit}`)
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
  }, [page, limit]);
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
  const updateProduct = (id) => {
    let updatedProduct = { name, description, price, category, image };

    axios
      .put(`http://localhost:5000/products/${id}`, updatedProduct)
      .then((result) => {
        getAllProducts();
      })
      .catch((error) => {});
  };

  ////////////////////////////////////////////////////

  return (
    <div>
      {products &&
        products
          .filter((element) => {
            if (search === undefined) {
              return element;
            } else if (
              element.title.toLowerCase().includes(search.toLowerCase()) ||
              element.category.toLowerCase().includes(search.toLowerCase())
            ) {
              return element;
            }
          })
          .map((element) => {
            return (
              <div className="product">
                <p>{element.title}</p>
                <p>{element.price}JD</p>
                <img src={element.image} className="img" />
                <button
                  className="add"
                  onClick={(e) => {
                    if (
                      window.confirm(
                        "Are you sure you wish to delete this item?"
                      )
                    )
                      deleteProduct(element.id);
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
