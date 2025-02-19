// pages/DonationPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const DonationPage = () => {
  const { slug } = useParams();
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    hideIdentity: false,
    phone: '',
    email: '',
    message: ''
  });

  const donationAmounts = [
    { label: 'Rp 25 rb', value: 25000 },
    { label: 'Rp 50 rb', value: 50000 },
    { label: 'Rp 100 rb', value: 100000 },
    { label: 'Rp 200 rb', value: 200000 },
    { label: 'Rp 500 rb', value: 500000 },
    { label: 'Rp 1 jt', value: 1000000 },
    { label: 'Rp 2,5 jt', value: 2500000 },
    { label: 'Rp 5 jt', value: 5000000 },
    { label: 'Rp 10 jt', value: 10000000 },
    { label: 'Rp 20 jt', value: 20000000 },
    { label: 'Rp 50 jt', value: 50000000 },
    { label: 'Nominal Lainnya', value: 'custom' }
  ];

  const banks = [
    {
      id: 'bsi',
      name: 'Bank Syariah Indonesia',
      logo: '/images/bank-bsi.png'
    },
    {
      id: 'bjb',
      name: 'Bank Jabar Banten Syariah',
      logo: '/images/bank-bjb.png'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      amount: selectedAmount === 'custom' ? customAmount : selectedAmount,
      bank: selectedBank,
      ...formData
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-20">
      {/* Header with program image */}
      <div className="bg-gradient-to-r from-green-500 to-green-600">
        <img 
          src={`/images/${slug}.jpg`}
          alt="Program Banner"
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-6 text-center">Donasi Terbaik Anda</h2>

        {/* Donation Amount Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {donationAmounts.map((amount) => (
            <button
              key={amount.value}
              className={`py-2 px-4 rounded-full text-sm font-medium ${
                selectedAmount === amount.value
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
              onClick={() => setSelectedAmount(amount.value)}
            >
              {amount.label}
            </button>
          ))}
        </div>

        {/* Custom Amount Input */}
        {selectedAmount === 'custom' && (
          <div className="mb-6">
            <div className="flex items-center bg-white rounded-lg px-3">
              <span className="text-gray-500">Rp</span>
              <input
                type="number"
                className="flex-1 py-2 px-2 outline-none"
                placeholder="Masukan Nominal"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Payment Method */}
        <h3 className="font-semibold mb-3">Metode Pembayaran</h3>
        <div className="space-y-3 mb-6">
          {banks.map((bank) => (
            <label
              key={bank.id}
              className={`flex items-center p-3 rounded-lg ${
                selectedBank === bank.id ? 'bg-green-50 border-green-500' : 'bg-white'
              }`}
            >
              <input
                type="radio"
                name="bank"
                value={bank.id}
                checked={selectedBank === bank.id}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="mr-3"
              />
              <img src={bank.logo} alt={bank.name} className="h-6 mr-2" />
              <span>{bank.name}</span>
            </label>
          ))}
        </div>

        {/* Personal Data Form */}
        <h3 className="font-semibold mb-3">Data Anda</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Nama Lengkap Anda"
              className="w-full p-3 rounded-lg"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="hideIdentity"
                checked={formData.hideIdentity}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span>Sembunyikan Nama Anda (Hamba Allah)</span>
            </label>
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="No Whatsapp atau Handphone"
              className="w-full p-3 rounded-lg"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Anda (tidak wajib)"
              className="w-full p-3 rounded-lg"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Pesan atau do'a Anda (tidak wajib)"
              className="w-full p-3 rounded-lg"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium"
          >
            Lanjutkan Pembayaran
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationPage;