'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8
    }
  }
};

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-500 opacity-10"
              style={{
                width: Math.random() * 300 + 50,
                height: Math.random() * 300 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              initial: {},
              animate: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="text-white space-y-6"
          >
            <motion.div variants={fadeInUp}>
              <h1 className="text-5xl md:text-7xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                The-Experimentation
              </h1>
              <p className="text-2xl md:text-3xl text-blue-200 font-light">
                Where Science Comes to Life
              </p>
            </motion.div>

            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-blue-100 max-w-xl"
            >
              Join us on a journey of discovery through interactive experiments, 
              groundbreaking research, and fascinating scientific insights.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap gap-4"
            >
              <Link 
                href="/articles" 
                className="px-8 py-3 bg-white text-blue-900 rounded-full font-semibold hover:bg-blue-100 transition-colors duration-300"
              >
                Explore Articles
              </Link>
              <Link 
                href="/experiments" 
                className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-colors duration-300"
              >
                Start Experimenting
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Floating Images */}
          <motion.div 
            initial="initial"
            animate="animate"
            className="relative h-[500px] hidden md:block"
          >
            {/* DNA Structure */}
            <motion.div
              variants={floatingAnimation}
              className="absolute top-0 right-0"
            >
              <Image
                src="/images/science/dna-structure.png"
                alt="DNA Structure"
                width={200}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </motion.div>

            {/* Chemistry Flask */}
            <motion.div
              variants={{
                ...floatingAnimation,
                animate: {
                  ...floatingAnimation.animate,
                  transition: {
                    delay: 1,
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }
              }}
              className="absolute bottom-20 left-0"
            >
              <Image
                src="/images/science/chemistry-flask.png"
                alt="Chemistry Flask"
                width={150}
                height={150}
                className="rounded-lg shadow-lg"
              />
            </motion.div>

            {/* Atom Model */}
            <motion.div
              variants={{
                ...floatingAnimation,
                animate: {
                  ...floatingAnimation.animate,
                  transition: {
                    delay: 2,
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }
              }}
              className="absolute top-1/2 right-1/4"
            >
              <Image
                src="/images/science/atom-model.png"
                alt="Atom Model"
                width={180}
                height={180}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
