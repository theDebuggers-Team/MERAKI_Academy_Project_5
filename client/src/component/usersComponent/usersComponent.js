import axios from "axios";
import React, { useState, useEffect } from "react";
import "./usersComponent.css";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const Users = () => {
  const [users, setUsers] = useState([]);
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      products: state.productReducer.products,
    };
  });
  /////////////////////////////
  const getAllUsers = () => {
    console.log("get");
    axios
      .get(`http://localhost:5000/user`)
      .then((response) => {
        console.log(response.data.results);
        setUsers(response.data.results);
        console.log(users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ///////////////////////////// this function is to delete all comments reated to the user we need to delete from admin panel
  const deleteAllMyComments = (MyUserId) => {
    axios
      .delete(`http://localhost:5000/comment/delete_2/${MyUserId}`, {
        headers: {
          Authorization: `Basic ${state.token}`,
        },
      })
      .then((response) => {
        if (response.data.affectedRows === 1) {
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  //////////////////////////////////////////////////////////////////////////// this function to delete all product related to the user we need to delete

  const deleteAnProductByUserId = (MyUserId) => {
    axios
      .delete(`http://localhost:5000/product/delete_2/${MyUserId}`, {
        headers: {
          Authorization: `Basic ${state.token}`,
        },
      })
      .then((response) => {
        if (response.data.affectedRows === 1) {
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  ////////////////////////////////////////////////////////////////

  //////////////////////

  useEffect(() => {
    getAllUsers();
  }, []);
  ////////////////////////////////////////
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/user/${id}`, {
        headers: {
          Authorization: `Basic ${state.token}`,
        },
      })
      .then((result) => {
        deleteAllMyComments(id);
        deleteAnProductByUserId(id);
        getAllUsers();
      })
      .catch((error) => {});
  };

  return (
    <div className="allUsers">
      <table>
        <caption>Users List</caption>
        <thead>
          <tr>
            <th></th>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Member Since</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((element) => {
            return (
              <tr key={element.id} className="user">
                <th>{element.id}</th>
                <td>{element.id}</td>
                <td>{element.firstName}</td>
                <td>{element.email}</td>
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
                        title:
                          "Are you sure? this action will lead to delete all comments and products posted by this user",
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
                            "the user has been deleted.",
                            "success"
                          );
                          deleteUser(element.id);
                        }
                      });
                    }}
                  >
                    <BiTrash className="delete-use-admin" />
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

// d
