// pages/CampaignDetail.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Inline formatIDR function
const formatIDR = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
  }).format(amount);
};

const CampaignDetail = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/campaigns/${slug}/`);
        setCampaign(response.data);
      } catch (err) {
        console.error('Error fetching campaign details:', err);
        setError('Failed to load campaign details');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignDetails();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src="/images/logo.png" alt="YPMN" className="h-8" />
              <span className="ml-2 font-semibold text-green-700">YPMN PEDULI</span>
            </div>
          </div>
        </div>
      </header>

      {/* Campaign Details */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-lg overflow-hidden shadow">
          <img
            src={campaign.thumbnail || '/placeholder-image.jpg'}
            alt={campaign.title}
            className="w-full h-56 object-cover"
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
            }}
          />
          <div className="p-4">
            <h1 className="text-xl font-bold mb-2">{campaign.title}</h1>
            <p className="text-gray-700 mb-4">{campaign.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Terkumpul: {campaign.current_amount ? formatIDR(campaign.current_amount) : 'Rp 0'}
              </span>
              <span className="text-sm text-gray-600">
                Target: {campaign.target_amount ? formatIDR(campaign.target_amount) : 'Rp 0'}
              </span>
            </div>
            
            {/* Progress bar */}
            <div className="mt-2 mb-3">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ 
                    width: `${campaign.current_amount && campaign.target_amount 
                      ? Math.min((campaign.current_amount / campaign.target_amount) * 100, 100) 
                      : 0}%` 
                  }}
                ></div>
              </div>
              <div className="text-right text-xs text-gray-500 mt-1">
                {campaign.current_amount && campaign.target_amount 
                  ? Math.round((campaign.current_amount / campaign.target_amount) * 100) 
                  : 0}% tercapai
              </div>
            </div>
          </div>
          <div className="p-3">
            <Link
              to={`/donasi/${campaign.slug || campaign.id}`}
              className="block text-center bg-green-800 text-white py-2 rounded-md text-sm hover:bg-green-900"
            >
              DONASI SEKARANG
            </Link>
          </div>    
        </div>
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

export default CampaignDetail;