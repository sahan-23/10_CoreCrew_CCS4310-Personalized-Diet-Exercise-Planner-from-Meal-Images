import React, { useState } from 'react';
import { MenuIcon, UserIcon, BookOpenIcon, BellIcon, XIcon } from 'lucide-react';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md">
              <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
                N
              </span>
            </div>
            <span className="text-white font-bold text-2xl tracking-wide">NutriScan</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10 text-xl font-medium">
            <a href="#" className="text-white/90 hover:text-white transition duration-200">Dashboard</a>
            <a href="#" className="text-white/90 hover:text-white transition duration-200">Meal Plans</a>
            <a href="#" className="text-white/90 hover:text-white transition duration-200">Recipes</a>
            <a href="#" className="text-white/90 hover:text-white transition duration-200">Progress</a>
          </nav>

          {/* Icons + Mobile Menu Toggle */}
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 relative">
              <BellIcon className="w-6 h-6 text-white" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20">
              <BookOpenIcon className="w-6 h-6 text-white" />
            </button>
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20">
              <UserIcon className="w-6 h-6 text-white" />
            </button>
            <button
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XIcon className="w-6 h-6 text-white" />
              ) : (
                <MenuIcon className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-white/20 animate-fade-in-down">
            <nav className="flex flex-col space-y-4 text-lg font-medium">
              <a href="#" className="text-white/90 hover:text-white transition duration-200">Dashboard</a>
              <a href="#" className="text-white/90 hover:text-white transition duration-200">Meal Plans</a>
              <a href="#" className="text-white/90 hover:text-white transition duration-200">Recipes</a>
              <a href="#" className="text-white/90 hover:text-white transition duration-200">Progress</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
