
import React from 'react';
import { useCart } from './CartContext';
import { X } from 'react-feather';
import { Link } from 'react-router-dom';

const SideCart = () => {
  const { cartOpen, toggleCart, cartItems, removeFromCart, incrementQuantity, decrementQuantity } = useCart();
  
  console.log('cartItems:', cartItems); // Add this line to log cartItems

  // Calculate the total price of the cart
  const totalCartPrice = cartItems.reduce((acc, item) => {
    const itemTotal = item.productdetails.reduce((itemAcc, detail) => {
      return itemAcc + (detail.price * detail.quantity);
    }, 0);
    return acc + itemTotal;
  }, 0);

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
            cartItems.map((item, index) => {
              console.log('orderno cart:', item); // Add this line to log orderno
              return (
                <div key={`${item.orderno}-${index}`} className="bg-gray-100 p-4 rounded-lg shadow-md">
                  {item.productdetails && item.productdetails.length > 0 ? (
                    item.productdetails.map((detail, detailIndex) => (
                      <div key={`${detail.product_name}-${detailIndex}`} className="flex items-center justify-between mb-4">
                        <div className="ml-4 flex-1">
                          <div className="flex flex-row w-full">
                            <p className="text-xl font-medium text-black">{detail.product_name}</p>
                            <p className="text-xl font-medium text-black ml-10">Size: {detail.size}</p>
                          </div>
                          <div className="flex items-center py-5">
                            <button onClick={() => decrementQuantity(item.orderno)} className="border rounded px-2 py-1 text-gray-700 bg-gray-200 hover:bg-gray-300">-</button>
                            <p className="text-gray-600 mx-2">Quantity: {detail.quantity}</p>
                            <button onClick={() => incrementQuantity(item.orderno)} className="border rounded px-2 py-1 text-gray-700 bg-gray-200 hover:bg-gray-300">+</button>
                          </div>
                          <p className="text-gray-800">₹{detail.price}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.orderno)} className="text-red-500 hover:text-red-700 ml-4">
                          Remove
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No product details available</p>
                  )}
                  <div className="mt-6">
                    <p className="text-sm text-gray-500 mt-1">* Shipping calculated at checkout</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="mt-6">
            <div className="text-lg font-semibold text-black">Cart Total: ₹{totalCartPrice}</div>
            <p className="text-sm text-gray-500 mt-1">* Shipping calculated at checkout</p>
            <Link to="/form">
              <button onClick={toggleCart} className="mt-4 w-full bg-gray-700 text-white hover:bg-gray-800 py-2 rounded-lg">
                Continue to Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideCart;



