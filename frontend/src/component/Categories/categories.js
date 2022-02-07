import "./categories.css";
import { useNavigate, Link } from "react-router-dom";
import React from "react";
import { IoCarSportOutline } from "react-icons/io5";
import { RiComputerLine } from "react-icons/ri";
import { MdOutlineWorkOutline } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { IoSearchOutline } from "react-icons/io5";

const Categories = () => {
  const categoriesarr = [
    {
      name: "Cars",
      image: <IoCarSportOutline />,
    },
    {
      name: "Electronics",
      image: <RiComputerLine />,
    },
    {
      name: "Jobs",
      image: <MdOutlineWorkOutline />,
    },
    {
      name: "Real Estates",
      image: <FaHome />,
    },
    {
      name: "Fashoins",
      image: <GiClothes />,
    },
    {
      name: "Job Seeker",
      image: <IoSearchOutline />,
    },
  ];
  const mapOverCategories = categoriesarr.map((category) => {
    return (
      <div className="category">
        {category.image} {category.name}
      </div>
    );
  });
  return (
    <>
      <h2 className="label">Categories</h2>
      <div className="categories">{mapOverCategories}</div>
    </>
  );
};

export default Categories;
