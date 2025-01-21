'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub, faLinkedin, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faArrowUp, faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement newsletter subscription logic
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-br from-blue-900 to-blue-800 text-white relative">
      {/* Newsletter Section */}
      <div className="bg-blue-950/30 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-sm sm:text-base text-blue-200 mb-4 sm:mb-6">
              Stay updated with our latest articles, research findings, and events.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-100 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0 }}
        onClick={scrollToTop}
        className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FontAwesomeIcon icon={faArrowUp} className="h-5 w-5" />
      </motion.button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* About Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg sm:text-xl font-bold">The-Experimentation</h3>
            <p className="text-sm sm:text-base text-blue-200">
              Making science accessible and engaging through interactive experiments and clear explanations.
            </p>
            <div className="flex space-x-4 pt-4">
              {[
                { icon: faTwitter, href: 'https://twitter.com/TheExperimentation' },
                { icon: faGithub, href: 'https://github.com/A2DIGIHUB/The-Experimentation' },
                { icon: faLinkedin, href: 'https://linkedin.com/company/the-experimentation' },
                { icon: faInstagram, href: 'https://instagram.com/theexperimentation' },
                { icon: faYoutube, href: 'https://youtube.com/theexperimentation' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FontAwesomeIcon icon={social.icon} className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg sm:text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Articles', href: '/articles' },
                { name: 'Resources', href: '/resources' },
                { name: 'Contact', href: '/contact' },
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-sm sm:text-base text-blue-200 hover:text-white transition-colors block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg sm:text-xl font-bold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="h-5 w-5 text-blue-200 mt-1" />
                <span className="text-sm sm:text-base text-blue-200">
                  123 Innovation Street, Tech City, TC 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faPhone} className="h-5 w-5 text-blue-200" />
                <span className="text-sm sm:text-base text-blue-200">+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 text-blue-200" />
                <span className="text-sm sm:text-base text-blue-200">contact@theexperimentation.com</span>
              </li>
            </ul>
          </motion.div>

          {/* Operating Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg sm:text-xl font-bold">Operating Hours</h3>
            <ul className="space-y-2">
              <li className="text-sm sm:text-base text-blue-200">
                <span className="font-medium">Monday - Friday:</span>
                <br />9:00 AM - 6:00 PM
              </li>
              <li className="text-sm sm:text-base text-blue-200">
                <span className="font-medium">Saturday:</span>
                <br />10:00 AM - 4:00 PM
              </li>
              <li className="text-sm sm:text-base text-blue-200">
                <span className="font-medium">Sunday:</span>
                <br />Closed
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-blue-800/50 text-center">
          <p className="text-sm text-blue-200">
            &copy; {new Date().getFullYear()} The-Experimentation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
