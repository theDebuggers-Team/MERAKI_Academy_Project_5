import axios from "axios";
import React, { useState, useEffect } from "react";
import "./getAllProducts.css";

import { useNavigate } from "react-router-dom";

const newProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
};
