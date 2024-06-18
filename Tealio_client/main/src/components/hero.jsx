/*import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from "react-feather";
import img1 from "../assets/img1.jpg"; 
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

const Hero = () => {
    const slides = [img1, img2, img3];
    const [current, setCurrent] = useState(0);
    const prev = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);
    const next = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);

    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(999);
    const [size, setSize] = useState('1Kg');
    const [activeButton, setActiveButton] = useState(0);
    const { cartOpen, toggleCart, addToCart } = useCart();
    const userId = 1024;  // Example userId, replace with actual userId from context or props

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    const changePriceAndSize = (price, size, index) => {
        setActiveButton(index);
        setPrice(price);
        setSize(size);
    };

    const handleAddToCart = () => {
        const item = {
            product_name: 'Tealio Tea',
            quantity,
            size,
            price,
            user_id: userId
        };
        console.log('Item to be added to cart:', item);  // Log the item to check its structure
        addToCart(item);
        toggleCart();
    };

    return (
        <div className={`flex flex-col md:flex-row pl-80 pt-10 pb-20 pr-20 ${cartOpen ? 'blur-sm' : ''} transition-all`}>
            <div className="md:w-1/2 md:h-[550px] xl:w-[520px] flex justify-center bg-white shadow rounded-xl p-3">
                <div className="overflow-hidden relative max-w-full max-h-full">
                    <div className="flex transition-transform ease-out duration-500 max-w-full max-h-full" style={{ transform: `translateX(-${current * 100}%)` }}>
                        {slides.map((s, index) => (
                            <img key={index} src={s} className="object-cover object-center rounded-xl" alt="product image" />
                        ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-between p-3">
                        <button onClick={prev} className="p-1 rounded-full shadow bg-white/30 text-gray-800 hover:bg-white">
                            <ChevronLeft size={30} />
                        </button>
                        <button onClick={next} className="p-1 rounded-full shadow bg-white/30 text-gray-800 hover:bg-white">
                            <ChevronRight size={30} />
                        </button>
                    </div>
                    <div className="absolute bottom-4 right-0 left-0">
                        <div className="flex items-center justify-center gap-2">
                            {slides.map((_, i) => (
                                <div key={i} className={`transition-all w-3 h-3 bg-white rounded-full ${current === i ? "p-2" : "bg-opacity-50"}`} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-1/2 pl-40 pt-10 pb-20 pr-20">
                <h1 className="font-serif text-6xl font-bold mb-4">Tealio Tea</h1>
                <div>
                    <p className="font-quicksand text-lg font-medium tracking-normal leading-loose text-justify pt-4 pb-4">
                        Experience the rich, aromatic flavor of our premium blend tea. Made from carefully selected leaves,
                        each sip offers a perfect balance of boldness and smoothness. Perfect for any time of day,
                        enjoy it hot or iced for a moment of tranquility and taste the quality in every cup.
                    </p>
                </div>
                <div className="mb-4 pt-4">
                    <div className="font-quicksand text-lg font-medium flex flex-col mb-2">Size</div>
                    <button onClick={() => changePriceAndSize(999, '1Kg', 0)} className={`font-quicksand text-base font-medium border border-gray-500  px-4 py-2 mr-2 rounded ${activeButton === 0 ? 'bg-gray-700 text-white' : ' text-gray-800 hover:bg-gray-200'}`}>
                        1kg (4x250g)
                    </button>
                    <button onClick={() => changePriceAndSize(499, '500g', 1)} className={`font-quicksand text-base font-medium border border-gray-500 px-4 py-2 mr-2 rounded ${activeButton === 1 ? 'bg-gray-700 text-white' : ' text-gray-800 hover:bg-gray-200 '}`}>
                        500g (2x250g)
                    </button>
                    <button onClick={() => changePriceAndSize(249, '250g', 2)} className={`font-quicksand text-base font-medium border border-gray-500  px-4 py-2 mr-2 rounded ${activeButton === 2 ? 'bg-gray-700 text-white' : ' text-gray-800 hover:bg-gray-200'}`}>
                        250g
                    </button>
                </div>
                <div>
                    <div className="font-quicksand text-base font-medium">Price</div>
                    <div className="font-quicksand text-lg font-semibold ">₹{price}
                        <span className="font-quicksand font-medium text-xs text-gray-800 ml-2">(Tax Included)</span>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="font-quicksand text-base font-medium flex flex-col mb-2">Quantity</div>
                    <button onClick={decreaseQuantity} className="border rounded-lg px-4 py-2 bg-gray-800 text-white">-</button>
                    <span className="font-quicksand text-base font-medium px-4">{quantity}</span>
                    <button onClick={increaseQuantity} className="border rounded-lg px-4 py-2 bg-gray-800 text-white">+</button>
                </div>
                <div className="flex mt-5">
                    <Link to="/form">
                        <button className="bg-gray-700 text-white hover:bg-gray-800 px-20 py-2 mr-2 rounded">Buy Now</button>
                    </Link>
                    <button onClick={handleAddToCart} className="border border-gray-800 text-gray-800 hover:bg-gray-300 px-20 py-2 rounded">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
*/
