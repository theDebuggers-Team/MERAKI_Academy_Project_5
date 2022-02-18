import "./categories.css";
import { useNavigate, Link } from "react-router-dom";
import React from "react";
import { IoCarSportOutline } from "react-icons/io5";
import { RiComputerLine } from "react-icons/ri";
import { MdOutlineWorkOutline } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { IoSearchOutline } from "react-icons/io5";
import Typewriter from "typewriter-effect";

const Categories = () => {
  const navigate = useNavigate();
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
  const mapOverCategories = categoriesarr.map((category, i) => {
    return (
      <div
        className="category"
        key={i}
        onClick={(e) => {
          navigate(`/getAllProductByCategory/${category.name}`);
        }}
      >
        {category.image} {category.name}
      </div>
    );
  });
  return (
    <>
      <h2 className="label">
        <Typewriter
          className="Typewriter"
          options={{
            autoStart: true,
            loop: true,
            delay: 75,
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString("Categories")

              .pauseFor(2000)

              .start();
          }}
        />
      </h2>
      <div className="categories">{mapOverCategories}</div>
    </>
  );
};

export default Categories;
