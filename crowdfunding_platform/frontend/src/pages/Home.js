// pages/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);

  const fetchCampaigns = async (search = '') => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/campaigns/', {
        params: { search }
      });
      setCampaigns(response.data);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      setError('Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const newTimeout = setTimeout(() => {
      fetchCampaigns(query);
    }, 500);

    setSearchTimeout(newTimeout);
  };

  return (
    // Main wrapper with max width for mobile-like view
    <div className="mx-auto max-w-md min-h-screen bg-gray-100 relative">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src="/images/logo.png" alt="YPMN" className="h-8" />
            </div>
            <div className="flex-1 max-w-[200px] ml-4">
              <input
                type="text"
                placeholder="cari program"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 border rounded-full text-sm"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Featured Campaign Slider */}
      <div className="px-4 pt-4">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg overflow-hidden">
          <img 
            src="/images/peduli-dhuafa-banner.jpg" 
            alt="Featured Campaign"
            className="w-full h-48 object-cover"
          />
        </div>
      </div>

      {/* Campaign Grid */}
      <div className="px-4 py-4">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {campaigns.map(campaign => (
              <div key={campaign.id} className="bg-white rounded-lg overflow-hidden shadow">
                <img 
                  src={campaign.thumbnail || '/placeholder-image.jpg'} 
                  alt={campaign.title}
                  className="w-full h-32 object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
                <div className="p-3">
                  <h3 className="text-sm font-medium mb-2 line-clamp-2">{campaign.title}</h3>
                  <Link
                    to={`/donasi/${campaign.slug}`}
                    className="block text-center bg-green-800 text-white py-2 rounded-md text-sm hover:bg-green-900"
                  >
                    DONASI SEKARANG
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-4 text-red-500">
            {error}
            <button 
              onClick={() => fetchCampaigns(searchQuery)} 
              className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Coba Lagi
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-md mx-auto">
        <div className="flex justify-around py-3">
          <Link to="/" className="flex flex-col items-center text-green-600">
            <span className="material-icons">home</span>
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/tentang-kami" className="flex flex-col items-center text-gray-600">
            <span className="material-icons">group</span>
            <span className="text-xs">Tentang Kami</span>
          </Link>
          <Link to="/hubungi-kami" className="flex flex-col items-center text-gray-600">
            <span className="material-icons">phone</span>
            <span className="text-xs">Hubungi Kami</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Home;