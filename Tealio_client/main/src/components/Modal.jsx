import React from 'react';
import './Modal.css'; // Make sure this CSS file includes the styles

const Modal = ({ isOpen, onClose, onSave, awbTrackingNo, setAwbTrackingNo }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2><strong>Assign AWB Tracking No</strong></h2>
        <br/>
        <input
          type="text"
          placeholder="Enter AWB Tracking No"
          value={awbTrackingNo}
          onChange={(e) => setAwbTrackingNo(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={onSave} className="button-save">Save</button>
          <button onClick={onClose} className="button-cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
