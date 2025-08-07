import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, UtensilsIcon, ClipboardListIcon, DumbbellIcon, UserIcon, LogOutIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  const {
    logout,
    user
  } = useAuth();
  const location = useLocation();
  const navItems = [{
    path: '/',
    label: 'Dashboard',
    icon: <HomeIcon size={20} />
  }, {
    path: '/upload',
    label: 'Upload Meal',
    icon: <UtensilsIcon size={20} />
  }, {
    path: '/history',
    label: 'Meal History',
    icon: <ClipboardListIcon size={20} />
  }, {
    path: '/recommendations',
    label: 'Recommendations',
    icon: <DumbbellIcon size={20} />
  }, {
    path: '/profile',
    label: 'Profile',
    icon: <UserIcon size={20} />
  }];
  return <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top header */}
      <header className="bg-green-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <UtensilsIcon size={24} />
            <h1 className="text-xl font-bold">NutriTrack</h1>
          </div>
          <div className="flex items-center space-x-4">
            {user && <span className="hidden md:inline-block">Hello, {user.name}</span>}
            <button onClick={logout} className="flex items-center space-x-1 text-sm hover:underline">
              <LogOutIcon size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar navigation for desktop */}
        <nav className="hidden md:block bg-white w-64 shadow-md">
          <div className="p-4">
            <ul className="space-y-2">
              {navItems.map(item => <li key={item.path}>
                  <Link to={item.path} className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${location.pathname === item.path ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`}>
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>)}
            </ul>
          </div>
        </nav>
        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
      {/* Bottom navigation for mobile */}
      <nav className="md:hidden bg-white border-t shadow-md">
        <div className="flex justify-between items-center">
          {navItems.map(item => <Link key={item.path} to={item.path} className={`flex flex-1 flex-col items-center py-3 ${location.pathname === item.path ? 'text-green-600' : 'text-gray-600'}`}>
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>)}
        </div>
      </nav>
    </div>;
};
export default Layout;