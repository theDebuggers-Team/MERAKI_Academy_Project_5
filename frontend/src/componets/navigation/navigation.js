import React from "react";
import { Link} from "react-router-dom";
import "./navigation.css"
import jwtDecode from "jwt-decode";
import Dropdown from 'react-dropdown';
// import Dropdown from 'react-bootstrap'
import Select from "react-dropdown-select";
import {useState} from "react"
import {ArrowRight} from 'react-bootstrap-icons'
import {BsBagFill,BsFillCartFill,BsPlusSquareFill} from "react-icons/bs"
import {AiFillHome} from 'react-icons/ai'
import {RiLoginBoxFill,RiLogoutBoxFill}from 'react-icons/ri'
import {BiCategoryAlt}from 'react-icons/bi'
import {FaSignInAlt} from "react-icons/fa"

//// we passed the token for this component because the createproducts button should appear 
//only for the admin guy

const Navigation = ({token})=>{
    const[ison,setison]= useState(false)
    // const [iselogedot,setiselogedot] = useState(true);
    const role = token && jwtDecode(token).role &&  jwtDecode(token).role._id
    return(
        <div className="navigation">

        <div className="rightLinks">
        <Link to= "/" className="linksNav"><AiFillHome/> Home</Link>
        <Link to= "/products" className="linksNav"><BiCategoryAlt/> Products</Link>
        { token ? <Link to="/cart" className="linksNav"><BsFillCartFill/> Cart </Link>:null}
        
       {role == "61ddebb3ef155e84c29ac337" ? <Link to = "/createproducts" className="linksNav"><BsPlusSquareFill/> Create New Product</Link>:null}
        </div>

        <div className="leftLinks">
        <Link to= "/categories" className="linksNav" ><BiCategoryAlt/> Products Categories</Link>
       {token ? null:<Link to = "/login" className="linksNav" ><RiLoginBoxFill/> Login</Link>} 
       {token ? null :<Link to = "/signUp" className="linksNav" ><FaSignInAlt/> Sign Up </Link>} 
       { role ? <Link to = "/login" className="linksNav"  onClick={(e)=>{
            localStorage.clear();
            role=null;
            
        }}><RiLogoutBoxFill/> Log Out</Link>:null}
        
        </div>

        </div>
    )
}

export default Navigation