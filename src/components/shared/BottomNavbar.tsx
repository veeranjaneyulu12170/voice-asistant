import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Mic, Hand, Settings } from 'lucide-react';

const BottomNavbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        <Link 
          to="/" 
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive('/') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link 
          to="/voice-mode" 
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive('/voice-mode') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Mic size={24} />
          <span className="text-xs mt-1">Voice</span>
        </Link>
        
        <Link 
          to="/sign-language-mode" 
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive('/sign-language-mode') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Hand size={24} />
          <span className="text-xs mt-1">Sign</span>
        </Link>
        
        <Link 
          to="/settings" 
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive('/settings') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Settings size={24} />
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavbar; 