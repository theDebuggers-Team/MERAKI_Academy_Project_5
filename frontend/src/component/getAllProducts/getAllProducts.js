import axios from "axios";
import React, { useState, useEffect } from "react";
import "./getAllProducts.css";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setproducts,
  addproduct,
  updateproduct,
  deleteproduct,
  getproductsByState,
} from "../reducer/products/index";

const Products = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [products, setProducts] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      products: state.productReducer.products,
    };
  });

  const getAllProducts = () => {
    axios
      .get(`http://localhost:5000/product?page=${page}&limit=${limit}`)
      .then((response) => {
        // console.log(response.data.products);
        // setProducts(response.data.results);
        dispatch(setproducts(response.data.results));
        console.log(state.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
  useEffect(() => {
    getAllProducts();
  }, [page, limit]);

  
  /////////////////////////////////////////////////
  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:5000/product/delete_1/${id}`, {
        headers: {
          Authorization: `Basic ${state.token}`,
        },
      })
      .then((result) => {
        getAllProducts();
      })
      .catch((error) => {});
  };

  ////////////////////////////////////////////////////////
  // const updateProduct = (id) => {
  //   let updatedProduct = { name, description, price, category, image };

  //   axios
  //     .put(`http://localhost:5000/products/${id}`, updatedProduct)
  //     .then((result) => {
  //       getAllProducts();
  //     })
  //     .catch((error) => {});
  // };

  ////////////////////////////////////////////////////

  return (
    <div>
      {state.products &&
        state.products
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
                <p>{element.price} JD</p>
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
                <button
                  onClick={(e) => {
                    navigate(`/update/${element.id}`);
                  }}
                >
                  Update
                </button>
              </div>
            );
          })}
    </div>
  );
};

export default Products;
