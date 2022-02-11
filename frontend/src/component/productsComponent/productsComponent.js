import axios from "axios";
import React, { useState, useEffect } from "react";
import "./productsComponent.css";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";
const ProductsAdmin = () => {
  const [products, setProducts] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      products: state.productReducer.products,
    };
  });
  /////////////////////////////////////////////////////////
  const getAllProducts = () => {
    axios
      .get(`http://localhost:5000/product?page=${page}&limit=${limit}`)
      .then((response) => {
        setProducts(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, [page, limit]);

  const next = () => {
    if (page < 3) {
      setPage(page + 1);
    }
  };
  const previous = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  ///////////////////////////////////////////
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
  //////////////////////////////////////////////

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
            <th className="pd">Published Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((element) => {
              return (
                <tr key={element.id} className="productPanel">
                  <th>{element.id}</th>
                  <td>{element.id}</td>
                  <td>{element.title}</td>
                  <td>{element.user_id}</td>
                  <td>{element.price}</td>
                  <td>{element.publish_date}</td>

                  <td>
                    <p
                    
                      onClick={(e) => {
                        // if (
                        //   window.confirm(
                        //     "Are you sure you wish to delete this item?"
                        //   )
                        // )
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire(
                              "Deleted!",
                              "The product has been deleted.",
                              "success"
                            );
                            deleteProduct(element.id);
                          }
                        });
                      }}
                    >
                      <BiTrash className="delete-prod-admin"/>
                    </p>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="productsPanelPagination">
        <button className="Pagin" onClick={previous}>
          Previous
        </button>
        <button className="Pagin1">{page}</button>
        <button className="Pagin" onClick={next}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsAdmin;
