import axios from "axios";
import React, { useState, useEffect } from "react";
import "./productsComponent.css";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setproducts,
  addproduct,
  updateproduct,
  deleteproduct,
  getproductsByState,
} from "../reducer/products/index";

const ProductsAdmin = () => {
  //   const [users, setUsers] = useState([]);
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      products: state.productReducer.products,
    };
  });
  /////////////////////////////
  //   const getAllUsers = () => {
  //     console.log("get");
  //     axios
  //       .get(`http://localhost:5000/user`)
  //       .then((response) => {
  //         console.log(response.data.results);
  //         setUsers(response.data.results);
  //         console.log(users);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  //   useEffect(() => {
  //     getAllUsers();
  //   }, []);
  ////////////////////////////////////////
  //   const deleteUser = (id) => {
  //     axios
  //       .delete(`http://localhost:5000/user/${id}`, {
  //         // headers: {
  //         //   Authorization: `Basic ${state.token}`,
  //         // },
  //       })
  //       .then((result) => {
  //         getAllUsers();
  //       })
  //       .catch((error) => {});
  //   };

  return (
    <div className="allProducts">
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
          {state.products.map((element) => {
            return (
              <tr key={element.id} className="productPanel">
                <th>{element.id}</th>
                <td>{element.id}</td>
                <td>{element.Title}</td>
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
