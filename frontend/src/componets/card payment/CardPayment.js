import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./CardPayment.css"
import Swal from 'sweetalert2'

const CardPayment = () => {
    const navigation = useNavigate()
    return (
        <div className="main-visa">
        <div className='visa-card'>
            <p className='invoice'>Invoice</p>
            <div className='visanum-name-customer'>
            <input type="text" placeholder='Card Number' className='card'/><br/>
            <input type="text" placeholder='Name on the card' className='card'/><br/>
            </div>
            <div className='card-details'>
            <input type="date" placeholder='Expiry Date' className='card-2'/><br/>
                
            <input type="number" placeholder='security Code' className='card-2'/><br/>
            </div>

                 <div className='card-pay-butn'>
                <button className="pay-now-button" onClick={()=>{
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#82B440',
                        cancelButtonColor: '#262626',
                        confirmButtonText: 'Yes proceed with payment'
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire(
                            'Paid',
                            'Your Payment is Done.',
                            'success'
                          )
                        }
                      })
                }}>Pay Now</button><br/>
                
                <button className="pay-now-button"onClick={(e)=>{
                    Swal.fire({
                        title: 'Are you sure yo wont to cancel the order?',
                        // text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, cancel it!'
                      }).then((result) => {
                        if (result.isConfirmed) {

                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your order has been cancelled ',
                                showConfirmButton: false,
                                timer: 1500
                              })
                              navigation("/products")
                        }
                      })
                
                }}> Cancel Order</button>
              </div>

            
            
        </div>
        </div>
    )
}

export default CardPayment
