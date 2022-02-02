//import connenction from database
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { connection } = require("../database/db");

//create controller for register

const register = async (req, res) => {
  const {
    firstName,
    lastName,
    age,
    country,
    email,
    phone_Number,
    password,
    role_id,
  } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const query = `insert into users (firstName,lastName,age,country,email,phone_Number,password,role_id) values (?,?,?,?,?,?,?,?)`;

  const data = [
    firstName,
    lastName,
    age,
    country,
    email,
    phone_Number,
    hashPassword,
    role_id,
  ];

  connection.query(query, data, (err, result) => {
    if (err) {
      console.log(err);
      res.status(409).json({
        success: false,
        message: `The email already exists`,
        err: err,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Success User Added`,
        results: result,
      });
    }
  });
};

//create controller for register

const login = (req, res) => {};

//create controller for updateUserById

const updateUserById = (req, res) => {};

//create controller for deleteUserById

const deleteUserById = (req, res) => {};

module.exports = { register, login, updateUserById, deleteUserById };
