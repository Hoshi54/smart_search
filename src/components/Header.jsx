import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold text-xl">S7</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Flight Search</h1>
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Авиабилеты</a>
          <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Регистрация</a>
          <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Управление бронированием</a>
          <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Информация</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <a href="#" className="text-gray-600 hover:text-green-600 transition-colors hidden md:block">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </a>
          
          <button className="md:hidden focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Полоса с рейтингом Gate и индикатором - как на скриншоте */}
      <div className="bg-gradient-to-r from-green-500 to-green-400 py-1 px-4 text-white flex justify-between items-center">
        <div className="text-sm font-semibold">Gate 7</div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="text-sm font-medium">LTE</div>
          <div className="bg-white text-green-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            20
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;