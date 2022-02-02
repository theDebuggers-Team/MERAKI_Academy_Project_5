const express = require("express");
const authentication = require("../middleware/authentication");
//create product router

const userRouter = express.Router();

// import users controllers from "userControllers"

const {
  register,
  login,
  updateUserById,
  deleteUserById,
} = require("../controllers/UsersConrollers");

//create end points

//1- create end points for register

userRouter.post("/register", register);

//2- create end points for login

userRouter.post("/login", login);

//3- create end points for update user

userRouter.put("/:id", authentication, updateUserById);

//4- create end points for delete user

userRouter.delete("/:id", authentication, deleteUserById);

module.exports = { userRouter };
