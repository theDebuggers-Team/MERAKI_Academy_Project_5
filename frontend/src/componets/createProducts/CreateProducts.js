import React from 'react'
import {useState} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./CreateProducts.css"
import Swal from 'sweetalert2'

const CreateProducts = ({token}) => {
   const navigation = useNavigate()
    const [title,settitle] = useState("")
    const [description,setdescription] = useState("")
    const [comments,setcomments] = useState([])
    const [price,setprice] = useState("")
    const [image,setimage] = useState("")
    const [amount,setamount] = useState(0)
    const [category,setprcategory] = useState("")
    const [createMessage,setCreateMessage] = useState("")
    const [error,seterror] = useState("")
    const [iscreated,setiscreated] = useState(false)


    ///// to get the created products path and create the product

    const createTheProduct =  ()=>{
        axios.post("http://localhost:5000/product/create",{title,description,comments,price,image,amount,category},{headers :{
            Authorization: `Bearer ${token}`  
        }}).then((response)=>{
            
            setCreateMessage(response.data.message)
        }).catch((err)=>{
            seterror(err.response.data.message)
        })
    }

    return (
        <div className="Create-new-product">
            <p className="crt-new-prod-title">Create New Product</p>
            <input type="text" placeholder='Product Title' className="create-new-prod-in-crt-pro-comp" value={title} onChange={(e)=>{
               settitle(e.target.value) }}/><br/>
            <input type="text" placeholder='Product description'className="create-new-prod-in-crt-pro-comp" value={description} onChange={(e)=>{
               setdescription(e.target.value)}}/><br/>
            <input type="text" placeholder='Product comments' className="create-new-prod-in-crt-pro-comp" value={comments} onChange={(e)=>{setcomments([...comments,e.target.value])}}/><br/>
            <input type="text" placeholder='Product price' className="create-new-prod-in-crt-pro-comp" value={price} onChange={(e)=>{setprice(e.target.value)}}/><br/>
            <input type="text" placeholder='Product image' className="create-new-prod-in-crt-pro-comp" value={image}onChange={(e)=>{setimage(e.target.value)}}/><br/>
            <input type="text" placeholder='Product amount' className="create-new-prod-in-crt-pro-comp"  value={amount} onChange={(e)=>{ setamount(e.target.value)}}/><br/>
            <input type="text" placeholder="Product Category" className="create-new-prod-in-crt-pro-comp" value={category} onChange={(e)=>{ setprcategory(e.target.value)}}/><br/>
                <button className="create-new-prod-btn" onClick={(e)=>{
                     Swal.fire({
                        title: 'Are you sure Admin?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#82B440',
                        cancelButtonColor: '#262626',
                        confirmButtonText: 'Yes create it!'
                      }).then((result) => {
                        if (result.isConfirmed) {
                          
                          Swal.fire(
                            'created',
                            'The product iscreated',
                            'success'
                          )
                          createTheProduct()
                        }
                      })

                    // createTheProduct()
                    setiscreated(true)
                }}>Create New Product</button>
                <br/>
            {/* {createMessage && createMessage} */}
            <br/>
            {/* {error && error} */}
            <br/>
           {iscreated ? <button className="create-new-prod-btn" onClick={(e)=>{
             navigation("/products")
           }}>Back To Products page</button>:null}
           <br/>
        </div>
    )
}

export default CreateProducts
