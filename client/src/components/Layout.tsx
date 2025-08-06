import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, UtensilsCrossedIcon, DumbbellIcon, UserIcon, MenuIcon, XIcon } from 'lucide-react';
const Layout = ({
  children
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigation = [{
    name: 'Dashboard',
    href: '/',
    icon: HomeIcon
  }, {
    name: 'Meal Tracker',
    href: '/meals',
    icon: UtensilsCrossedIcon
  }, {
    name: 'Exercise Planner',
    href: '/exercises',
    icon: DumbbellIcon
  }, {
    name: 'Profile',
    href: '/profile',
    icon: UserIcon
  }];
  const isActive = path => {
    return location.pathname === path;
  };
  return <div className="flex h-screen overflow-hidden">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow bg-white pt-5 pb-4 overflow-y-auto border-r border-gray-200">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-indigo-600">NutriActive</h1>
            </div>
            <div className="mt-8 flex-grow flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {navigation.map(item => <Link key={item.name} to={item.href} className={`${isActive(item.href) ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'} group flex items-center px-2 py-2 text-sm font-medium rounded-md`}>
                    <item.icon className={`${isActive(item.href) ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'} mr-3 flex-shrink-0 h-6 w-6`} aria-hidden="true" />
                    {item.name}
                  </Link>)}
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className="md:hidden fixed inset-0 z-40 flex">
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-in-out duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileMenuOpen(false)}></div>
        <div className={`fixed inset-y-0 left-0 flex flex-col max-w-xs w-full bg-white transform transition ease-in-out duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button type="button" className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Close sidebar</span>
              <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
          <div className="flex-shrink-0 flex items-center px-4 pt-5">
            <h1 className="text-xl font-bold text-indigo-600">NutriActive</h1>
          </div>
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {navigation.map(item => <Link key={item.name} to={item.href} className={`${isActive(item.href) ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'} group flex items-center px-2 py-2 text-base font-medium rounded-md`} onClick={() => setMobileMenuOpen(false)}>
                  <item.icon className={`${isActive(item.href) ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'} mr-4 flex-shrink-0 h-6 w-6`} aria-hidden="true" />
                  {item.name}
                </Link>)}
            </nav>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button type="button" className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" onClick={() => setMobileMenuOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>;
};
export default Layout;