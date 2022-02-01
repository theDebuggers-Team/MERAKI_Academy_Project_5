const express = require("express");

//create product router

const roleRouter = express.Router();

// import role controllers from "roleController"

const { createNewRole } = require("../controllers/RoleContoller");

//create endpoint for create new role
roleRouter.post("/", createNewRole);

module.exports = { roleRouter };
