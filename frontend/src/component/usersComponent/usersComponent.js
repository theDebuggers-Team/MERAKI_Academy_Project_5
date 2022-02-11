import axios from "axios";
import React, { useState, useEffect } from "react";
import "./usersComponent.css";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BiTrash } from "react-icons/bi";

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
                            "the user has been deleted.",
                            "success"
                          );
                          deleteUser(element.id);
                        }
                      });
                    }}
                  >
                    <BiTrash />
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
