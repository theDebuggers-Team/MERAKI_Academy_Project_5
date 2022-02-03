import React, { useState } from "react";
import "./App.css";
import { Routes, Route} from "react-router-dom";

import SignUp from "./componets/sign_up/sign_up";
import Login from "./componets/login/login";
import Products from "./componets/products/products";
import Home from "./componets/Home/home";
import Header from "./componets/header/Header";
import Cart from "./componets/CartComponenet/Cart";
import ProductsDetails from "./componets/Product-page-details/ProductsDetails";
import Update from "./componets/UpdateComponent/Update";
import CardPayment from "./componets/card payment/CardPayment";
// import Laptops from "./componets/ProductCatigory/laptops";
import CreateProducts from "./componets/createProducts/CreateProducts"
import Categories from "./componets/catigories/categories"
import EachCategoryProducts from "./componets/ProductCatigory/EachCategoryProducts"
import SearchProduct from "./componets/searchProduct/SearchProduct"

function App() {
  const token = localStorage.getItem("token")
  //// to get the items from the categories.js to EachCategoryProducts to filter it
  const [productCategory,setproductCategory] = useState([])
  //// filterProduct its the array that holds all products came from products component
  //// local storge for products category
  // const productCategory = JSON.parse(localStorage.getItem("productsCategory")) 
  const [filterProduct,setfilterProduct]= useState([])
  const [cartItems,setcartItems] = useState([])
  const [productsDetails,setproductsDetails] =useState([])
  console.log(productsDetails);
  return (
    <div className="App">
      {/* <h1>Welcome To App</h1> */}
      <Header token = {token}/>
      
 <Routes>
  
   <Route path = "/signUp" element={<SignUp/>} />
   <Route path = "/login" element={<Login />} />
   <Route path="/products" element={<Products  setproductsDetails ={setproductsDetails}  token ={token}  setfilterProduct ={setfilterProduct}/>}/>
   <Route path = "/" element={<Home/>} />
   <Route path = "/cart" element={<Cart cartItems= {cartItems} />}/>
   <Route path="/productDetails" element ={<ProductsDetails setcartItems={setcartItems} cartItems={cartItems} productsDetails={productsDetails} token={token} setproductsDetails={setproductsDetails}/>}/>
   <Route path="/updateProduct" element={<Update token={token} productsDetails={productsDetails}/>}/>
   <Route path= "/cardPayment" element={<CardPayment/>}/>
   {/* <Route path="/categories/laptops" element={<Laptops filterProduct={filterProduct} setproductsDetails={setproductsDetails}/>}/> */}
  <Route path= "/createproducts" element ={<CreateProducts token={token}/>}/>
  <Route path="/categories" element= {<Categories setproductCategory={setproductCategory} />}/>
  <Route path="/EachCategoryProducts" element = {<EachCategoryProducts productCategory={productCategory}/>}/>
  <Route path= "/searchcomponent" element= {<SearchProduct/>}/>
 </Routes>
    </div>
  );
}

export default App;
