import React, { useState } from "react";
import axios from "axios";
import { ImagetoBase64 } from "../components/Images/ImagetoBase64";

export default function NewProduct() {
  const [productInNew, setProductInNew] = useState({
    title: "",
    price: 0,
    description: "",
    quantityUnitsInStock: 0,
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInNew((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };


  const handleUploadProfileImage = async(e)=>{
    const src = await ImagetoBase64(e.target.files[0])

    setProductInNew((preve)=>{
        return{
          ...preve,
          image : src
        }
    });
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/products", productInNew);
      alert("Product created successfully");
      // Reset the form
      setProductInNew({
        title: "",
        price: 0,
        description: "",
        quantityUnitsInStock: 0,
        image: "",
      });
    } catch (error) {
      alert("Failed to create product. Please try again later");
    }
  };

  return (
    <div className="form-page">
    <div className="form-wrapper">
      <div className="title">Create New Product</div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            name="title"
            value={productInNew.title}
            onChange={handleChange}
            required
          />
          <label>Title:</label>
        </div>

        <div className="field">
          <input
            type="number"
            name="price"
            value={productInNew.price}
            onChange={handleChange}
            required
          />
          <label>Price:</label>
        </div>

        <div className="field">
          <div>Description:</div>
          <textarea
            name="description"
            value={productInNew.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="field">
          <input
            type="number"
            name="quantityUnitsInStock"
            value={productInNew.quantityUnitsInStock}
            onChange={handleChange}
            required
          />          
          <label>Quantity Units In Stock:</label>
        </div>

        <div>
          <button onClick={handleUploadProfileImage}></button>
        </div>
        <div  className="field">
          <button type="submit">Create Product</button>
        </div>
      </form>
    </div>
    </div>
  );
}