'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartPulse, faMicroscope, faFlask } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[60vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {mounted && (
          <Image
            src="/images/hero-bg.jpg"
            alt="Medical Research Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-blue-900/85 to-blue-800/80"></div>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full">
          {mounted && [...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white leading-tight">
              Advancing Healthcare
              <span className="block mt-2">Through Science</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-50 max-w-3xl mx-auto">
              Discover groundbreaking medical research, innovative clinical trials, and the future of healthcare.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link 
              href="/research"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5"
            >
              <FontAwesomeIcon icon={faMicroscope} className="h-5 w-5" />
              Explore Research
            </Link>
            <Link 
              href="/experiments"
              className="bg-white hover:bg-blue-50 text-blue-900 px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-lg hover:shadow-white/20 hover:-translate-y-0.5"
            >
              <FontAwesomeIcon icon={faFlask} className="h-5 w-5" />
              View Experiments
            </Link>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <FontAwesomeIcon icon={faHeartPulse} className="h-8 w-8 text-emerald-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Clinical Impact</h3>
              <p className="text-blue-100 text-sm">Transforming research into practical healthcare solutions</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <FontAwesomeIcon icon={faMicroscope} className="h-8 w-8 text-emerald-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Latest Research</h3>
              <p className="text-blue-100 text-sm">Cutting-edge discoveries in medical science</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <FontAwesomeIcon icon={faFlask} className="h-8 w-8 text-emerald-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Innovation</h3>
              <p className="text-blue-100 text-sm">Pioneering new approaches to treatment</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
