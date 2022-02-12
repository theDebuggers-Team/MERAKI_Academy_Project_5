import "./App.css";
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./component/Header/Header";
import Register from "./component/Register/register";
import Products from "./component/getAllProducts/getAllProducts";
import NewProduct from "./component/createNewProduct/createNewProduct";
import Login from "./component/Login/login";
import Update from "./component/updateProduct/updateProduct";
import ProductDetails from "./component/productDetails/productDetails";
import Users from "./component/usersComponent/usersComponent";
import UserProfile from "./component/User Profile/UserProfile";
import Panel from "./component/adminPanel/adminPanel";
import Footer from "./component/footerComponent/footer";
import WishList from "./component/wishlist/wishList";
import About from "./component/About/about";
import Terms from "./component/Terms/terms";
import Home from "./component/Home/Home";
import ContactUs from "./component/emailjs/emailjs";
import GeoLocate from "./component/Geolocate/geoLocate";

import GetProductsByCategory from "./component/getProductByCategory/AllProductByCategory";

function App() {
  const [search, setSearch] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

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
      {/* <GeoLocate /> */}
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route
          path="/geolocation"
          element={
            <GeoLocate
              lat={lat}
              setLat={setLat}
              long={long}
              setLong={setLong}
            />
          }
        />
        <Route
          path="/getAllProductByCategory/:category"
          element={<GetProductsByCategory />}
        />

        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
