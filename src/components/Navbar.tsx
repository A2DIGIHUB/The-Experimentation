'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-lg' : ''
    } bg-white border-b border-gray-200`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-blue-900 font-bold text-xl">
            The-Experimentation
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <SearchBar />
            <div className="flex items-center space-x-6">
              <Link href="/articles" className="text-gray-600 hover:text-blue-900 transition-colors">
                Articles
              </Link>
              <Link href="/experiments" className="text-gray-600 hover:text-blue-900 transition-colors">
                Experiments
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-900 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-900 transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-900 focus:outline-none"
            >
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:hidden bg-white py-4`}
        >
          <SearchBar />
          <div className="flex flex-col space-y-4 mt-4">
            <Link
              href="/articles"
              className="text-gray-600 hover:text-blue-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Articles
            </Link>
            <Link
              href="/experiments"
              className="text-gray-600 hover:text-blue-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Experiments
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-blue-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-blue-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
