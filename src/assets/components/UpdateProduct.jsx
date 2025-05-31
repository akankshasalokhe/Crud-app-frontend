import axios from "axios";
import React, { useEffect, useState } from "react";

function UpdateProduct({ product, onUpdated, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name ?? "",
        description: product.description ?? "",
        price: Number(product.price) ?? 0,
        quantity: Number(product.quantity) ?? 0,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/products/update/${product._id}`,
        form
      );
      alert(data.message);
      if (onUpdated) onUpdated(); 
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          Update Product
        </h2>

        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 rounded w-full"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          required
          className="border border-gray-300 p-2 rounded w-full"
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 rounded w-full"
        />

        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 rounded w-full"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded w-full transition"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded w-full transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProduct;
