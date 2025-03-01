// pages/CampaignDetail.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/layout/Header';
import Navigation from '../components/layout/Navigation';
import '../styles/Body.css';

// Inline formatIDR function
const formatIDR = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
  }).format(amount);
};

const CampaignDetail = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const [campaign, setCampaign] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('description'); // State to manage active tab

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        // Fetch campaign details
        const campaignResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/campaigns/${slug}/`);
        setCampaign(campaignResponse.data);
    
        // Fetch verified donations for the campaign
        const donationsResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/donations/campaign/${slug}/donations/`);
        setDonations(donationsResponse.data);
    
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
    <div className="body">
      <Header />

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

      {/* Tab Navigation */}
      <div className="mt-4 px-4">
        <div className="flex justify-around bg-white border-b">
          <button
            className={`py-2 px-4 text-sm font-medium ${activeTab === 'description' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('description')}
          >
            Keterangan
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium ${activeTab === 'donations' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('donations')}
          >
            Donatur
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium ${activeTab === 'updates' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('updates')}
          >
            Kabar Terbaru
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === 'description' && (
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-700">{campaign.description}</p>
            </div>
          )}

          {activeTab === 'donations' && (
            <div className="bg-white p-4 rounded-lg shadow">
              <ul>
                  {donations.length > 0 ? (
                  donations.map((donation, index) => (
                    <li key={index} className="border-b py-2 px-4">
                      <p className="text-gray-700">
                        <strong>{donation.donor_name}</strong> - {formatIDR(donation.amount)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(donation.created_at).toLocaleDateString()}
                      </p>
                    </li>
                  ))
                ) : (
                  <li className="py-2 px-4 text-gray-500">Belum ada donasi yang terverifikasi.</li>
                )}
              </ul>
            </div>
          )}

          {activeTab === 'updates' && (
            <div className="bg-white p-4 rounded-lg shadow">
              <ul>
                {campaign.updates && campaign.updates.length > 0 ? (
                  campaign.updates.map((update, index) => (
                    <li key={index} className="border-b py-2">
                      <p className="text-gray-700">
                        <strong>{update.title}</strong> - {new Date(update.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">{update.description}</p>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">Belum ada kabar terbaru.</p>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      <Navigation />     
    </div>
  );
};

export default CampaignDetail;