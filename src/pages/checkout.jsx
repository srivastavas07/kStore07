import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import img from '../images/qr.jpeg'
import toast from 'react-hot-toast';

const Checkout = () => {
    const {cart} = useSelector(state => state);
    const [totalAmount,setTotalAmount] = useState(0);
    const [selectedPayment, setSelectedPayment] = useState("Cash On Delivery");
    useEffect(()=>{
        setTotalAmount(cart.reduce((acc,curr)=> acc + curr.price,0))
    },[cart])
    const initialformData ={
        firstName: '',
        lastName: '',
        country: 'Select',
        state:'',
        address:'',
        district: '',
        pincode:'',
        phone:'',
        email:'',
        notes:'',
        appartment:'',
    }
    const [formData , setFormData] = useState({
        firstName: '',
        lastName: '',
        country: 'Select',
        state:'',
        address:'',
        district: '',
        pincode:'',
        phone:'',
        email:'',
        notes:'',
        appartment:'',
    })
    const handlePayment=(e)=>{
        setSelectedPayment(e.target.value);

    }
    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.id]:e.target.value,
        });
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        if (formData.firstName === ""){
            toast.error("please fill the form");
        }else{
            console.log('Form data is submitted:',formData )
            setFormData(initialformData);
            toast.success("Order Placed..!!")
        }
       
    }
    return (
        <div className='pb-20 bg-white flex justify-center mt-10'>
            <div className='checkOut text-black lg:flex w-[90%]'>
                <div className='detailsForm flex-1 p-4'>
                    <h1 className='font-bold uppercase'>Billing Details</h1>
                    <div className='mt-4'>
                        <form action="submit">
                            <div className='flex'>
                                <div className='mr-2 flex-1'>
                                    <label htmlFor="firstName" className='block text-xs p-1'>First Name <span className='text-red-600'>*</span></label>
                                    <input id="firstName" value={formData.firstName} onChange={handleChange} type="text" placeholder="" required className="input bg-transparent w-full placeholder:text-sm border-slate-950 rounded-none max-w-xs" />
                                </div>
                                <div className='flex-1'>
                                    <label htmlFor="lastName" className='block text-xs p-1'>Last Name <span className='  text-red-600'>*</span></label>
                                    <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} placeholder="" className="input bg-transparent placeholder:text-sm border-black w-full rounded-none max-w-xs" />
                                </div>

                            </div>
                            <div className='flex my-3'>
                                <div className='w-full mr-2'>
                                    <label htmlFor="country"  className='block text-xs p-1'>Country<span className='text-red-600'>*</span></label>

                                    <select  id ="country" onChange={handleChange}  value={formData.country} className="select w-full bg-transparent rounded-none border-black text-xs">
                                        <option disabled className='text-red-600'>Select</option>
                                        <option>India</option>
                                        <option>USA</option>
                                        <option>Bhutan</option>
                                        <option>Nepal</option>
                                        <option>Sri Lanka</option>
                                    </select>
                                </div>

                                <div className=''>
                                    <label htmlFor="state" className='block text-xs p-1'>State<span className='  text-red-600'>*</span></label>
                                    <input type="text" id="state" onChange={handleChange} value={formData.state} placeholder="" className="input bg-transparent placeholder:text-sm border-slate-950 rounded-none max-w-xs" />
                                </div>

                            </div>
                            <div className='w-full'>   
                                        <label htmlFor="street" className='block text-xs p-1'>Street Address<span className='text-red-600'>*</span></label>
                                        <input id="address" type="text" onChange={handleChange} value={formData.address} placeholder="House number / street name" className="input bg-transparent min-w-[100%] placeholder:text-xs placeholder:text-gray-500 border-slate-950 rounded-none max-w-xs" />
                            </div>
                            <div className=' my-2'>   
                                        <input id="appartment" onChange={handleChange} value={formData.appartment} type="text" placeholder="Appartment {Optional}" className="input bg-transparent min-w-[100%] placeholder:text-xs placeholder:text-gray-500 border-slate-950 rounded-none max-w-xs" />
                            </div>
                            <div className='flex mb-3'>
                                <div className='mr-2 flex-1'>
                                    <label htmlFor="district" className='block text-xs p-1'>Town / City  <span className='text-red-600'>*</span></label>
                                    <input id="district" onChange={handleChange} type="text" value={formData.district} placeholder="" className="input bg-transparent placeholder:text-sm w-full border-slate-950 rounded-none max-w-xs" />
                                </div>
                                <div className='flex-1'>
                                    <label htmlFor="pin" className='block text-xs p-1'>pincode <span className='  text-red-600'>*</span></label>
                                    <input type="text" id="pincode" onChange={handleChange} placeholder="" value={formData.pincode} className="input bg-transparent placeholder:text-sm w-full border-black rounded-none max-w-xs" />
                                </div>

                            </div>
                            <div className='w-full mb-3'>   
                                        <label htmlFor="phone" className='block text-xs p-1'>Phone<span className='text-red-600'>*</span></label>
                                        <input id="phone" type="text" onChange={handleChange} value={formData.phone} placeholder="indian only" className="input bg-transparent min-w-[100%] placeholder:text-xs placeholder:text-gray-500 border-slate-950 rounded-none max-w-xs" />
                            </div>
                            <div className='w-full mb-8'>   
                                        <label htmlFor="email" className='block text-xs p-1'>Email Address<span className='text-red-600'>*</span></label>
                                        <input id="email" type="text" onChange={handleChange} placeholder="@xyz.com" value={formData.email} className="input bg-transparent min-w-[100%] placeholder:text-xs placeholder:text-gray-500 border-slate-950 rounded-none max-w-xs" />
                            </div>
                            <h1 className='font-bold uppercase my-3'>Additional Information</h1>

                            <div className='w-full'>   
                                        <label htmlFor="email" className='block text-xs p-1'>Order Notes</label>
                                        <input id="notes" type="text" onChange={handleChange} placeholder="{Optional}" value={formData.notes} className="input bg-transparent min-w-[100%] placeholder:text-xs placeholder:text-gray-500 border-slate-950 rounded-none max-w-xs" />
                            </div>
                        </form>
                    </div>
                </div>
                <div className=' ml-3 p-4 bill flex-1'>
                    <h1 className='text-black font-bold uppercase'>Your Order</h1>
                    <div className='order-info my-3 text-sm'>
                        <div className='product-info flex justify-between font-bold text-stone-700'><span>Product</span><span>Subtotal</span></div>

                        {/* <div className='product-info flex justify-between'><span>Product</span><span>$0.00</span></div>
                        <div className='product-info flex justify-between'><span>Product</span><span>$0.00</span></div>
                        <div className='product-info flex justify-between'><span>Product</span><span>$0.00</span></div> 
                        Dummy data........
                        */}

                        {cart.map((cartItem,index)=>{
                            console.log(cartItem);
                            return <div key ={cartItem.id} className='product-info flex justify-between text-black'><span className='w-[60%] text-xs' >{cartItem.title}</span><span>${cartItem.price}</span></div>
                        })}
                        <div className='product-info flex justify-between font-bold text-stone-700'><span>Total</span><span>${totalAmount.toFixed(2)}</span></div>
                    </div>
                    <div className='payment mt-10'>
                    <div className ={`product-payment ${selectedPayment === "UPI Payment (GPay)" ? "bg-slate-200" : ""} flex justify-start text-xs`}><input name="paymentMethod" onChange={handlePayment} value="UPI Payment (GPay)" className= "mx-3" type='radio'/><span>UPI Payment (GPay)</span></div>
                    <div className={`product-payment ${selectedPayment === "Cash On Delivery" ? "bg-slate-200" : ""} flex justify-start text-xs`}><input name = "paymentMethod" onChange ={handlePayment} defaultChecked value ="Cash On Delivery" className ="mx-3 bg-white" type='radio'/><span>Cash On Delivery</span></div>
                    {
                        selectedPayment === "UPI Payment (GPay)" ? ( <div className=' pb-10 pt-2 flex justify-center'>
                        <img className ="h-[60%] w-[60%]" src = {img} alt ="QR-code"/>
                    </div>):(<div className='my-7'></div>)

                    }
                    </div>
                    <div onClick = {handleSubmit} className='paymentButton text-slate-200 btn rounded-none text-xs w-full hover:text-white'>Place Order</div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;
