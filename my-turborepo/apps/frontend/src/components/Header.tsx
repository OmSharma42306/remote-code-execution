import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-orange-500 p-2 rounded-lg">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">CodeSpace</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="#" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">
              Features
            </Link>
            <Link to="#" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">
              Pricing
            </Link>
            <Link to="#" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">
              Docs
            </Link>
            <Link to="#" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">
              Community
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login" 
              className="text-gray-600 hover:text-orange-500 font-medium transition-colors"
            >
              Log in
            </Link>
            <Link 
              to="/signup" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="#" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">
                Features
              </Link>
              <Link to="#" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">
                Pricing
              </Link>
              <Link to="#" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">
                Docs
              </Link>
              <Link to="#" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">
                Community
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <Link 
                  to="/login" 
                  className="text-gray-600 hover:text-orange-500 font-medium transition-colors"
                >
                  Log in
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium text-center transition-colors"
                >
                  Sign up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;