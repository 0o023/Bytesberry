import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Checkout({ totalAmount }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    whatsappUpdates: false,
    country: '',
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pinCode: '',
    phone: '',
    saveInfo: false,
    shippingAddress: '',
    paymentMethod: false,
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setErrors({
      ...errors,
      [name]: false,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.pinCode) newErrors.pinCode = 'PIN code is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    return newErrors;
  };

  const generateOrderNumber = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
  
    return `${year}${month}${day}${hours}${minutes}`;
  };

  const [sentData, setsentData] = useState({
    order_date: '',
    billing_add: '',
    payment_mode: 'Cod',
    order_status: 'initiated',
    order_no: 0,
    payment_status: 'successful',
    order_total: 1000,
    customer_email: '',
    customer_phone_no: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setFormSubmitted(true);
    } else {
      const orderNumber = generateOrderNumber();
      const orderDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

      // Update sentData with formData
      const updatedSentData = {
        
        order_date: orderDate,
        billing_add: `${formData.address}, ${formData.apartment}, ${formData.city}, ${formData.state}, ${formData.pinCode}, ${formData.country}`,
        payment_mode: 'Cod',
        order_status: 'initiated',
        order_no: orderNumber,
        payment_status:'successful',
        customer_email: formData.email,
        order_total: 1000,
        customer_phone_no: formData.phone
      };
      setsentData(updatedSentData);

      console.log("Updated sentData:", updatedSentData); // Log the updated sentData
      
      try {
        const response = await axios.post('http://localhost:5000/insert_orders', updatedSentData);
        console.log('Order response:', response.data);
      } catch (error) {
        if (error.response) {
          // Server responded with a status code outside the 2xx range
          console.error('Response error:', error.response.data);
        } else if (error.request) {
          // Request was made but no response was received
          console.error('Request error:', error.request);
        } else {
          // Other errors
          console.error('Error', error.message);
        }
        console.error('Error config:', error.config);
      }
      
      

      // Redirect to order summary page with form data and sentData
      navigate('/order-summary', { state: { ...formData, totalAmount, orderNumber, updatedSentData } });
    }
  };

  return (
    <div className="p-10 bg-bgcolor min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-btgreen text-white text-center py-2">
          <h2 className="text-3xl font-bold">Checkout</h2>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-5">Contact Information</h3>
            <label htmlFor="email" className="block">Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              className={`border p-2 w-full ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            <label className="mt-2 flex items-center">
              <input
                type="checkbox"
                name="whatsappUpdates"
                checked={formData.whatsappUpdates}
                onChange={handleChange}
                className="mr-2"
              />
              Receive updates on WhatsApp
            </label>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold mb-5">Delivery Address</h3>
            <label htmlFor="country" className="block">Country/Region <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="country"
              id="country"
              placeholder="Enter country/region"
              value={formData.country}
              onChange={handleChange}
              className={`border p-2 w-full ${errors.country ? 'border-red-500' : ''}`}
            />
            {errors.country && <p className="text-red-500">{errors.country}</p>}
            <div className="flex mt-2">
              <div className="flex-1 mr-2">
                <label htmlFor="firstName" className="block">First Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`border p-2 w-full ${errors.firstName ? 'border-red-500' : ''}`}
                />
                {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="block">Last Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`border p-2 w-full ${errors.lastName ? 'border-red-500' : ''}`}
                />
                {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
              </div>
            </div>
            <label htmlFor="company" className="block mt-2">Company (optional)</label>
            <input
              type="text"
              name="company"
              id="company"
              value={formData.company}
              onChange={handleChange}
              className="border p-2 w-full"
            />
            <label htmlFor="address" className="block mt-2">Address <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              className={`border p-2 w-full ${errors.address ? 'border-red-500' : ''}`}
            />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
            <label htmlFor="apartment" className="block mt-2">Apartment, suite, etc. (optional)</label>
            <input
              type="text"
              name="apartment"
              id="apartment"
              placeholder="Enter the apartment no."
              value={formData.apartment}
              onChange={handleChange}
              className="border p-2 w-full"
            />
            <div className="flex mt-2">
              <div className="flex-1 mr-2">
                <label htmlFor="city" className="block">City <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="Enter the city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`border p-2 w-full ${errors.city ? 'border-red-500' : ''}`}
                />
                {errors.city && <p className="text-red-500">{errors.city}</p>}
              </div>
              <div className="flex-1">
                <label htmlFor="state" className="block">State <span className="text-red-500">*</span></label>
                <select
                  name="state"
                  id="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`border p-2 w-full ${errors.state ? 'border-red-500' : ''}`}
                >
                  <option value="">Select</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chattisgarh">Chattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerela">Kerela</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharastra">Maharastra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
                {errors.state && <p className="text-red-500">{errors.state}</p>}
              </div>
            </div>
            <label htmlFor="pinCode" className="block mt-2">PIN Code <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="pinCode"
              id="pinCode"
              placeholder="Enter the PIN code"
              value={formData.pinCode}
              onChange={handleChange}
              className={`border p-2 w-full ${errors.pinCode ? 'border-red-500' : ''}`}
            />
            {errors.pinCode && <p className="text-red-500">{errors.pinCode}</p>}
            <label htmlFor="phone" className="block mt-2">Phone Number <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Enter the phone number"
              value={formData.phone}
              onChange={handleChange}
              className={`border p-2 w-full ${errors.phone ? 'border-red-500' : ''}`}
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-5">Payment Method</h3>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="paymentMethod"
                checked={formData.paymentMethod}
                onChange={handleChange}
                className="mr-2"
              />
              Cash On Delivery
            </label>
          </div>

          <div className="text-center">
            <button type="submit" className="bg-btgreen text-white px-4 py-2 rounded">
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
