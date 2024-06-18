import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

const Navbar = () => {
    const { cartOpen, toggleCart } = useCart();

    return (
        <nav className="fixed top-0 left-0 w-full bg-ft shadow-md p-4 flex justify-between items-center z-50">
            <div className="flex items-center">
                <img 
                    src="https://t3.ftcdn.net/jpg/04/52/42/04/360_F_452420456_98FldcaQpEz84hGfz3DjYB5GIUYqmEoH.jpg" 
                    alt="Tealio Logo"
                    className="h-20" // Adjust the height as needed
                />
            </div>
            <ul className="flex space-x-4">
                <li><Link to="/" className="text-bgcolor">Home</Link></li>
                <li><div onClick={toggleCart} className="text-bgcolor hover:cursor-pointer">Cart 🛒</div></li>
            </ul>
        </nav>
    );
};

export default Navbar;