// components/layout/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link to="/" className="flex items-center py-4">
                <span className="font-semibold text-gray-500 text-lg">YPMN PEDULI</span>
              </Link>
            </div>
            {/* <div className="flex items-center space-x-1">
              <Link to="/" className="py-4 px-2 text-gray-500 hover:text-gray-900">Home</Link>
              <Link to="/about" className="py-4 px-2 text-gray-500 hover:text-gray-900">About</Link>
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;