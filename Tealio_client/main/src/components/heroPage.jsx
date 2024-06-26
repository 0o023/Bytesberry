import React, { useState } from 'react';
import {ChevronLeft,ChevronRight} from "react-feather"
import img1 from "../assets/img1 (1).jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

const Hero = () => {

    //slider
    const slides= [img1,img2,img3];
    const [current,setcurrent]=useState(0);
    const prev =() => setcurrent((current)=>(current===0 ? slides.length-1 : current-1));
    const next =() => setcurrent((current)=>(current===slides.length-1?0:current+1));

    const [quantity, setQuantity] = useState(1);
    const [price,setPrice]= useState(999);
    const [size, setsize] = useState('1Kg');
    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
    const [activeButton, setActiveButton] = useState(0);

    const ChangePriceAndSize = (price, size, index) => {
        setActiveButton(index);
        setPrice(price);
        setsize(size);
        console.log(index,price,size);
    };
    
    const { cartOpen, toggleCart } = useCart();
    //<img src={img1} alt="Tealio Tea" className="w-72 h-auto" />
    return (
        <div className={`flex flex-col md:flex-row p-10 bg-bgcolor text-txtgreen`}>
            <div className='p-10 md:px-40 '> 
                <div className="  max-w-[520px] max-h-[550px] min-w-[250px] flex justify-center bg-white shadow rounded-xl ">
                    <div className="overflow-hidden relative max-w-full max-h-full rounded-xl">
                        <div className=" flex transition-transform ease-out duration-500 max-w-full max-h-full "
                        style={{transform:`translateX(-${current*100}%)`}}>
                            {slides.map((s)=>(
                                <img src ={s} className="object-cover object-center" alt="product image"/>
                            ))}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-between p-3">
                            <button onClick={prev} className="p-1 rounded-full shadow bg-white/30 text-txtgreen hover:bg-white">
                                <ChevronLeft size={30} />
                            </button>
                            <button onClick={next} className="p-1 rounded-full shadow bg-white/30 text-txtgreen hover:bg-white">
                                <ChevronRight size={30} />
                            </button>
                        </div>

                        <div className="absolute bottom-4 right-0 left-0">
                            <div className="flex items-center justify-center gap-2">
                                {slides.map((_,i)=>(
                                    <div className={`
                                        transition-all w-3 h-3 bg-white rounded-full
                                        ${current===i ? "p-2":"bg-opacity-50"}
                                    `}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-1/2  p-10">
                <h1 className="font-serif text-6xl font-bold mb-4 ">Tealio Tea</h1>
                <div >
                    <p className="font-quicksand text-lg font-medium tracking-normal text-justify py-4 ">
                        Experience the rich, aromatic flavor of our premium blend tea. Made from carefully selected leaves, 
                        each sip offers a perfect balance of boldness and smoothness. Perfect for any time of day,
                        enjoy it hot or iced for a moment of tranquility and taste the quality in every cup.
                    </p>
                </div>
                <div className="mb-4 pt-4">
                    
                    <div className="font-quicksand text-lg font-medium flex flex-col mb-2 ">Size</div>
                    <div className="flex w-full">
                    <button onClick={()=>{ChangePriceAndSize(999, '1Kg', 0)}} 
                    className={`flex-1 font-quicksand text-base font-medium border border-bdgreen  px-2 py-2  mr-2 rounded 
                    ${activeButton === 0 ? 'bg-btgreen text-bgcolor' : ' text-txtgreen hover:bg-hvgreen'}`}>
                        1kg (4x250g)
                    </button>

                    <button onClick={()=>{ChangePriceAndSize(499, '500g', 1)}} 
                    className={`flex-1 ont-quicksand text-base font-medium border border-bdgreen px-2 py-2 mx-2 rounded 
                    ${activeButton === 1 ? 'bg-btgreen text-bgcolor' : ' text-txtgreen hover:bg-hvgreen '}`}>
                        500g (2x250g)
                    </button>

                    <button onClick={()=>{ChangePriceAndSize(249, '250g', 2)}} 
                    className={`flex-1 font-quicksand text-base font-medium border border-bdgreen  px-2 py-2 mx-2 rounded  
                    ${activeButton === 2 ? 'bg-btgreen text-bgcolor' : ' text-txtgreen hover:bg-hvgreen'}`}>
                        250g
                    </button>
                    </div>
                </div>
                <div>
                    <div className="font-quicksand text-base font-medium ">Price</div>
                    
                    <div className="font-quicksand text-lg font-semibold ">₹{price} 
                        <span className="font-quicksand font-medium text-xs  ml-2">(Tax Included)</span>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="font-quicksand text-base font-medium flex flex-col mb-2 ">Quantity</div>

                    <button onClick={decreaseQuantity} className="border rounded-lg px-4 py-2 bg-btgreen text-bgcolor">-</button>
                    <span className="font-quicksand text-base font-medium px-4">{quantity}</span>
                    <button onClick={increaseQuantity} className="border rounded-lg px-4 py-2 bg-btgreen text-bgcolor
                    ">+</button>
                </div>
                <div className="flex w-full mt-4">
                    <Link to="/Checkout" className="flex-1">
                        <button className=" bg-btgreen text-bgcolor hover:bg-hvdarkgreen w-full p-4 rounded">Buy Now</button>
                    </Link>
                    <button onClick={toggleCart} className="flex-1 border border-bdgreen text-txtgreen hover:bg-hvgreen p-4 rounded ml-2">Add to Cart</button>
                </div>
            </div>
        </div>
    );
    
};

export default Hero;
