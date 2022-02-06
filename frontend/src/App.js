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
// import { Navbar } from 'responsive-navbar-react'
// import "responsive-navbar-react/dist/index.css";


function App() {
  const [search, setSearch] = useState("");

  // const props = {
  //   items: [
  //     {
  //       text: "Home",
  //       link: "/",
  //     },
  //     {
  //       text: "Products",
  //       link: "/products",
  //     },
  //     {
  //       text: "Custom",
  //       link: "#custom-bar",
  //     },
  //     {
  //       text: "Contact",
  //       link: "#contact",
  //     },
  //   ],
  //   logo: {
  //     text: "Responsive Navbar React",
  //   },
  //   style: {
  //     barStyles: {
  //       background: "#17759C",
  //     },
  //     sidebarStyles: {
  //       background: "#17759C",
  //       buttonColor: "white",
  //     },
  //   },
  // };

  return (
    <div className="App">
      <Header />
      {/* <Navbar {...props} /> */}

      {/* <input
        placeholder="search"
        className="search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></input> */}
      <Categories />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products search={search} />} />
        <Route path="/NewProduct" element={<NewProduct />} />
        <Route path="/update/:id" element={<Update />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
// import React from 'react'

// const Home = () => {
// const props = {
//   items: [
//     {
//       text: 'Home',
//       link: '/'
//     },
//     {
//       text: 'Doc',
//       link: '#docs'
//     },
//     {
//       text: 'Custom',
//       link: '#custom-bar'
//     },
//     {
//       text: 'Contact',
//       link: '#contact'
//     }
//   ],
//   logo: {
//     text: 'Responsive Navbar React'
//   },
//   style: {
//     barStyles: {
//       background: '#444'
//     },
//     sidebarStyles: {
//       background: '#222',
//       buttonColor: 'white'
//     }
//   }
//   }
//   return <Navbar {...props} />
// }
