import axios from "axios";
import React , { useEffect, useState } from "react";
import UpdateProduct from "./UpdateProduct";


function ProductList() {
  const [productList, setProductList] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const {data} = await axios.get("http://localhost:5000/api/products/getproducts");
      setProductList(data?.productList);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
}


  useEffect(()=>{
    fetchProducts();
  },[]);



  const handleDelete = async (id) => {
    try {
        const data = await axios.post(`http://localhost:5000/api/products/delete/${id}`);
        if(data?.data?.success){
            alert(data?.data?.message);
            fetchProducts(); 
        } 
    } catch (error) {
        console.error("Error deleting products:", error);

    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdated = () => {
    setEditingProduct(null); 
    fetchProducts();         
  };
  
  
 

  

  return (
    <div className="w-full ">
        <div className="w-full">
            <table className="w-full bg-white divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                        <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                        <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                        <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>

                    </tr>
                </thead>
                <tbody className="w-full bg-white divide-y divide-gray-200">
                    {
                        productList?.map((product,index) => (
                            <tr key={index} className="hover:bg-gray-200">
                                <td className="px-6 py-3 whitespace-nowrap">{product?.name}</td>
                                <td className="px-6 py-3 whitespace-nowrap">{product?.description}</td>
                                <td className="px-6 py-3 whitespace-nowrap">{product?.price}</td>
                                <td className="px-6 py-3 whitespace-nowrap">{product?.quantity}</td>
                                <td className="px-6 py-3 whitespace-nowrap">
                                    <div className="w-20 flex justify-center gap-5">
                                        <div className="h-8 w-8  flex justify-center items-center me-5  text-red-600 rounded text-lg cursor-pointer" onClick={()=>handleDelete(product._id)}>Delete</div>
                                        <div className="h-8 w-8 flex justify-center items-center  text-green-600 rounded text-lg cursor-pointer" onClick={()=>handleEdit(product)}>Edit</div>

                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                  
                </tbody>
            </table>
        </div>
        {editingProduct && (
        <UpdateProduct
          product={editingProduct}
          onUpdated={handleUpdated}
          onCancel={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
}

export default ProductList;
