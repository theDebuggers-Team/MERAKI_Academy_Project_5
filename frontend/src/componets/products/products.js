import axios from 'axios'
import React, { useState,useEffect } from 'react'
import "./products.css"
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'
import Pagination from "../Pagination/Pagination"


const Products = ({setproductsDetails,setfilterProduct}) => {
    const [products,setproducts] = useState([])
    const navigation = useNavigate()
    
    /// pagination

    const [currentPage,setCurrentPage] = useState(1)
    const [productPerPage]= useState(3)

    const indexOfLastProduct = currentPage * productPerPage
    const indexOfFirstProduct = indexOfLastProduct - productPerPage

    const ProductsPerPageINPAgination = products.slice(indexOfFirstProduct,indexOfLastProduct)
   

    
    
     
     
    
    const getAllProducts = ()=>{
        axios.get(`http://localhost:5000/product`).then((response)=>{
            console.log(response.data);
            setproducts(response.data.products)
           
        }).catch((err)=>{
            console.log(err.message);

        })
    }

    useEffect(() => {

        getAllProducts()
        setfilterProduct(AllProductsFromDataBase)
    }, [])


    // const addToCartFunction = (id)=>{
    //     axios.get(`http://localhost:5000/product/${id}`).then((result)=>{
    //         setitemId(result)
    //     })

    // }
    
    

    const AllProductsFromDataBase = ProductsPerPageINPAgination.length ?  ProductsPerPageINPAgination.map((element)=>{
       
        return(
             <div className='Product' onClick={()=>{
                setproductsDetails([element])
             localStorage.setItem("ProductsDetails",JSON.stringify([element]))
                navigation(`/productDetails`)
             }}>
               <div className='image-product'>  <img className='product-img-inproduct-js' src={element.image}/></div>

               <div className='Product-details'> 
                 <p>{element.title}</p>
                <p>{element.description}</p> 
                 <p className='Price'>| Price:{element.price}</p>
                
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
        <div>
        <div className='AllProducts'>
            
            {AllProductsFromDataBase? AllProductsFromDataBase: <p>No products in the page</p>}<br/>
         
            
           
            
        </div>
       
        <Pagination totalProducts ={products.length} productPerPage={productPerPage} setCurrentPage={setCurrentPage} />
        
        </div>
    )
}

export default Products
