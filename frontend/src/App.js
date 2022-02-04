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

function App() {
  const [search, setSearch] = useState("");
  return (
    <div className="App">
      <Header />
      <input
        placeholder="search"
        className="search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></input>
      <Categories />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products search={search} />} />
        <Route path="/NewProduct" element={<NewProduct />} />
        <Route path="/update/:id" element={<Update />} />

        <Route path="/login" element={<Login />} />
      </Routes>
      ;
    </div>
  );
}

export default App;
