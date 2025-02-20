// pages/AboutUs.js
import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center">
            <img src="/images/logo.png" alt="YPMN" className="h-8" />
            <span className="ml-2 font-semibold text-green-700">YPMN PEDULI</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Tentang Kami</h1>
        
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">YPMN (Yayasan Peduli Masjid Nusantara)</h2>
          <p className="text-gray-600 mb-4">
            YPMN adalah lembaga profesional yang berdiri sejak Desember 2016, YPMN menjadi lembaga penghimpunan dan pengelolaan dana umat yang akan di salurkan
            kepada masyarakat melalui berbagai kegiatan pemberdayaan di bidang sosial kemanusiaan, pendidikan, kesehatan dan keagamaan serta
            bersama masyarakat membantu fasilitas masjid yang kurang layak agar masjid menjadi pusat berkembangnya peradaban islam.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Visi & Misi</h2>
          <div className="mb-4">
            <h3 className="font-medium mb-1">Visi</h3>
            <p className="text-gray-600">
              Menjadi Lembaga terkemuka dan Profesional di Indonesia yang berperan aktif membangun Masjid 
              sebagai tempat pelaksanaan Ubudiyah dan pusat syiar Islam menuju terbentuknya masyarakat Indonesia yang diridhoi Allah SWT.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Misi</h3>
            <ul className="text-gray-600 list-disc pl-4">
              <li>Berperan aktif dalam membangun Masjid dan meningkatkan sarana dan prasarana penunjang masjid.</li>
              <li>Membentuk dan melahirkan masyarakat Islam yang peduli terhadap masjid serta ikut serta dalam berbagai aktivitas dan programnya.</li>
              <li>Menjalin kerjasama dengan pengelola Masjid atau Dewan Kemakmuran Masjid (DKM) dalam rangka terbentuknya masjid yang makmur.</li>
              <li>Menggalang partisipasi aktif masyarakat dalam mengembangkan masjid.</li>
              <li>Meningkatkan peran dan kualitas umat demi tercapainya masyarakat yang madani.</li>
              <li>Membina dan melatih Sumber Daya Manusia (SDM) yang memiliki kemampuan dalam mengelola dan mengembangkan masjid.</li>
              <li>Menjalin kerjasama dengan pemerintah maupun swasta untuk penghimpunan dana umat dengan tujuan pengelolaan dan penyaluran dalam rangka 
                memberikan dampak sosial seluas luasnya kepada Masyarakat.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-md mx-auto">
        <div className="flex justify-around py-3">
          <Link to="/" className="flex flex-col items-center text-gray-600">
            <span className="material-icons">home</span>
            <span className="text-xs">Beranda</span>
          </Link>
          <Link to="/tentang-kami" className="flex flex-col items-center text-green-600">
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

export default AboutUs;