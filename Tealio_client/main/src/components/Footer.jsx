import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
return (
   <footer className="bg-ft text-white p-4 text-center">
    <p>&copy; 2024 Tealio. All rights reserved.</p>
    <div className="mt-4">
    <h2 className="text-xl font-bold mb-2">About us</h2>
    <p>In Sikkim's fertile hills, 
        Tealio cultivates teas of unrivaled excellence. 
        With nature's blessings and meticulous craftsmanship,
        Tealio's teas captivate with their exquisite flavors and fragrances. 
       Experience the essence of Sikkim in every sip, a testament to 
       Tealio's commitment to quality and tradition. 
      </p>
      <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Follow us on Social Media</h2>
       <div className="flex justify-center mb-4">
        <a href="https://www.instagram.com/temiteasocial?igsh=Z2xrMHgxZmYxcGhu&utm_source=qr" className="mr-4"
        target="_blank"
         rel="noopener noreferrer">
        <img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-256.png" alt="Instagram" className="h-6 w-6" />
        </a>
     <a href="https://youtu.be/-E6Z9C0BNfk?si=xkiDMjE_jq20i9kE" className="mr-4"
        target="_blank" 
         rel="noopener noreferrer">
        <img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Youtube_colored_svg-256.png" alt="YouTube" className="h-6 w-6" />
         </a>
       <a href="https://www.facebook.com/sikkimtemitea/" className="mr-4"
        target="_blank"
         rel="noopener noreferrer">
        <img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-256.png" alt="Facebook" className="h-6 w-6" />
          </a>
         </div>
      </div>   
   <div className="md:w-1/3 text-center md:text-left">
       <h2 className="text-xl font-bold mb-2">Info</h2>
                    <div className="flex flex-col ">
                        <Link to="/terms-of-service" className="mb-1">Terms of Services</Link>
                        <Link to="/privacy-policy" className="mb-1">Privacy Policy</Link>
                        <Link to="/refund-policy" className="mb-1">Refund Policy</Link>
                        <Link to="/contact-info" className="mb-1">Contact Info</Link>
                        <Link to="/shipping-policy" className="mb-1">Shipping Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;