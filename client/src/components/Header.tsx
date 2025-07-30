import React, { useState } from 'react';
import { MenuIcon, UserIcon, BookOpenIcon, BellIcon, XIcon } from 'lucide-react';
export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg relative z-20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
                N
              </span>
            </div>
            <span className="font-bold text-xl text-white">NutriScan</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-white/80 hover:text-white transition-colors font-medium">
              Dashboard
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors font-medium">
              Meal Plans
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors font-medium">
              Recipes
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors font-medium">
              Progress
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 relative">
              <BellIcon className="w-5 h-5 text-white" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20">
              <BookOpenIcon className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20">
              <UserIcon className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <XIcon className="w-5 h-5 text-white" /> : <MenuIcon className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && <div className="md:hidden mt-4 py-4 border-t border-white/20">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-white/80 hover:text-white transition-colors font-medium">
                Dashboard
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors font-medium">
                Meal Plans
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors font-medium">
                Recipes
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors font-medium">
                Progress
              </a>
            </nav>
          </div>}
      </div>
    </header>;
};