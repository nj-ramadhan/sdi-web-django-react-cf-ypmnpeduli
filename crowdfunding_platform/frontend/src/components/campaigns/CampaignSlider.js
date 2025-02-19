// components/CampaignSlider.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CampaignSlider = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/campaigns/');
        setCampaigns(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch campaigns');
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Featured Campaigns</h2>
        <div className="flex space-x-4 overflow-x-auto">
          {campaigns.map((campaign) => (
            <div 
              key={campaign.id} 
              className="flex-none w-64 bg-white rounded-lg shadow-md"
            >
              <div className="relative h-40 w-full">
                <img
                  src={campaign.thumbnail || '/placeholder-image.jpg'} // Fallback image
                  alt={campaign.title}
                  className="w-full h-full object-cover rounded-t-lg"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg'; // Fallback on error
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{campaign.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {campaign.description?.substring(0, 100)}...
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-medium">
                    ${campaign.current_amount || 0} raised
                  </span>
                  <Link 
                    to={`/campaign/${campaign.id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignSlider;