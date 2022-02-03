import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../products/products";
import { MdRemoveCircleOutline } from "react-icons/md";
import { FaFastBackward } from "react-icons/fa";
import "./Cart.css";
import { BsFillBagCheckFill, BsFillCartFill } from "react-icons/bs";
const Cart = ({ cartItems }) => {
  const [cartTem, setCartTem] = useState([]);
  const navigation = useNavigate();
  const cartItem = JSON.parse(localStorage.getItem("cartItem"));
  /// to remove the element from the cart
  const removeFromCart = (id) => {
    const cartfilter = cartItem.filter((element) => {
      return element._id !== id;
    });
    // this stste is to render the component
    setCartTem(cartfilter);
    /// set local dtorage is to update the value of the cartItem array
    // if(cartfilter.length){

    // }
    localStorage.setItem("cartItem", JSON.stringify(cartfilter));
  };
 

  const AAAALproduct =
    cartItem && cartItem.length && 
    cartItem.map((element) => {
      return (
        <div className="Product">
          <div className="cart-image">
            {" "}
            <img className="img-car-comp" src={element.image} />
          </div>

          <div className="cart-product-description">
            <p>Title :{element.title}</p>
            <p>| description :{element.description}</p>
            <p>| Price:{element.price}</p>
            <p>| amount :{element.amount}</p>
            <p> Qty: {element.number}</p>
            <div className="group-cart-b-icons">
              {/* <button
                className="cart-back-to-product"
                onClick={(e) => {
                  navigation("/products");
                }}
              >
                <FaFastBackward className="del-icon-cart" />
              </button> */}
              {/* <button
              onClick={(e) => {
                navigation("/cardPayment");
              }}
            >
              Order Now
            </button> */}
              <br />
              <button
                className="remove-from-cart-btn"
                onClick={(e) => {
                  console.log(element);
                  removeFromCart(element._id);
                }}
              >
                <BsFillCartFill className="del-icon-cart-1" />
                Remove
              </button>
            </div>
          </div>
        </div>
      );
    });

  return (
    <div className="container-cart-prod-comp">
    <div className="all-cart-product">
      {AAAALproduct && AAAALproduct.length ?  AAAALproduct:<p className="no-product-found-in-cart">Cart is Empty</p>}
      {/* <div className="carys-button-outside-div"> */}
      </div>
      <div className="btn-cart-comp-s" >

        { AAAALproduct && AAAALproduct.length ?<button
          className="order-btn"
          onClick={(e) => {
            navigation("/cardPayment"); 
          }}
        >
          <BsFillBagCheckFill className="del-icon-cart" /> Order
        </button>:null}
        <button
          className="cart-back-to-product"
          onClick={(e) => {
            navigation("/products");
          }}
        >
          <FaFastBackward className="del-icon-cart" /> Back
        </button>
      </div>
    </div>
  );
};

export default Cart;
