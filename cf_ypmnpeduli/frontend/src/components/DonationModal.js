import React, { useState } from 'react';
import axios from 'axios';

const DonationModal = ({ program, onClose, onDonate }) => {
  const [formData, setFormData] = useState({
    amount: '',
    donor_name: '',
    donor_email: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8000/api/donations/`, {
        program: program.id,
        ...formData
      });
      onDonate();
      onClose();
    } catch (error) {
      console.error('Error submitting donation:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Donasi untuk {program.title}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Jumlah Donasi (Rp)</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nama</label>
            <input
              type="text"
              value={formData.donor_name}
              onChange={(e) => setFormData({...formData, donor_name: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.donor_email}
              onChange={(e) => setFormData({...formData, donor_email: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Pesan (opsional)</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-700"
            >
              Donasi
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationModal;