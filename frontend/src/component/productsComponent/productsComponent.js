import axios from "axios";
import React, { useState, useEffect } from "react";
import "./productsComponent.css";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const ProductsAdmin = () => {
  const [products, setProducts] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const state = useSelector((state) => {
    return {
      products: state.productReducer.products,
    };
  });
  /////////////////////////////////////////////////////////
  const getAllProducts = () => {
    axios
      .get(`http://localhost:5000/product?page=${page}&limit=${limit}`)
      .then((response) => {
        console.log(products);
        setProducts(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, [page, limit]);
  ///////////////////////////////////////////

  return (
    <div className="allProducts">
      {console.log(products)}
      <table>
        <caption>Products List</caption>
        <thead>
          <tr>
            <th></th>
            <th>Product ID</th>
            <th>Title</th>
            <th>User</th>
            <th>price</th>
            <th>Published Date</th>
          </tr>
        </thead>
        <tbody>
          {products.map((element) => {
            return (
              <tr key={element.id} className="productPanel">
                <th>{element.id}</th>
                <td>{element.id}</td>
                <td>{element.title}</td>
                <td>{element.user_id}</td>
                <td>{element.Price}</td>
                <td>{element.publish_date}</td>
                <td>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 1024 1024"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M864 144H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm0 400H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zM464 144H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm0 400H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16z"></path>
                  </svg>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsAdmin;
