import "./App.css";
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Register from "./component/Register/register";
import Products from "./component/getAllProducts/getAllProducts";
import Header from "./component/Header/Header";

function App() {
  return (
    <div className="App">
      <h1>Start project 5</h1>
    </div>
  );
  <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/products" element={<Products />} />
    <Route path="/header" element={<Header />} />
  </Routes>;
}

export default App;
