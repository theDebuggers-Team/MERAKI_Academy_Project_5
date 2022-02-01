//import connenction from database
const { connection } = require("../database/db.js");

//create controller for create New product

const createNewProduct = (req, res) => {
  
};

//create controller for getAllProducts

const getAllProducts = (req, res) => {};

//create controller for getAnProductById

const getAnProductById = (req, res) => {};

//create controller for getAnProductByCategory

const getAnProductByCategory = (req, res) => {};

//create controller for deleteAnProductById

const deleteAnProductById = (req, res) => {
  const {productId} = req.params.id;
  const query = `UPDATE products SET is_deleted =1 where id=?`;
const data = [productId]
connection.query(query,data,(err,result)=>{
if(err){
res.status(404).json({success:false,message:"The product: ${id} is not found",err:err})
}else{
 res.status(200).json({success:true,message:`Succeeded to delete product with id: ${id}`,results :result})
 }

})
};

//create controller for deleteAnProductByUserId

const deleteAnProductByUserId = (req, res) => {};

//create controller for updateAnProductById

const updateAnProductById = (req, res) => {};

module.exports = {
  createNewProduct,
  getAllProducts,
  getAnProductById,
  getAnProductByCategory,
  deleteAnProductById,
  deleteAnProductByUserId,
  updateAnProductById,
};
