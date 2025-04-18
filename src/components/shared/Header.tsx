import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {isHomePage ? (
            <div className="flex items-center gap-2">
              <Home className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-slate-800">AccessEase</h1>
            </div>
          ) : (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md py-1 px-2"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </button>
          )}
          
          {!isHomePage && (
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md py-1 px-2"
              aria-label="Go to home"
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Home</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;