import React from 'react';
import './Footer.css'; // Import the Footer.css file

const Footer = ({ hideLine, hideGallery }) => {
  return (
    <footer className={`footer ${hideLine ? 'no-line' : ''}`}>
      <div className="footer-content">
        {!hideGallery && (
          <div className="footer-section gallery">
            <h2>Gallery</h2>
            <div className="gallery-images">
              <img src="https://images.thequint.com/thequint%2F2022-08%2F9554ffa8-f0aa-4a3b-8d5b-2eb33723c56c%2Fwhite_cup_with_tea_in_hand_on_background_of_green_tea_plantation_and_picture_id1212664938.jpg" alt="Tea 1" />
              <img src="https://imageio.forbes.com/specials-images/imageserve/5f6c061ca71799093f55fd02/Aromatic-herbal-tea-/0x0.jpg?format=jpg&crop=5029,3354,x0,y0,safe&width=960" alt="Tea 2" />
              <img src="https://images.meesho.com/images/products/337845252/5iaja_512.jpg" alt="Tea 3" />
              <img src="https://thumbs.dreamstime.com/b/aromatic-black-tea-loose-dried-leaves-wooden-table-158720627.jpg" alt="Tea 4" />
              <img src="https://static.wixstatic.com/media/ce061f_2c2fa7d74ca54b7abfdc79d3e16c59df~mv2.png/v1/fill/w_480,h_480,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ce061f_2c2fa7d74ca54b7abfdc79d3e16c59df~mv2.png" alt="Tea 5" />
            </div>
          </div>
        )}
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Tealio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
