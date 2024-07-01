// Overlay.jsx

import React from 'react';

const Overlay = ({ content, closeOverlay }) => {
    return (
        <div className="overlay">
            <div className="overlay-content">
                <button className="close-btn" onClick={closeOverlay}>Close</button>
                <h2>{content}</h2>
                {/* Additional content based on overlay type */}
            </div>
        </div>
    );
};

export default Overlay;
