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
import Demo1 from "./component/Maps/maps";
import CustomMap from "./component/customMap/custom-map";
import { useSelector, useDispatch } from "react-redux";
import GetProductsByCategory from "./component/getProductByCategory/AllProductByCategory";
import jwt_decode from "jwt-decode";
import NotFound from "./component/NOTFound/NotFound";
function App() {
  const [search, setSearch] = useState("");
  const [isFavorite,setIsFavorite] = useState(false)
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      products: state.productReducer.products,
    };
  });
  const decode = state.token && jwt_decode(state.token);
  const role = decode && decode.roleId;
  console.log(role, decode);

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
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/products" element={<Products search={search} isFavorite={isFavorite} setIsFavorite={setIsFavorite} />} />
        <Route
          path="/NewProduct"
          element={
            <NewProduct
              lat={lat}
              setLat={setLat}
              long={long}
              setLong={setLong}
            />
          }
        />
        <Route exact path="/update/:id" element={<Update />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/productDetails/:id"
          element={
            decode ? (
              <ProductDetails
                lat={lat}
                setLat={setLat}
                long={long}
                setLong={setLong}
              />
            ) : (
              <Login />
            )
          }
        />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/profile" element={<UserProfile />} />
        <Route
          exactpath="/panel"
          element={
            role == 1 ? (
              <Panel />
            ) : (
              <div class="admin">
                <img
                  src="https://stories.freepiklabs.com/storage/23247/401-error-unauthorized-rafiki-2845.png"
                  style={{ width: "40%", height: " 40%" }}
                />
              </div>
            )
          }
        />
        <Route exact path="/wishList" element={<WishList />} />
        <Route exact path="/about" element={<About />} />
        <Route
          exact
          path="/map"
          element={
            <Demo1 lat={lat} setLat={setLat} long={long} setLong={setLong} />
          }
        />
        <Route
          exact
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
          exact
          path="/getAllProductByCategory/:category"
          element={<GetProductsByCategory />}
        />

        <Route exact path="/contactUs" element={<ContactUs />} />
        <Route exact path="/terms" element={<Terms />} />
        <Route path="*" exact={true} element={NotFound} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
