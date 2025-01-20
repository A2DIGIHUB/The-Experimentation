'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faTimes, 
  faSearch, 
  faBell,
  faUser,
  faBookmark,
  faCog,
  faSignOut
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './SearchBar';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearchComplete = () => {
    setIsSearchOpen(false);
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Articles', href: '/articles' },
    { name: 'Sickle Cell', href: '/sickle-cell' },
    { name: 'Resources', href: '/resources' },
    { name: 'Events', href: '/events' },
  ];

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'shadow-lg bg-white/95 backdrop-blur-sm' : 'bg-white'
        } border-b border-gray-200`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              href="/" 
              className="text-xl font-bold text-primary-blue flex items-center"
            >
              The-Experimentation
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-primary-blue transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-600 hover:text-primary-blue transition-colors"
                aria-label="Search"
              >
                <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
              </button>

              {/* Notifications */}
              <div className="relative">
                <button className="text-gray-600 hover:text-primary-blue transition-colors">
                  <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    2
                  </span>
                </button>
              </div>

              {/* User Menu */}
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="text-gray-600 hover:text-primary-blue transition-colors"
                >
                  <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
                    >
                      <Link href="/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                      <Link href="/bookmarks" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <FontAwesomeIcon icon={faBookmark} className="w-4 h-4 mr-2" />
                        Bookmarks
                      </Link>
                      <Link href="/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <FontAwesomeIcon icon={faCog} className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                      <hr className="my-2" />
                      <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <FontAwesomeIcon icon={faSignOut} className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-600 hover:text-gray-900"
                aria-label="Search"
              >
                <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-gray-900"
                aria-label="Toggle menu"
              >
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-4 py-2 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-gray-600 hover:text-primary-blue hover:bg-gray-50 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <SearchBar onClose={() => setIsSearchOpen(false)} onComplete={handleSearchComplete} />
        )}
      </AnimatePresence>
    </>
  );
}
