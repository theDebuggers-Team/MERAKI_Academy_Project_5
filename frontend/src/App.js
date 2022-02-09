import "./App.css";
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./component/Header/Header";
import Register from "./component/Register/register";
import Products from "./component/getAllProducts/getAllProducts";
import NewProduct from "./component/createNewProduct/createNewProduct";
import Login from "./component/Login/login";
import Categories from "./component/Categories/categories";
import Update from "./component/updateProduct/updateProduct";
import ProductDetails from "./component/productDetails/productDetails";
import Users from "./component/usersComponent/usersComponent";
import UserProfile from "./component/User Profile/UserProfile";
import Panel from "./component/adminPanel/adminPanel";
import Footer from "./component/footerComponent/footer";
import WishList from "./component/wishlist/wishList";
import About from "./component/About/about";

import GetProductsByCategory from './component/getProductByCategory/AllProductByCategory'

function App() {
  const [search, setSearch] = useState("");

  return (
    <div className="App">
      <Header setSearch={setSearch} />

      {/* <Navbar {...props} /> */}

      {/* <input
        placeholder="search"
        className="search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></input> */}

      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products search={search} />} />
        <Route path="/NewProduct" element={<NewProduct />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/wishList" element={<WishList />} />
        <Route path="/about" element={<About />} />



        <Route path="/getAllProductByCAtegory/:category" element={<GetProductsByCategory/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
