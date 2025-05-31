import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ProductList from './assets/components/ProductList'
import Navbar from './assets/components/Navbar'
import CreateProduct from './assets/components/CreateProduct'

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/addproducts" element={<CreateProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
