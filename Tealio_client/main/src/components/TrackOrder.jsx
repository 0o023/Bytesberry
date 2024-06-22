import React, { useState } from 'react';

const TrackOrder = () => {
    const [orderId, setOrderId] = useState('');

    const handleInputChange = (e) => {
        setOrderId(e.target.value);
    };

    const handleTrackOrder = () => {
        // Implement order tracking logic here
        console.log('Tracking order:', orderId);
    };

    return (
        <div className="container mx-auto p-9">
            <h1 className="text-2xl font-bold text-center mb-3 text-btgreen">Track Your Order</h1>
            <div className="max-w-md mx-auto">
                <table className="table-auto w-full">
                    <tbody>
                        <tr>
                            <td className="py-2 text-right pr-4">
                                <label htmlFor="orderId" className="text-sm font-medium text-gray-700">Order Number:</label>
                            </td>
                            <td className="py-2">
                                <input
                                    id="orderId"
                                    type="text"
                                    value={orderId}
                                    onChange={handleInputChange}
                                    placeholder="Enter your order ID"
                                    className="border border-grey-500 p-1 rounded-md w-full"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-center mt-4">
                    <button
                        type="submit"
                        onClick={handleTrackOrder}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md"
                    >
                        Track Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrackOrder;
