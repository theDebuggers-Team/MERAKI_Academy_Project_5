import { Link, linkes } from "react-router-dom";
import decode from "jwt-decode";
import { useState } from "react";
import "./Header.css";
import { AiFillHome, AiFillAppstore } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { IoIosCreate } from "react-icons/io";
import { IoCartSharp } from "react-icons/io5";
import { MdLogin, MdLogout } from "react-icons/md";
import { RiLoginBoxFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { MdFavorite } from "react-icons/md";
import { TiThMenu as MenuIcon } from "react-icons/ti";
import { AiOutlineClose as CloseMenu } from "react-icons/ai";
import { IoCarSportOutline } from "react-icons/io5";
import { RiComputerLine } from "react-icons/ri";
import { MdOutlineWorkOutline } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { IoSearchOutline } from "react-icons/io5";

const Navigation = () => {
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
      <>
        <span className="category-list">{category.name}</span>
      </>
    );
  });
  const [click, setClick] = useState(false);
  const [clickCate, setClickCate] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };
  const handleClickCate = () => {
    setClickCate(!clickCate);
  };

  const closeMobileMenu = () => {
    setClick(false);
  };
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });

  const token = state.token;
  const role = token && decode(token).role;
  const firstName = token && decode(token).firstName;
  const firstName2 = token && decode(token).given_name;
  const lastName2 = token && decode(token).family_name;
  const googleLogin = token && decode(token);
  console.log(googleLogin);

  //////////////////////////

  return (
    <div className="header">
      <div className="logo-nav">
        <ul className={click ? "nav-options active" : "nav-options"}>
          <li className="option" onClick={closeMobileMenu}>
            {" "}
            <Link to="/" className="link">
              {" "}
              <AiFillHome /> Home
            </Link>{" "}
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <Link to="/products" className="link">
              <AiFillAppstore /> Products
            </Link>{" "}
          </li>
          <div className="dropdown">
            <li
              className="option"
              onClick={(e) => {
                closeMobileMenu();
                handleClickCate();
              }}
            >
              <Link to="#" className="link">
                <BiCategoryAlt /> Categories
              </Link>{" "}
            </li>
            {clickCate ? (
              <div className="dropdown-menu1">{mapOverCategories}</div>
            ) : null}
          </div>
          {token ? (
            <li className="option" onClick={closeMobileMenu}>
              <Link to="/cart" className="link">
                <MdFavorite /> Favorite
              </Link>{" "}
            </li>
          ) : null}
          {token ? null : (
            <li className="option mobile-option" onClick={closeMobileMenu}>
              <Link to="/login" className="link">
                <MdLogin /> Login
              </Link>{" "}
            </li>
          )}
          {token ? null : (
            <li className="option mobile-option" onClick={closeMobileMenu}>
              <Link to="/register" className="link">
                <RiLoginBoxFill /> Register
              </Link>{" "}
            </li>
          )}
        </ul>
      </div>
      <div className="signin-up">
        {token ? null : (
          <li onClick={closeMobileMenu}>
            <Link to="/login" className="link">
              <MdLogin /> Login
            </Link>{" "}
          </li>
        )}
        {token ? null : (
          <li onClick={closeMobileMenu}>
            {" "}
            <Link to="/register" className="link">
              <RiLoginBoxFill /> Register
            </Link>{" "}
          </li>
        )}
        {role === "ADMIN" ? (
          <Link to="/create" className="link">
            <IoIosCreate /> Create Product
          </Link>
        ) : null}

        {token ? (
          <li onClick={closeMobileMenu}>
            <Link
              className="link"
              to="/login"
              onClick={() => {
                localStorage.clear();
                role = null;
              }}
            >
              <MdLogout /> Log out
            </Link>{" "}
          </li>
        ) : null}
      </div>
      <div className="mobile-menu" onClick={handleClick}>
        {click ? (
          <CloseMenu className="menu-icon" />
        ) : (
          <MenuIcon className="menu-icon" />
        )}
      </div>
    </div>
  );
};

export default Navigation;
