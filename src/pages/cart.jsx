import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UilTrashAlt } from '@iconscout/react-unicons'
import { useDispatch, useSelector } from 'react-redux'
import { removeProduct } from '../redux/slices/CartSlice'
import toast from 'react-hot-toast'

const Cart = () => {
    const { cart } = useSelector((state) => state);
    // console.log(cart);
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
    }, [cart]);
    return (
        <div>
            {
                cart.length > 0 ? (
                    <div>
                        <div className='cart-container min-h-screen p-4 pb-14 lg:my-8  flex flex-wrap justify-center items-start text-black' >
                            <div className='cart-Subcontainer lg:w-[80%] sm:w-[95%] lg:flex md:flex sm:block'>
                                <div className='cart-items flex-1 px-6 pr-8'>
                                    {
                                        cart.map((item, index) => {
                                            return <CartItem key={item.id} itemIndex={index} cartItem={item} />
                                        })
                                    }
                                </div>
                                <div className='total-amount lg:w-[50%] sm:w-[90%] flex-1 border-l-2 lg:border-black md:border-black sm:border-transparent pl-8 flex-col justify-between'>
                                    <div>
                                        <p className='text-green-600 font-bold '>Your Cart</p>
                                        <h1 className='font-bold text-green-600 text-4xl uppercase'>Summary</h1>
                                        <p className='font-bold my-4'>Total Items : {cart.length} </p>
                                    </div>
                                    <div>
                                        <p className='py-4 text-sm font-bold'>Total Amount : <span className='text-green-600 font-bold'>${totalAmount.toFixed(2)}</span></p>
                                        <Link to={"/checkout"}>
                                        <button className='bg-black text-white text-xs font-bold p-2 px-8 rounded'>Checkout Now </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                ) : (
                    <div className='relative h-[93vh] w-[100vw] bg-white flex justify-center items-center'>
                        <div className='h-[20vh] flex-col justify-center items-center'>
                            <p className='text-black text-sm'>Your Cart is Empty!</p>
                            <Link to="/">
                                <button className=" m-4 bg-green-500 text-white text-xs px-4 py-2 rounded-md">Shop Now!</button>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>


    )
}
const CartItem = ({cartItem}) => {
    const dispatch = useDispatch();
    const removeFromCart=()=>{
        dispatch(removeProduct(cartItem.id));
        toast.error("Item removed from Cart!")
    }
    // console.log("this is the current item" + cartItem.title)
    return (
    <div className='cart-item-container lg:flex sm:block mb-10 border-b-1 border-grey'>
    <div className='cart-item-image p-2 px-6 flex justify-center items-center'>
        <figure className=' h-36 w-36'>
        <img src={cartItem.image} className='h-full w-full object-fit' alt="" />
        </figure>

    </div>
    <div className='cart-item-details '>
        <p className='cart-item-name text-sm font-bold pt-2'>{cartItem.title}</p>
        <p className='text-xs my-4 mb-2'>{cartItem.description}</p>
        <div className='cart-item-price flex justify-between items-center my-2'>
            <p className='font-bold text-base text-green-600'>${cartItem.price}</p>
            <button onClick={removeFromCart} className='bg-black text-white text-xs p-2 rounded-2xl'><UilTrashAlt size="15" /></button>
        </div>
    </div>
</div>
    )
}
export default Cart;





