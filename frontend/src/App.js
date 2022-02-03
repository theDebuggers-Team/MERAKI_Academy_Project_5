import "./App.css";
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./component/Header/Header";
import Register from "./component/Register/register";
import Products from "./component/getAllProducts/getAllProducts";



function App() {
  return (
    <div className="App">
      <h1>Start project 5</h1>
      <Header></Header>
      <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/products" element={<Products />} />
    <Route path="/header" element={<Header />} />
  </Routes>;
    </div>
  );
 
}

export default App;
