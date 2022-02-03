import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./categories.css"

const Categories = ({setproductCategory}) => {
        const navigation1 = useNavigate()
    const productByCategory = (category) =>{
        axios.get(`http://localhost:5000/product/${category}/catigories`).then((response) =>{
            setproductCategory(response.data.product)
            // localStorage.setItem('productsCategory', JSON.stringify(response.data.product))
            console.log(response);
        }).catch((err)=>{
            console.log(err.message);
        })
      
    }

    return (
        <div className="categories-buttons">
            <br/>
            <button className="btn-catig"onClick={(e)=>{
                productByCategory("Laptops")
                navigation1("/EachCategoryProducts")
            }}> laptops</button><br/>
            <button className="btn-catig" onClick={(e)=>{
                 productByCategory("mobiles")
                 navigation1("/EachCategoryProducts")
            }}>Mobiles</button><br/>

            <button className="btn-catig" onClick={(e)=>{
                 productByCategory("Pc")
                 navigation1("/EachCategoryProducts")
            }}>Pc</button><br/>
            <button className="btn-catig" onClick={(e)=>{
                 productByCategory("Accessories")
                 navigation1("/EachCategoryProducts")
            }}>Accessories</button><br/>
            <br/>
            
        </div>
    )
}

export default Categories
