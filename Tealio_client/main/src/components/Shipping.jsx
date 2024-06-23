import React from 'react';

function Shipping() {
  return (
    <div className="bg-light-green rounded-2xl shadow-md w-[300px] h-[200px] m-5 p-6 flex items-center relative cursor-pointer transform transition-transform hover:-translate-y-1 hover:shadow-lg hover:bg-darker-green">
      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGGDKEOzSNQf30dPUoZrZDroquLEUsXDQ2XRt04SN5aIJMdnLoml1-Fi3KOCzxGINOVZs&usqp=CAU" 
        alt="Shipping" 
        className="w-[70px] h-auto mx-auto my-5" 
      />
      <div className="px-5">
        <h2 className="text-3xl text-black mb-2">Shipping</h2>
        <p className="text-xl text-black">View your shipping details</p>
      </div>
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center justify-center text-gray-400">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          className="w-7 h-7"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

export default Shipping;
