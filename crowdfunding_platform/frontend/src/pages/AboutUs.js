// pages/AboutUs.js
import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center">
            <img src="/images/logo.png" alt="YPMN" className="h-8" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Tentang Kami</h1>
        
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">YPMN (Yayasan Peduli Muslim Nusantara)</h2>
          <p className="text-gray-600 mb-4">
            Kami adalah organisasi nirlaba yang berfokus pada pemberdayaan dan bantuan untuk muslim
            di seluruh Nusantara melalui berbagai program sosial dan kemanusiaan.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Visi & Misi</h2>
          <div className="mb-4">
            <h3 className="font-medium mb-1">Visi</h3>
            <p className="text-gray-600">
              Menjadi lembaga terpercaya dalam memberdayakan muslim Nusantara.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Misi</h3>
            <ul className="text-gray-600 list-disc pl-4">
              <li>Memberikan bantuan kepada yang membutuhkan</li>
              <li>Mengembangkan program pemberdayaan masyarakat</li>
              <li>Membangun jaringan filantropi yang kuat</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-md mx-auto">
        <div className="flex justify-around py-3">
          <Link to="/" className="flex flex-col items-center text-gray-600">
            <span className="material-icons">home</span>
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/tentang-kami" className="flex flex-col items-center text-green-600">
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

export default AboutUs;