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
    image
  } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const query = `insert into users (firstName,lastName,age,country,email,phone_Number,password,role_id,image) values (?,?,?,?,?,?,?,?,?)`;

  const data = [
    firstName,
    lastName,
    age,
    country,
    email,
    phone_Number,
    hashPassword,
    role_id,
    image
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

const login = (req, res) => {
  const { email, password } = req.body;
  const query = `select * from users where email =? and is_deleted = 0`;
  const data = [email];
  connection.query(query, data, async (err, result) => {
    if (err) {
      res
        .status(404)
        .json({ success: false, message: "server error", err: err });
    }
    if (result.length) {
      const valid = await bcrypt.compare(password, result[0].password);
      if (valid) {
        const payload = {
          userId: result[0].userId,
          country: result[0].country,
          role: result[0].role,
          phone_number: result[0].phone_Number,
        };

        const options = {
          expiresIn: "20h",
        };

        const token = jwt.sign(payload, process.env.SECRET, options);

        res
          .status(200)
          .json({
            success: true,
            message: `Valid login credentials`,
            token: token,
          });
      } else {
        res
          .status(404)
          .json({
            success: false,
            message: "The password you’ve entered is incorrect",
          });
      }
    } else {
      res
        .status(404)
        .json({ success: false, message: "The email doesn't exist" });
    }
  });
};

//create controller for updateUserById

const updateUserById = (req, res) => {};

//create controller for deleteUserById

const deleteUserById = (req, res) => {};

module.exports = { register, login, updateUserById, deleteUserById };
