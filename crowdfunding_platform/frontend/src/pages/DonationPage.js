// pages/DonationPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DonationPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    hideIdentity: false,
    phone: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    // Fetch campaign details
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/campaigns/${slug}/`);
        setCampaign(response.data);
      } catch (err) {
        console.error('Error fetching campaign:', err);
        // Use placeholder data if API fails
        setCampaign({
          title: 'Program Donasi',
          banner: `/images/${slug}.jpg`
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [slug]);

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
      name: 'Bank BSI',
      logo: '/images/bsi-logo.png'
    },
    {
      id: 'bjb',
      name: 'Bank BJB Syariah',
      logo: '/images/bjb-logo.png'
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
    
    // Validate form
    if (!selectedAmount || (selectedAmount === 'custom' && !customAmount)) {
      alert('Silakan pilih nominal donasi');
      return;
    }
    
    if (!selectedBank) {
      alert('Silakan pilih metode pembayaran');
      return;
    }
    
    // Prepare donation data
    const amount = selectedAmount === 'custom' ? parseInt(customAmount) : selectedAmount;
    
    // Generate random 3-digit code to make amount unique (like 500021)
    const uniqueDigits = Math.floor(Math.random() * 900) + 100;
    const finalAmount = Math.floor(amount / 1000) * 1000 + (uniqueDigits % 1000);
    
    // Set the display name based on hideIdentity checkbox
    const displayName = formData.hideIdentity ? "Hamba Allah" : formData.fullName;
    
    // Navigate to payment confirmation with data
    navigate('/konfirmasi-pembayaran', { 
      state: { 
        amount: finalAmount,
        bank: selectedBank,
        campaignSlug: slug,
        campaignTitle: campaign?.title || 'Program Donasi',
        displayName: displayName,  // Use displayName instead of fullName
        fullName: formData.fullName, // Still keep the actual name for records
        hideIdentity: formData.hideIdentity,
        phone: formData.phone,
        email: formData.email,
        message: formData.message
      } 
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center">
            <img src="/images/logo.png" alt="YPMN" className="h-8" />
            <span className="ml-2 font-semibold text-green-700">YPMN PEDULI</span>
          </div>
        </div>
      </header>
      {/* Header with program image - now dynamic */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 relative">
        {loading ? (
          <div className="w-full h-48 bg-green-500 animate-pulse"></div>
        ) : (
          <>
            <img 
              src={campaign?.thumbnail || campaign?.banner || `/images/${slug}.jpg`}
              alt={campaign?.title || "Program Banner"}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = '/images/default-campaign.jpg';
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h1 className="text-white font-bold text-xl">
                {campaign?.title || 'Program Donasi'}
              </h1>
            </div>
          </>
        )}
      </div>

      <div className="container mx-auto px-4 py-6 max-w-md">
        <h2 className="text-xl font-semibold mb-6 text-center">Donasi Terbaik Anda</h2>

        {/* Donation Amount Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {donationAmounts.map((amount) => (
            <button
              key={amount.value}
              className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                selectedAmount === amount.value
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-green-50'
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
            <div className="flex items-center bg-white rounded-lg px-3 shadow-sm">
              <span className="text-gray-500">Rp</span>
              <input
                type="number"
                className="flex-1 py-3 px-2 outline-none"
                placeholder="Masukan Nominal"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Payment Method */}
        <h3 className="font-semibold mb-3">Transfer ke</h3>
        <div className="space-y-3 mb-6">
          {banks.map((bank) => (
            <label
              key={bank.id}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                selectedBank === bank.id 
                  ? 'bg-green-50 border border-green-500' 
                  : 'bg-white border border-transparent hover:bg-green-50/50'
              }`}
            >
              <input
                type="radio"
                name="bank"
                value={bank.id}
                checked={selectedBank === bank.id}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="mr-3 accent-green-600"
              />
              <img src={bank.logo} alt={bank.name} className="h-6 mr-2" />
              <span>{bank.name}</span>
            </label>
          ))}
        </div>

        {/* Personal Data Form */}
        <h3 className="font-semibold mb-3">Data Anda</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center mb-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="hideIdentity"
                  checked={formData.hideIdentity}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setFormData(prev => ({
                      ...prev,
                      hideIdentity: isChecked,
                      fullName: isChecked ? "Hamba Allah" : ""
                    }));
                  }}
                  className="mr-2 accent-green-600"
                />
                <span className="text-sm">Sembunyikan Nama Anda (Hamba Allah)</span>
              </label>
            </div>

            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Nama Lengkap Anda"
                className={`w-full p-3 rounded-lg border ${formData.hideIdentity ? 'bg-gray-100 border-gray-300' : 'border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500'} outline-none`}
                value={formData.fullName}
                onChange={handleInputChange}
                disabled={formData.hideIdentity}
                required
              />
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                placeholder="No Whatsapp atau Handphone (opsional)"
                className="w-full p-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Anda (opsional)"
              className="w-full p-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Pesan atau do'a Anda (opsional)"
              className="w-full p-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
              rows="3"
              value={formData.message}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Lanjutkan Pembayaran
          </button>
        </form>
      </div>
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-md mx-auto">
        <div className="flex justify-around py-3">
          <Link to="/" className="flex flex-col items-center text-green-600">
            <span className="material-icons">home</span>
            <span className="text-xs">Beranda</span>
          </Link>
          <Link to="/tentang-kami" className="flex flex-col items-center text-gray-600">
            <span className="material-icons">group</span>
            <span className="text-xs">Tentang</span>
          </Link>
          <Link to="/hubungi-kami" className="flex flex-col items-center text-gray-600">
            <span className="material-icons">phone</span>
            <span className="text-xs">Kontak</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default DonationPage;