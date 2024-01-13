import React from 'react'
import '../App.css'
import {useSelector, useDispatch} from "react-redux";
import toast from 'react-hot-toast';
import { addProduct, removeProduct } from '../redux/slices/CartSlice';
import {UilStar} from '@iconscout/react-unicons'



export default function Home({ products }) {
    return (
        <>
            <div className=" bg-white max-w-[95vw] m-auto p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {products.map((product, index) => (
                   <Product product = {product} key = {index}  />
                ))}
            </div>
        </>
    );
}

const Product =({product}) =>{
    const { cart } = useSelector((state) => state);
    const dispatch = useDispatch();

    const removeFromCart = (product) => {
        dispatch(removeProduct(product.id));
        toast.error("Item removed from Cart !");
    };

    const addToCart = (product) => {
        dispatch(addProduct(product));
        toast.success("Item added to Cart successfully!");
    };

    return (
        <div className="card text-slate-600 hover:shadow-xl hover:bg-slate-100 hover:text-black text-sm rounded-none" >
        <figure className="h-72">
            <img src={product.image} className="h-[70%] w-[70%] object-fill" alt="Shoes" />
        </figure>
        <div className="card-body">
            <h2 className="card-title text-sm" title={product.title}>
                {product.title.slice(0,50)}...
            </h2>
            <p className=" text-xs" title = {product.description}>{product.description.slice(0,90)}...</p>
            <p className='font-bold flex items-center text-black'>Rating : {product.rating.rate}<UilStar className='mx-1' size ="15" /></p>
            <div className="card-actions justify-between items-center">
                <h1 className="font-bold text-base text-green-600">${product.price}</h1>
                {/* to use functions within a map component we have to use this keyword */}
                {cart.some((p) => p.id === product.id) ? (
                    <button
                        className="btn btn-outline bg-black text-white rounded-none my-4 p-2 text-xs capitalize"
                        onClick={() => removeFromCart(product)}
                    >
                        Remove Item

                    </button>
                ) : (
                    <button
                        className="btn btn-outline bg-black text-white rounded-none my-4 p-2 text-xs capitalize"
                        onClick={() => addToCart(product)}
                    >
                        Add Item
                    </button>
                )}
            </div>
        </div>
    </div>
    )
}
