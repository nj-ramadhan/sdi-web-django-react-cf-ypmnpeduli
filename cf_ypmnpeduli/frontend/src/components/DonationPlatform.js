import React, { useState, useEffect } from 'react';
import { Search, Home, Users, MessageCircle } from 'lucide-react';
import { fetchPrograms } from '../services/api';
import DonationModal from './DonationModal';

const DonationCard = ({ program, onClick }) => {
  // Function to handle image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/api/placeholder/400/300'; // Default placeholder
    if (imageUrl.startsWith('http')) return imageUrl;
    return `http://localhost:8000${imageUrl}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-2 mb-4">
      <img 
        src={getImageUrl(program.image)} 
        alt={program.title} 
        className="w-full h-48 object-cover rounded-lg mb-2"
        onError={(e) => {
          e.target.src = '/api/placeholder/400/300'; // Fallback if image fails to load
        }}
      />
      <h3 className="text-center text-sm mb-2">{program.title}</h3>
      <button 
        onClick={onClick}
        className="w-full bg-emerald-800 text-white py-2 px-4 rounded-full hover:bg-emerald-700 transition-colors"
      >
        DONASI SEKARANG
      </button>
    </div>
  );
};

const DonationPlatform = () => {
  const [programs, setPrograms] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const data = await fetchPrograms();
        console.log('Fetched programs:', data); // Debug log
        setPrograms(data);
      } catch (err) {
        console.error('Error details:', err);
        setError('Failed to load programs');
      } finally {
        setLoading(false);
      }
    };

    loadPrograms();
  }, []);

  // Filter programs based on search
  const filteredPrograms = programs.filter(program => 
    program.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle donation button click
  const handleDonationClick = (program) => {
    setSelectedProgram(program);
  };

  // Handle successful donation
  const handleDonationSuccess = async () => {
    try {
      const data = await fetchPrograms();
      setPrograms(data);
    } catch (err) {
      console.error('Error refreshing programs:', err);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center">
          <img 
            src="/api/placeholder/40/40" 
            alt="YPMN Logo" 
            className="h-8 w-8 mr-2"
          />
          <span className="font-bold text-emerald-800">YPMN</span>
        </div>
        <div className="relative flex-1 mx-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="cari program"
            className="w-full px-4 py-2 border border-gray-300 rounded-full"
          />
          <Search className="absolute right-4 top-2.5 text-gray-400" size={20} />
        </div>
      </header>

      {/* Programs Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredPrograms.map((program) => (
            <DonationCard
              key={program.id}
              program={program}
              onClick={() => handleDonationClick(program)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-2xl mx-auto flex justify-around">
          <button className="flex flex-col items-center text-gray-600">
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center text-gray-600">
            <Users size={24} />
            <span className="text-xs mt-1">Tentang Kami</span>
          </button>
          <button className="flex flex-col items-center text-gray-600">
            <MessageCircle size={24} />
            <span className="text-xs mt-1">Hubungi Kami</span>
          </button>
        </div>
      </nav>

      {/* Donation Modal */}
      {selectedProgram && (
        <DonationModal
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
          onDonate={handleDonationSuccess}
        />
      )}
    </div>
  );
};

export default DonationPlatform;