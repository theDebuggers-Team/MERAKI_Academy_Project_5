// import React from 'react'
import axios from 'axios'
import React, { useState,useEffect } from 'react'
import "./SearchProduct.css"
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'
////// links the search product to this componenet
const SearchProduct = () => {
    const navigation = useNavigate()
 
    const searchProductAsArray= JSON.parse(localStorage.getItem('searchProduct'))
    console.log(searchProductAsArray);
    const showTheSearchProduct = searchProductAsArray && searchProductAsArray.length ? searchProductAsArray.map((element)=>{
        return (
             
            <div className='Product' onClick={()=>{
                // setproductsDetails([element])
             localStorage.setItem("ProductsDetails",JSON.stringify([element]))
                navigation(`/productDetails`)
             }}>
               <div className='image'>  <img className='img-catig-search-prod-deta' src={element.image}/></div>

               <div className='Product-details'> 
                 <p>{element.title}</p>
                <p>{element.description}</p> 
                 <p> Price:{element.price}</p>
                
                {/* <p>| amount :{element.amount}</p> 
              
               {/* <div> {element.comments.length ? (element.comments.map((element)=>{
                   
                      return(
                    <div className='Comments'>
                         <div>| Comment: <p>{element.comment}</p></div>
                         <div>| Commenter Name: <p>{element.commenter.firstName}</p></div>
                         <div>| Populated on: <p>{element.createdAt}</p></div>
                         <div>| Updated on : <p>{element.updatedAt}</p></div><br/>
                        

                    </div>
                      )
                  })):<p>| Comments: No comments on this product</p>}</div> */}

                    {/* <p> | Populated on: {element.createdAt}</p>
                   <p>| Updated on{element.updatedAt}</p><br/> */}
                {/* <button onClick={(e)=>{
                       
                     setitemId([...itemId,element])
                }}> Add To Cart</button> */}
                 </div>
             

                   
               
            </div>
            
            

        )
    }):null
    return (
        <div className="search-prod-page-one">
            {showTheSearchProduct ? showTheSearchProduct:null}
            
        </div>
    )
}

export default SearchProduct
