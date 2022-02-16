const express = require("express");
const authentication = require("../middleware/authentication");
const { addLike,deletelike } = require("../controllers/likeControllers");

//create like router

const likeRouter = express.Router();

// import like controllers from "likeControllers"

//end point for create like
likeRouter.put("/:id", addLike);

//end point for create like
likeRouter.delete("/", deletelike);

module.exports = { likeRouter };
