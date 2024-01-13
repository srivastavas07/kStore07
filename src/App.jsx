/* eslint-disable */
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { useEffect, useState } from 'react';
import Home from './pages/home';
import Cart from './pages/cart';
import { Link } from 'react-router-dom';
import Checkout from './pages/checkout';
import { useSelector } from 'react-redux';

// import dotenv from 'dotenv';
// dotenv.config()
// const API_URL = process.env.API_URL;
// console.log(API_URL);
const API = "https://fakestoreapi.com/products";

function Navbar() {
  const {cart} = useSelector((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(()=>{
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
  },[cart]);

// cart.reduce((acc, curr) => acc + curr.price, 0): This part uses the reduce function on the cart array. The reduce function is used for reducing an array to a single value by applying a specified function to each element of the array.
// acc: The accumulator. It accumulates the total value as the function iterates over each element.
// curr: The current element being processed in the array.
// acc + curr.price: This part of the function adds the price property of the current element to the accumulator.

  return (
    <>
      <div className="navbar bg-base-100 max-w-screen-lg bg-transparent m-auto">
        <Link to="/" className='flex-1'>
          <a className="btn btn-ghost normal-case text-xl hover:text-white">kStore07</a>
        </Link>
        <div className="flex-none">
          <div className="dropdown dropdown-end mr-2">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className=" text-xs h-[60%] w-[60%] rounded-2xl bg-green-500 absolute right-[-5px] top-[-5px] text-white animate-bounce">{cart.length}</span>
              </div>
            </label>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
              <div className="card-body">
                <span className="font-bold text-lg">{cart.length} Items</span>
                <span className="text-info"><span className='font-bold text-white'>Subtotal:</span> ${totalAmount.toFixed(2)}</span>
                <div className="card-actions my-1">
                  <Link to="/cart">
                    <button className="btn btn-primary btn-block">View cart</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <a href = "https://github.com/srivastavas07" ><img src="https://lh3.googleusercontent.com/a/ACg8ocIrlg3UyACnUz14vja2DdJ7Yu3UvGrbmot3QI1u7PEW7A=s192-c-rg-br100" alt ="profile" /></a>
              </div>
            </label>
          </div>
        </div>
      </div>
    </>
  )
}



function App() {
  const [products, setProducts] = useState([]);
  const {cart} = useSelector(state=>state);
  useEffect(() => {
    getProducts();
  })


  async function getProducts() {
    try {
      const response = await fetch(API);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        // console.log(products)
        return data;
      }
      else {
        console.log('failed to fetch the api..')
      }

    }
    catch (error) {
      console.log(error);

    }
  }
 
  console.log(products)



  return (
    <div className='bg-white'>
      <div className="bg-black">
        <Navbar />
      </div>
      <div className='main-container'>
      <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/cart" element={<Cart cart={products}/>} />
          <Route path = "/checkout" element={cart.length !== 0 ? (<Checkout/>) : (<Home products={products}/>)}/>
        </Routes>
      </div>

    </div>
  );
}

export default App;
