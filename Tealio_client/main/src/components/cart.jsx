import React, { forwardRef } from 'react';
import { useCart } from './CartContext';

const SideCart = forwardRef((props, ref) => {
  const { cartOpen, toggleCart } = useCart();

  return (
    <div
      ref={ref}
      className={`fixed top-0 right-0 w-96 h-full bg-white shadow-lg transform transition-transform ${
        cartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4">
        <h2 className="text-xl font-semibold">Your Cart</h2>
        <button onClick={toggleCart} className="mt-4 p-2 bg-red-500 text-white rounded">
          Close
        </button>
      </div>
      {/* Add your cart items here */}
    </div>
  );
});

export default SideCart;
