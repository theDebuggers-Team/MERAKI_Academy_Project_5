
import axios from 'axios'
import React, { useState,useEffect } from 'react'
import "./EachCategoryProducts.css"
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'


const EachCategoryProducts = ({setproductsDetails,setfilterProduct,productCategory}) => {
    const [products,setproducts] = useState([])
    const navigation = useNavigate()
    
    
    
     
     
    
    // const getAllProducts = ()=>{
    //     axios.get(`http://localhost:5000/product`).then((response)=>{
    //         console.log(response.data);
    //         setproducts(response.data.products)
           
    //     }).catch((err)=>{
    //         console.log(err.message);

    //     })
    // }

    // useEffect(() => {

    //     getAllProducts()
    //     setfilterProduct(AllProductsFromDataBase)
    // }, [])


    // const addToCartFunction = (id)=>{
    //     axios.get(`http://localhost:5000/product/${id}`).then((result)=>{
    //         setitemId(result)
    //     })

    // }
    
    

    const AllProductsFromDataBase = productCategory.length ?  productCategory.map((element)=>{
       
        return(

             <div className='Product' onClick={()=>{
                // setproductsDetails([element])
             localStorage.setItem("ProductsDetails",JSON.stringify([element]))
                navigation(`/productDetails`)
             }}>
               <div className='image-Category'>  <img className='img-catig-each-prod-deta' src={element.image}/></div>

               <div className='Product-details'> 
                 <p>Title :{element.title}</p>
                 <p>{element.description}</p>
                 <p>| Price:{element.price}</p>
                
                
                 </div>
             

                   
               
            </div>




        )
    }):null
     
    
    
    return (
        <div className='AllProducts'>
            
            {AllProductsFromDataBase? AllProductsFromDataBase: <p>No products in the page</p>}
        </div>
    )
}

export default EachCategoryProducts



























