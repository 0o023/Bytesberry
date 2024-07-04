import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './navbar'; // Ensure the path is correct
import Footer from './footer'; // Ensure the path is correct
import Sidebar from './Sidebar'; // Ensure the path is correct

function ShippingDetails() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get('http://localhost:5000/get_all_shipped_order_details'); // Use the correct URL and port
        const data = Array.isArray(response.data) ? response.data : [];
        console.log('API response:', data); // Debug log
        setOrders(data); // Update the orders state
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Error fetching orders');
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  // Converting a date string into more a more readable format.
  const formatDate = (dateString) => {                   
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // returns a JSX structure 
  return (
    <div className="flex flex-col w-full h-full bg-bgcolor font-quicksand">
      <Navbar />
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col w-full p-10 box-border bg-beige">
          <div className="w-full flex flex-col items-center">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : orders.length === 0 ? (
              <div className="text-center mt-5 relative">
                <div className="flex justify-center items-center w-[400px] h-auto mt-[90px]">
                  <img 
                    src="https://static.vecteezy.com/system/resources/previews/019/787/018/non_2x/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png" 
                    alt="Empty Cart" 
                    className="w-full h-auto" 
                  />
                </div>
                <h1 className="text-[1.5em] text-black text-[#666] mt-5">
                  No shipped items yet!
                </h1>
              </div>
            ) : (
              <>
                <h1 className="text-4xl font-bold mb-2 text-[#333] mt-0 -mt-7">Shipping Details</h1>
                <div className="w-full mt-[10px]"> 
                  {orders.map((order, index) => (
                    <Link to={`/more-shipping/${order.order_id}`} key={index} className="no-underline">
                      <div 
                        className="bg-light-green text-black p-4 mb-5 rounded-md shadow-sm flex items-center w-full box-border cursor-pointer relative no-underline hover:no-underline focus:no-underline"
                        style={{ color: 'black', border: '2px ', boxShadow: '0 2px 3px #A1C398' }}
                      >
                        <div className="w-[120px] mr-20">
                          <img src={order.file_url} alt={order.product_name} className="w-3/4 h-auto rounded-md" />
                        </div>
                        <div className="flex-1 flex flex-col items-start">
                          <p className="text-2.5xl font-normal text-txtgreen"><strong>{order.product_name}</strong></p>
                          <p className="text-lg">Order number: {order.order_no}, Order Date: {formatDate(order.order_date)}</p>
                          <p className="text-lg">Customer Name: {order.customer_name}</p>
                          <p className="text-lg">Order amount: {order.order_total}, Order Status: {order.order_status}</p>
                          <p className="text-lg">Payment Status: {order.payment_status}, Payment mode: {order.payment_mode}</p>
                        </div>
                        <div className="absolute right-20 top-1/2 transform translate-y-[-50%] flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-8 h-8 text-gray-400"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer hideLine={true} hideGallery={true} className="w-full p-[2px_5px] bg-ft text-white text-center box-border text-[0.7em] relative mt-auto" />
    </div>
  );
}

export default ShippingDetails;
