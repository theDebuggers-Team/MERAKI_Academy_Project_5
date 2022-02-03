import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./home.css"

const Home = () => {
    const navigation = useNavigate()
    return (
        <div className="home-png">
            {/* <p>Welcome to Our Website</p> */}
            {/* <img className="img-home" src="https://www.landsberg.eu/wp-content/uploads/2020/10/Landsberg-Home-First-Class-E-Commerce-Shop-2.jpg" /> */}
            <button className="button-64"onClick={(e)=>{
         navigation("/products")
            }}>Go to products Page</button>
        </div>
    )
}

export default Home
