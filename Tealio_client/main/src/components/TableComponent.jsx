import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './navbar'; // Ensure the path is correct
import Footer from './footer'; // Ensure the path is correct
import Sidebar from './Sidebar'; // Ensure the path is correct
import Modal from './Modal'; // Ensure the path is correct

const TableComponent = () => {
  const { tableName } = useParams();
  const [data, setData] = useState([]);
  const [awbTrackingNo, setAwbTrackingNo] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_order_tracking_details');
        setData(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, []);

  const handleMarkDelivered = async (index) => {
    const order_id = data[index].order_id;
    const tracking_id = data[index].tracking_id;
    const url = 'http://localhost:5000/edit_status';
    const deleteUrl = `http://localhost:5000/delete_order_tracking_by_id/${tracking_id}`;
    const dataToSend = {
      order_id: order_id,
      order_status: 'delivered' // Set the desired order status
    };

    try {
      const response = await axios.put(url, dataToSend);
      console.log('Response:', response.data);

      const response1 = await axios.delete(deleteUrl);
      console.log('Response:', response1.data);

      const newResponse = await axios.get('http://localhost:5000/show_order_tracking');
      setData(newResponse.data);
    } catch (error) {
      console.error('There was an error!', error);
      console.error('Error details:', error.response ? error.response.data : error.message);
    }
  };

  const handleAssignAwb = (index) => {
    setSelectedOrderIndex(index);
    setAwbTrackingNo(data[index].awb_tracking_no || '');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrderIndex(null);
  };

  const handleSaveAwbTrackingNo = async () => {
    if (selectedOrderIndex !== null) {
      const url = 'http://localhost:5000/update_awb_tracking_no';
      const dataToSend = {
        order_no: data[selectedOrderIndex].order_no,
        awb_tracking_no: awbTrackingNo
      };

      try {
        const response = await axios.put(url, dataToSend);
        console.log('Response:', response.data);

        // Fetch the latest data after a successful update
        const newResponse = await axios.get('http://localhost:5000/get_order_tracking_details');
        setData(newResponse.data);

        handleCloseModal();
      } catch (error) {
        console.error('There was an error!', error);
        console.error('Error details:', error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-bgcolor font-quicksand">
      <Navbar />
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col w-full p-10 box-border bg-beige">
          <div className="w-full flex flex-col items-center">
            <div className="w-full">
              <h2 className="text-3xl font-bold text-[#333] mb-4">Tracking Details</h2>
              <div className="overflow-auto">
                <table className="min-w-full bg-white border-collapse table-component">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-200 bg-[#79ab70] text-black text-left">Order No</th>
                      <th className="py-2 px-4 border-b border-gray-200 bg-[#79ab70] text-black text-left">AWB Tracking No</th>
                      <th className="py-2 px-4 border-b border-gray-200 bg-[#79ab70] text-black text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-even-row text-black' : 'bg-odd-row text-black'}>
                        <td className="py-2 px-4 border-b border-gray-200">{item.order_no}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{item.awb_tracking_no}</td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          <button
                            onClick={() => handleMarkDelivered(index)}
                            className="p-2 bg-[#0967c5] text-white rounded hover:bg-[#3aabe0] mr-2"
                          >
                            Mark Delivered
                          </button>
                          <button
                            onClick={() => handleAssignAwb(index)}
                            className="p-2 bg-[#0967c5] text-white rounded hover:bg-[#3aabe0]"
                          >
                            Assign Awb No.
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveAwbTrackingNo}
                awbTrackingNo={awbTrackingNo}
                setAwbTrackingNo={setAwbTrackingNo}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer hideLine={true} hideGallery={true} className="w-full p-[2px_5px] bg-ft text-white text-center box-border text-[0.7em] relative mt-auto" />
    </div>
  );
};

export default TableComponent;
