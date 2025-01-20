'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './SearchBar';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
              className="text-blue-900 font-bold text-xl flex items-center space-x-2 hover:text-blue-700 transition-colors"
            >
              <span className="hidden sm:inline">The-Experimentation</span>
              <span className="sm:hidden">T-E</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-6">
                <Link 
                  href="/articles" 
                  className="text-gray-600 hover:text-blue-900 transition-colors relative group py-2"
                >
                  Articles
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link 
                  href="/experiments" 
                  className="text-gray-600 hover:text-blue-900 transition-colors relative group py-2"
                >
                  Experiments
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link 
                  href="/about" 
                  className="text-gray-600 hover:text-blue-900 transition-colors relative group py-2"
                >
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link 
                  href="/contact" 
                  className="text-gray-600 hover:text-blue-900 transition-colors relative group py-2"
                >
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-600 hover:text-blue-900 focus:outline-none p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Toggle search"
              >
                <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-600 hover:text-blue-900 focus:outline-none p-2"
                aria-label="Toggle search"
              >
                <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-blue-900 focus:outline-none p-2"
                aria-label="Toggle menu"
              >
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden bg-white"
              >
                <div className="py-4 space-y-4">
                  <Link
                    href="/articles"
                    className="block px-4 py-2 text-gray-600 hover:text-blue-900 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Articles
                  </Link>
                  <Link
                    href="/experiments"
                    className="block px-4 py-2 text-gray-600 hover:text-blue-900 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Experiments
                  </Link>
                  <Link
                    href="/about"
                    className="block px-4 py-2 text-gray-600 hover:text-blue-900 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="block px-4 py-2 text-gray-600 hover:text-blue-900 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Search overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsSearchOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl mx-auto px-4 z-50"
            >
              <div className="bg-white rounded-lg shadow-xl p-4">
                <SearchBar onSearch={() => setIsSearchOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
