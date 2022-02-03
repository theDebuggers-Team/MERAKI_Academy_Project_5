import React from 'react'
import Navigation from '../navigation/navigation'
import"./Header.css"
import {useState} from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import {BsSearch} from "react-icons/bs"
import jwtDecode from 'jwt-decode'
import{FaUserTie} from "react-icons/fa"

const Header = ({token}) => {
    
const navigation1 = useNavigate()
const [productTitle,setproductTitle] = useState("")
/// this is to get the return message from the axios
const [findTheProducts,setfindTheProducts] = useState("")
const [isfindTheProducts,setisfindTheProducts] = useState(false)
const[errInisfindTheProducts,seterrInisfindTheProducts] = useState("")
const [iserrInisfindTheProducts,setiserrInisfindTheProducts]= useState(false)

 ////////// thie below function is to get the element by searching using the input element
    const serchbyTitle= (productTitle)=>{
        axios.get(`http://localhost:5000/product/${productTitle}/products`).then((response)=>{
            localStorage.setItem("searchProduct",JSON.stringify(response.data.product));
            if(response.data.product.length===0){
                console.log(response.data.product);
                setfindTheProducts(response.data.message)
                setisfindTheProducts(true);
                setiserrInisfindTheProducts(false)
            }
            
           
            
        }).catch((err)=>{
            console.log(err.message);
            setisfindTheProducts(false);
            seterrInisfindTheProducts(err.response.data.message)
            setiserrInisfindTheProducts(true)
        })
    }
    const token3 = token && jwtDecode(token)
    return (
        <div className='header'>
            <div className='searchandlogo'>
            <span className='logo'>E-Shop</span> 
            <div className='btn-inp'>
            <input type="text" className="find-product" placeholder="Search for product" onChange={(e)=>{
                setproductTitle(e.target.value)
            }}/>
            <button className="btn-search"onClick={(e)=>{
              serchbyTitle(productTitle)
              navigation1("/searchcomponent")
            //   console.log(token3);
            }}><BsSearch/></button><br/>
             { token3 && token3.firstName && <span className="user-name"><FaUserTie/>  {token3.firstName}</span>}
            {/* {isfindTheProducts ?findTheProducts:null} */}
            {iserrInisfindTheProducts ? errInisfindTheProducts:null }
            </div>
            </div>
            <Navigation className="header-nav" token={token}/>
            
        </div>
    )
}

export default Header
