import axios from "axios";
const initialState = {
  products: [],
};

//create product productReducer

const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_products":
      return {
        products: payload,
      };
    case "ADD_product":
      return {
        products: [...state.products, payload],
      };
    case "UPDATE_product":
      return {
        products: state.products.map((element) => {
          if (element.id == payload.id) return payload;
          return element;
        }),
      };

    case "DELETE_product":
      return {
        products: state.products.filter((element) => {
          return element.id !== payload;
        }),
      };
    case "GET_products":
      return { payload };
    default:
      return state;
  }
};

//create products actions

export const setproducts = (products) => {
  return { type: "SET_products", payload: products };
};

export const addproduct = (newproduct) => {
  return { type: "ADD_product", payload: newproduct };
};

export const updateproduct = (updatedproduct) => {
  return { type: "UPDATE_product", payload: updatedproduct };
};

export const deleteproduct = (id) => {
  return { type: "DELETE_product", payload: id };
};

export default productReducer;
