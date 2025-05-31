import axios from 'axios';
import React, { useState } from 'react';

function CreateProduct({ onSubmit }) {
  const [form, setForm] = useState({ name: "", description: "", price: "", quantity: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    
    try {
      if(!form.name || !form.description || !form.price || !form.quantity) 
      {alert("Please fill all the fields")}
      else{
        const response = await axios.post("http://localhost:5000/api/products/addProducts", form )
        setForm({ name: "", description: "", price: "", quantity: "" });
        if (onSubmit) onSubmit();

        alert(response.data.message);
      }
    } catch (error) {
      console.log("Error adding product:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 z-50">
      <form onSubmit={handlesubmit} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-semibold text-center mb-4">Add Product</h2>

        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 rounded w-full"
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 rounded w-full"
        />

        <input
          name="price"
          type='number'
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 rounded w-full"
        />

        <input
          name="quantity"
          type='number'
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 rounded w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded w-full transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;


