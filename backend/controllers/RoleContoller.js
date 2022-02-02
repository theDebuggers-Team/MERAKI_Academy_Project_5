//import connenction from database
const { connection } = require("../database/db");

//create controller for create new role

const createNewRole = (req, res) => {
    const {role} = req.body
    const query = `insert into roles (role) values (?)`  
 const data = [role]
};

module.exports = { createNewRole };
