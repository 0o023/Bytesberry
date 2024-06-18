/*
import React from 'react';
import { useCart } from './CartContext';
import { X } from "react-feather";

const SideCart = () => {
  const { cartOpen, toggleCart, cartItems, removeFromCart, incrementQuantity, decrementQuantity, addToCart } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={`fixed top-0 right-0 w-1/2 h-full bg-white shadow-lg transform transition-transform ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-6 overflow-y-auto h-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-black">Your Cart</h2>
          <button onClick={toggleCart} className="text-red-500 hover:text-red-700 text-lg font-semibold">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
        {cartItems.length === 0 ? (
  <p className="text-black">Your cart is empty</p>
) : (
  cartItems.map((item, index) => (
    <div key={`${item.id}-${index}`} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="ml-4 flex-1">
        <p className="text-lg font-medium text-black">{item.product_name}</p>
        <p className="text-md text-gray-600">{item.size}</p>
        <div className="flex items-center">
          <button onClick={() => decrementQuantity(item.id)} className="border rounded px-2 py-1 text-gray-700 bg-gray-200 hover:bg-gray-300">-</button>
          <p className="text-gray-600 mx-2">Quantity: {item.quantity}</p>
          <button onClick={() => incrementQuantity(item.id)} className="border rounded px-2 py-1 text-gray-700 bg-gray-200 hover:bg-gray-300">+</button>
        </div>
        <p className="text-gray-800">₹{item.price}</p>
      </div>
      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 ml-4">
        Remove
      </button>
    </div>
  ))
)}

          {cartItems.length > 0 && (
            <div className="mt-6">
              <div className="text-lg font-semibold text-black">Total: ₹{total}</div>
              <p className="text-sm text-gray-500 mt-1">* Shipping calculated at checkout</p>
              <button className="mt-4 w-full bg-gray-700 text-white hover:bg-gray-800 py-2 rounded-lg">
                Continue to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideCart;
*/

