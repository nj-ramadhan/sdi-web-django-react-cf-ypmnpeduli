// components/layout/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
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
  );
};

export default Navigation;