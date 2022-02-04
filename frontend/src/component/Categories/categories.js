import "./categories.css";
import { useNavigate, Link } from "react-router-dom";
import React from "react";

const Categories = () => {
  const categoriesarr = [
    {
      name: "cars",
      image: "#",
    },
    {
      name: "cars",
      image: "#",
    },
    {
      name: "cars",
      image: "#",
    },
    {
      name: "cars",
      image: "#",
    },
    {
      name: "cars",
      image: "#",
    },
    {
      name: "cars",
      image: "#",
    },
    {
      name: "cars",
      image: "#",
    },
    {
      name: "cars",
      image: "#",
    },
    {
      name: "cars",
      image: "#",
    },
  ];
  const mapOverCategories = categoriesarr.map((category) => {
    return (
      <div className="category">
        <p>{category.name}</p>
      </div>
    );
  });
  return <div className="categories">{mapOverCategories}</div>;
};

export default Categories;
