import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

const Navbar = () => {
    const { cartOpen, toggleCart } = useCart();
    const [isShrunk, setIsShrunk] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsShrunk(true);
            } else {
                setIsShrunk(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full bg-ft shadow-md flex justify-between items-center z-50 transition-all duration-300 ${isShrunk ? 'p-2' : 'p-4'}`}>
            <div className="flex items-center">
                <img 
                    src="https://t3.ftcdn.net/jpg/04/52/42/04/360_F_452420456_98FldcaQpEz84hGfz3DjYB5GIUYqmEoH.jpg" 
                    alt="Tealio Logo"
                    className={`transition-all duration-500 ${isShrunk ? 'h-12' : 'h-20'}`} 
                />
            </div>
            <ul className="flex space-x-4">
                <li><Link to="/" className="text-white">Home</Link></li>
                <li><Link to="/track-order" className="text-white">Track Order</Link></li>
                <li><div onClick={toggleCart} className="text-white hover:cursor-pointer">Cart 🛒</div></li>
            </ul>
        </nav>
    );
};

export default Navbar;
