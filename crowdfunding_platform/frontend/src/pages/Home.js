// pages/Home.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeaderHome from '../components/layout/HeaderHome'; // Import the Header component
import Navigation from '../components/layout/Navigation'; // Import the Navigation component

const formatIDR = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
  }).format(amount);
};

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
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/campaigns/`, 
        { params: { search } }
      );
      
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

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const newTimeout = setTimeout(() => {
      fetchCampaigns(query);
    }, 500);

    setSearchTimeout(newTimeout);
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
    <div className="body">
      <HeaderHome onSearch={handleSearch} />

      {/* Featured Campaign Slider */}
      <div className="px-4 pt-4" style={{ position: 'relative', zIndex: 10 }}>
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
                <div className="p-2">
                  <h3 className="text-sm font-medium mb-2 line-clamp-2">{campaign.title}</h3>
                  {/* Progress bar */}
                  <div className="mt-1 mb-1">
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
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 mt-1">
                        Terkumpul: {campaign.current_amount ? formatIDR(campaign.current_amount) : 'Rp 0'}
                      </span>
                      <div className="text-right text-xs text-gray-500 mt-1">
                      {campaign.current_amount && campaign.target_amount 
                        ? Math.round((campaign.current_amount / campaign.target_amount) * 100) 
                        : 0}% tercapai
                    </div>
                    </div>
                  </div>
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
      <Navigation />
    </div>
  );
};

export default Home;