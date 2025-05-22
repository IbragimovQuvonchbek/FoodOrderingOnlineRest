import { Link, NavLink } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-display font-bold text-gold-500">
              GOLDEN <span className="text-gold-300">BURGER</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-gold-300' : 'text-gold-500 hover:text-gold-300'}`
              }
            >
              Menu
            </NavLink>
            {user && (
              <>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-gold-300' : 'text-gold-500 hover:text-gold-300'}`
                  }
                >
                  Cart
                </NavLink>
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-gold-300' : 'text-gold-500 hover:text-gold-300'}`
                  }
                >
                  Orders
                </NavLink>
              </>
            )}
          </div>

          {/* User/Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gold-300">{user.username}</span>
                <button
                  onClick={logout}
                  className="btn-secondary"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="btn-secondary"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md inline-flex items-center justify-center text-gold-500 hover:text-gold-300 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black-800 border-t border-gold-500/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/menu"
              className="block px-3 py-2 rounded-md text-base font-medium text-gold-500 hover:text-gold-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Menu
            </NavLink>
            {user && (
              <>
                <NavLink
                  to="/cart"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gold-500 hover:text-gold-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cart
                </NavLink>
                <NavLink
                  to="/orders"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gold-500 hover:text-gold-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Orders
                </NavLink>
              </>
            )}
            <div className="pt-4 pb-2 border-t border-gold-500/10">
              {user ? (
                <div className="flex items-center px-3 space-x-4">
                  <div>
                    <p className="text-sm font-medium text-gold-300">{user.username}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="btn-secondary text-sm px-3 py-1"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    className="btn-secondary text-sm text-center px-3 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary text-sm text-center px-3 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}