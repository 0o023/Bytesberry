// src/components/DeliveryTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeliveryTable = () => {
    const [deliveries, setDeliveries] = useState([]);

    useEffect(() => {
        fetchDeliveries();
    }, []);

    const fetchDeliveries = async () => {
        try {
            const response = await axios.get('http://localhost:5000/show_delivered');
            setDeliveries(response.data);
        } catch (error) {
            console.error('Error fetching deliveries:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Deliveries</h1>
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="w-1/5 py-2">Order ID</th>
                        <th className="w-1/5 py-2">Name</th>
                        <th className="w-1/5 py-2">Date</th>
                        <th className="w-1/5 py-2">Status</th>
                        <th className="w-1/5 py-2">Ordered Date</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {deliveries.map((delivery) => (
                        <tr key={delivery.order_id} className="bg-gray-100 border-b">
                            <td className="py-2 px-4">{delivery.order_id}</td>
                            <td className="py-2 px-4">{delivery.name}</td>
                            <td className="py-2 px-4">{new Date(delivery.date).toLocaleString()}</td>
                            <td className="py-2 px-4">{delivery.status}</td>
                            <td className="py-2 px-4">{new Date(delivery.ordered_date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DeliveryTable;
