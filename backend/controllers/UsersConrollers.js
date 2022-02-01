//import connenction from database
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { connection } = require("../database/db");

//create controller for register

const register = async (req, res) => {
  
};

//create controller for register

const login = (req, res) => {};

//create controller for updateUserById

const updateUserById = (req, res) => {};

//create controller for deleteUserById

const deleteUserById = (req, res) => {};

module.exports = { register, login, updateUserById, deleteUserById };
