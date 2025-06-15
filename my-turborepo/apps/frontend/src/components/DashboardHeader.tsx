import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code, Bell, Settings, User, ChevronDown, LogOut, HelpCircle, Crown } from 'lucide-react';

const DashboardHeader = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-orange-500 p-2 rounded-lg">
            <Code className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">CodeSpace</span>
        </Link>

        {/* Center - Breadcrumb */}
        <div className="flex items-center text-gray-400 text-sm">
          <span>Projects</span>
          <span className="mx-2">/</span>
          <span className="text-white">My First Project</span>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="hidden md:block text-white">John Doe</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-700 rounded-lg shadow-xl border border-gray-600 z-50">
                <div className="p-4 border-b border-gray-600">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">John Doe</p>
                      <p className="text-gray-400 text-sm">john.doe@example.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-600 transition-colors flex items-center space-x-2">
                    <Crown className="w-4 h-4" />
                    <span>Upgrade to Pro</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-600 transition-colors flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-600 transition-colors flex items-center space-x-2">
                    <HelpCircle className="w-4 h-4" />
                    <span>Help & Support</span>
                  </button>
                </div>
                
                <div className="border-t border-gray-600 py-2">
                  <Link
                    to="/"
                    className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-600 transition-colors flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;