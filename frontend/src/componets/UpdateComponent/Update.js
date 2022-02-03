import React, { useState } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./Update.css"
import Swal from 'sweetalert2'

const Update = ({token,productsDetails}) => {
const [title,setTitle]= useState("")
const [description,setdescription] =useState("")
const [price,setPrice]= useState("")
const [amount,setamount]= useState("")
const [image,setimage]= useState("")
const [isUpdated,setisUpdated] = useState(false)
const [updatedMessage,setupdatedMessage] = useState("")
const navigation = useNavigate()
const [updateCategory,setupdateCategory] = useState("")

//  const decode = jwtDecode(token)

 let id = productsDetails.map((element)=>{
    return element._id
})
console.log(id);
// let productId = id[0]._id
// console.log(productId);
   
 const updateProduct = async(id)=>{
    await axios.put(`http://localhost:5000/product/update/${id}`,{image,title,description,price,amount},{
        headers: {
          Authorization: `Basic ${token}` 
        }
      }).then((response)=>{

        setupdatedMessage(response.data.message)
        setisUpdated(true)
          console.log(response.data);
      }).catch((err)=>{
        setisUpdated(false)
          console.log(err.message);
      })
 }

   

    return (
        <div>
        <div className='Update-Product-update-component'>
            
            {/* <p>Hi admin Updated product information:</p> */}
            <span className='update-tit-update-component'>Update Product</span>
            <br/>
            <input type="text" placeholder='Title' className="upd-inp-prod" value={title} onChange={(e)=>{
                setTitle(e.target.value)
            }}/><br/>
            <input type="text" placeholder='Description' className="upd-inp-prod" value={description} onChange={(e)=>{
                setdescription(e.target.value)
            }} /><br/>
            <input type="text" placeholder='Price' className="upd-inp-prod" value={price} onChange={(e)=>{
                setPrice(e.target.value)
            }}/><br/>
            <input type="text"  placeholder='amount' className="upd-inp-prod" value={amount} onChange={(e)=>{
                setamount(e.target.value)
            }}/><br/>
            <input type="text" placeholder='Update image product' className="upd-inp-prod" value={image} onChange={(e)=>{
                setimage(e.target.value)
            }}/><br/>
             <input type="text" placeholder='Update Product catigory' className="upd-inp-prod" value={updateCategory} onChange={(e)=>{
                setupdateCategory(e.target.value)
            }}/><br/>
            <div className="upd-inp-back-confirm-update">
            <button className="upd-botton" onClick={()=>{
                Swal.fire({
                    title: 'Are you sure Admin?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#82B440',
                    cancelButtonColor: '#262626',
                    confirmButtonText: 'Yes update it!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      
                      Swal.fire(
                        'updated',
                        'The product is updated',
                        'success'
                      )
                      updateProduct(id[0])
                    }
                  })
        //    updateProduct(id[0])
            }} >Confirm Updating</button><br/>
            {/* {isUpdated ? updatedMessage : null} */}
            <br/>
            <button className="upd-botton" onClick={(e)=>{
                 navigation("/products")
            }}> Back to Home</button>
            </div>
        </div>
        </div>
    )
}

export default Update
