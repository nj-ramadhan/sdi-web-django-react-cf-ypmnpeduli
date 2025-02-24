// pages/CampaignPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CampaignPage = () => {
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

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            <Link
                to={`/donasi/${campaign.slug || campaign.id}`}
                className="block text-center bg-green-800 text-white py-2 rounded-md text-sm hover:bg-green-900"
            >
                DONASI SEKARANG
            </Link>
          </button>
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

export default CampaignPage;