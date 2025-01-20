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
      isScrolled ? 'bg-blue-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-white font-bold text-xl">
            The-Experimentation
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <SearchBar />
            <div className="flex items-center space-x-6">
              <Link href="/articles" className="text-white/80 hover:text-white transition-colors">
                Articles
              </Link>
              <Link href="/experiments" className="text-white/80 hover:text-white transition-colors">
                Experiments
              </Link>
              <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-96 pb-4' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col space-y-4">
            <div className="py-4">
              <SearchBar />
            </div>
            <Link
              href="/articles"
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Articles
            </Link>
            <Link
              href="/experiments"
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Experiments
            </Link>
            <Link
              href="/about"
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-white/80 hover:text-white transition-colors"
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
