//import connenction from database
const { connection } = require("../database/db");

//create controller for create new role

const createNewRole = (req, res) => {
  const { role } = req.body;
  const query = `insert into roles (role) values (?)`;
  const data = [role];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "server error", err: err });
    }
    res.status(201).json({
      success: true,
      message: `success role created`,
    });
  });
};

module.exports = { createNewRole };
