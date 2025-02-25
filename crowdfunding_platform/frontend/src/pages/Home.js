// pages/Home.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [featuredCampaigns, setFeaturedCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderInterval = useRef(null);

  const fetchCampaigns = async (search = '') => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/campaigns/', {
        params: { search }
      });
      
      // Regular campaigns
      setCampaigns(response.data);
      
      // Featured campaigns for slider (take first 3 or filter by is_featured if available)
      const featured = response.data.filter(campaign => 
        campaign.is_featured || campaign.category === 'peduli'
      ).slice(0, 3);
      
      setFeaturedCampaigns(featured.length > 0 ? featured : response.data.slice(0, 4));
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      setError('Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
    
    // Clean up function
    return () => {
      if (sliderInterval.current) {
        clearInterval(sliderInterval.current);
      }
    };
  }, []);

  // Set up automatic slider
  useEffect(() => {
    if (featuredCampaigns.length > 1) {
      sliderInterval.current = setInterval(() => {
        setActiveSlide(prev => (prev + 1) % featuredCampaigns.length);
      }, 5000);
    }
    
    return () => {
      if (sliderInterval.current) {
        clearInterval(sliderInterval.current);
      }
    };
  }, [featuredCampaigns]);

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

  const goToSlide = (index) => {
    setActiveSlide(index);
    // Reset timer
    if (sliderInterval.current) {
      clearInterval(sliderInterval.current);
    }
    sliderInterval.current = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % featuredCampaigns.length);
    }, 5000);
  };

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
            <div className="flex-1 max-w-[200px] ml-4">
              <input
                type="text"
                placeholder="Cari Program"
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
        {featuredCampaigns.length > 0 && (
          <div className="relative rounded-lg overflow-hidden h-56">
            {/* Slides */}
            <div className="h-full">
              {featuredCampaigns.map((campaign, index) => (
                <div 
                  key={campaign.id}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                    index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img 
                    src={campaign.thumbnail || '/images/peduli-dhuafa-banner.jpg'} 
                    alt={campaign.title}
                    className="w-full h-56 object-cover"
                    onError={(e) => {
                      e.target.src = '/images/peduli-dhuafa-banner.jpg';
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h2 className="text-white font-bold text-lg">{campaign.title}</h2>
                    <Link
                      to={`/donasi/${campaign.slug || campaign.id}`}
                      className="block text-center bg-green-800 text-white py-2 rounded-md text-sm hover:bg-green-900"
                    >
                      DONASI SEKARANG
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Indicators */}
            {featuredCampaigns.length > 1 && (
              <div className="absolute bottom-2 right-2 flex space-x-2 z-20">
                {featuredCampaigns.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === activeSlide ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
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
                <Link to={`/kampanye/${campaign.slug || campaign.id}`}>
                <img 
                  src={campaign.thumbnail || '/placeholder-image.jpg'} 
                  alt={campaign.title}
                  className="w-full h-28 object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
                </Link>
                <div className="p-3">
                  <h3 className="text-sm font-medium mb-2 line-clamp-2">{campaign.title}</h3>
                  <Link
                    to={`/donasi/${campaign.slug || campaign.id}`}
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

export default Home;