const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
require("./database/db");
const path = require("path");
// app.use(express.static('client/build'));
const { productRouter } = require("./routes/productRouter");
const { userRouter } = require("./routes/userRouter");
const { roleRouter } = require("./routes/roleRouter");
const { commentRouter } = require("./routes/commentRouter");
const { wishlistRouter } = require("./routes/wishlistRouter");
const { likeRouter } = require("./routes/likeRouter");
app.use(cors());

app.use(express.json());



//create product route with path of "/product"

app.use("/product", productRouter);

//create user route with path of "/user"

app.use("/user", userRouter);

//create comment route with path of "/comment"

app.use("/comment", commentRouter);

//create role route with path of "/role"

app.use("/role", roleRouter);

//create wishlist route with path of "/wishlist"
app.use("/wishlist", wishlistRouter);

//create like route with path of "/like"
app.use("/like", likeRouter);


if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
}
app.get('*',(req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
app.listen(process.env.PORT||5000, () => {
  console.log(`SERVER WORKING ON PORT: ${process.env.PORT||5000}`);
});
