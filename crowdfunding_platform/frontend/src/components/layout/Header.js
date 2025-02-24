// components/layout/Header.js
import React from 'react';

const Header = () => {
  return (
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
  );
};

export default Header;